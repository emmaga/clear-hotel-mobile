define(['framework7','config', 'xhr','appFunc','i18nText','text!room/room.tpl.html','roomReserveModule'], function(framework7,config,xhr,appFunc,i18nText,template,roomReserveModule){

    var $$ = Dom7;
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
    //日历选择的日期数组
    var confirm = [];

    var room = {
        bindEvents: function(moduleId,data) {
            var getMessage = function(){
                if(sessionStorage.getItem('orderData')) {
                    sessionStorage.removeItem('orderData');
                }
                var self = $$(this);
                var roomId = self.parent().parent().parent().data("roomId");
                var roomName = self.parent().parent().parent().data("roomName");
                var avePrice = self.parent().parent().parent().data("price");
                var img,intro;
                for(var i=0;i<data.data.roomList.length;i++){
                    if(data.data.roomList[i].roomId == roomId){
                        img = data.data.roomList[i].img;
                        intro = data.data.roomList[i].intro;
                    }
                }
                //当前room在当前选定时间段内的价格数组（ID与价格数组相对应，ID从1开始，数组从0开始，因此ID需要减1）
                var orderData = {
                    roomId:roomId,
                    roomName:roomName,
                    avePrice:avePrice,
                    date1:data.data.check_in,
                    date2:data.data.check_out,
                    img:img,
                    intro:intro
                };
                var orderDataStr = JSON.stringify(orderData);
                sessionStorage.setItem('orderData',orderDataStr);
                //roomReserveModule.init(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2);
            }
            $$(document).on('click', '.reserve', getMessage);
        },
        loadData:function(moduleId,data){
            var renderData = {
                data:data.data,
                reserve:i18nText.room.reserve,
                soldOut:i18nText.room.soldOut,
                date_in:i18nText.room.date_in,
                date_out:i18nText.room.date_out,
                moduleId:moduleId
            };
            var output = appFunc.renderTpl(template,renderData);
            $$('#tab_'+'room'+'_'+moduleId).html(output);

            //room.bindEvents(moduleId,data);
            room.initCalendar(moduleId,data);
        },
        //初始化日历控件
        initCalendar:function(moduleId,data){
            //设置日历中多少天之后不可选中
            var priceLength = 100;
            var today = new Date();
            var tomorrow = new Date().setDate(today.getDate() + 1);
            var daysLater = new Date().setDate(today.getDate() + priceLength - 1);
            var yesterday = new Date().setDate(today.getDate() - 1);
            var dateIn = appFunc.dateToTime(data.data.check_in);
            var dateOut = appFunc.dateToTime(data.data.check_out);
            //room.changePrice(moduleId,priceLength,dateIn,dateOut);
            var calendar = window.hotelApp.calendar({
                input: '#calendar',
                dateFormat: 'M dd yyyy',
                onlyOnPopover:true,
                toolbar:true,
                multiple:true,
                rangesClasses: [
                    {
                        cssClass: 'picker-calendar-day-selected',
                        range: {
                            from: dateIn,
                            to: dateOut
                        }
                    }],
                disabled: function (date) {
                    if (date < yesterday || date > daysLater) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                toolbarTemplate:
                '<div class="toolbar calendar-custom-toolbar">' +
                '<div class="toolbar-inner">' +
                '<div class="left">' +
                '<a href="#" class="link icon-only close-picker"><i class="icon icon-back"></i></a>' +
                '</div>' +
                '<a href="#" class="link icon-only picker-calendar-prev-month">'+
                '<i class="icon icon-prev"></i>'+
                '</a>'+
                '<span class="current-value"></span>'+
                '<a href="#" class="link icon-only picker-calendar-next-month">'+
                '<i class="icon icon-next"></i>'+
                '</a>'+
                '<div class="right">' +
                '<a href="#" class="link">OK&nbsp;&nbsp;</a>' +
                '</div>' +
                '</div>' +
                '</div>',
                onOpen: function (p) {
                    $$('.picker-calendar').css('height',"100%");
                    $$('.calendar-custom-toolbar .current-value').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                    $$('.calendar-custom-toolbar .right').on('click', function (){
                        //var daySelected = $$('.picker-calendar-day-selected');
                        if(confirm.length==0){
                            calendar.close();
                        }
                        else if(confirm.length==2){
                            roomPriceArray=[];
                            dayArray=[];
                            //confirm.sort();
                            var earlyDate = confirm[0];
                            var lateDate = confirm[1];
                            var dateInChoose =  appFunc.timeToDate(earlyDate,'yyyy/MM/dd');
                            var dateOutChoose = appFunc.timeToDate(lateDate,'yyyy/MM/dd');
                            $$('#date-in').html(i18nText.room.date_in+dateInChoose).attr('date',dateInChoose);
                            $$('#date-out').html(i18nText.room.date_out+dateOutChoose).attr('date',dateOutChoose);
                            //将dateInChoose/dateOutChoose作为参数，再次请求ajax并执行lodaData（）函数



                            calendar.close();
                            confirm=[];
                        }else{
                            alert(i18nText.room.calendar_error);
                        }
                    });
                },
                onMonthYearChangeStart: function (p) {
                    $$('.calendar-custom-toolbar .current-value').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                },
                onChange:function(p,values){
                    //var daySelected = $$('.picker-calendar-day-selected');
                    var result = calendar.value;
                    result.sort();
                    confirm = result;
                    if(result.length==2){
                        var time1 = appFunc.dateToTime(result[0]);
                        var time2 = appFunc.dateToTime(result[1]);
                        var days = $$('.picker-calendar-day');
                        for(var i=0;i<days.length;i++){
                            var date = days[i].getAttribute('data-date');
                            var time = appFunc.dateToTime(date);
                            if(time1<=time&&time<time2){
                                days[i].setAttribute('class','picker-calendar-day picker-calendar-day-selected');
                            }
                        }
                    };
                    if(result.length>=2) {
                        calendar.value = [];
                    }
                }
            });
        }
    }

    var init = function (moduleId){
        xhr.ajax({
            'url': config.getJSONUrl('getRoomList-response'),
            dataType: 'json',
            method: 'POST',
            'success': function(data){room.loadData(moduleId,data)}
        })
    };
    return {
        init: init
    };
});