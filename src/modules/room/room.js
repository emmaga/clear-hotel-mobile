define(['framework7','config', 'xhr','appFunc','text!room/room.tpl.html','roomReserveModule'], function(framework7,config,xhr,appFunc,template,roomReserveModule){

    var $$ = Dom7;
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
    //日历选择的日期数组
    var confirm = [];
    var dayLength;
    //生成的选定时间段内的房间的价格数组
    var roomPriceArray = [];
    //选定的时间段数组
    var dayArray = [];

    var room = {
        bindEvents: function(menuId) {
            var getMessage = function(){
                var self = $$(this);
                var roomId = self.parent().data("roomId");
                var roomName = self.parent().data("roomName");
                var avePrice = self.prev().data("price");
                //当前room在当前选定时间段内的价格数组
                var reservePriceArray = roomPriceArray[roomId-1];
                //console.log(reservePriceArray+"..........."+dayArray)
                roomReserveModule.init(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray);
            }
            $$(document).on('click', '.reserve', getMessage);
        },
        loadData:function(menuId,data){
            var renderData = data.room;
            var output = appFunc.renderTpl(template,renderData);
            $$('#tab_'+'room'+'_'+menuId).html(output);
            var reserve = $$('.reserve');
            for(var i=0;i<reserve.length;i++){
                if(reserve[i].innerText=="已订完"){
                    reserve[i].setAttribute('disabled','disabled')
                }
            }
            room.bindEvents(menuId);
            xhr.ajax({
                'url': config.getJSONUrl('room-price'),
                dataType: 'json',
                'success': function(priceData){room.initCalendar(menuId,priceData)}
            })
        },
        //动态获取、计算并修改房间的价格
        changePrice:function(menuId,priceLength,priceData,dateIn,dateOut){
            //var dayList = $$('.picker-calendar-day');
            //for(var p;p<dayList.length;p++){
            //    if(dayList[p].getAttribute('data-date')>=dateIn && dayList[p].getAttribute('data-date')<dateOut){
            //        dayList[p].setAttribute('class','picker-calendar-day-selected');
            //    }
            //}
            //价格的二维数组
            var priceArray = [];
            //计算后的房间均价数组
            var avePriceArray = [];
            var priceListLength;
            for(var i = 0;i < priceLength; i++){
                if(priceData.price.dateList[i].date>=dateIn && priceData.price.dateList[i].date<dateOut){
                    dayArray.push(priceData.price.dateList[i].date)
                    priceArray.push(priceData.price.dateList[i].priceList);
                    priceListLength=priceData.price.dateList[i].priceList.length;
                }
            }
            for(var j=0;j<priceListLength;j++){
                var temArr = [];
                for(var k=0;k<priceArray.length;k++) {
                    temArr.push(priceArray[k][j]);
                }
                roomPriceArray.push(temArr);
            }
            for(var k=0;k<roomPriceArray.length;k++){
                dayLength = roomPriceArray[k].length;
                var sum = 0;
                for(var m=0;m<dayLength;m++){
                    sum += roomPriceArray[k][m];
                }
                var averagePrice = sum/dayLength;
                avePriceArray.push(averagePrice)
            }
            var price = $$('.price');
            for(var n=0;n<price.length;n++){
                price[n].setAttribute('data-price',avePriceArray[n])
                price[n].innerText = "均："+avePriceArray[n];
            }
        },
        //初始化日历控件
        initCalendar:function(menuId,priceData){
            var priceLength = priceData.price.dateList.length;
            var today = new Date();
            var tomorrow = new Date().setDate(today.getDate() + 1);
            var monthLater = new Date().setDate(today.getDate() + priceLength - 1);
            var yesterday = new Date().setDate(today.getDate() - 1);
            var dateIn =  appFunc.timeToDate(today,'yyyy/MM/dd');
            var dateOut = appFunc.timeToDate(tomorrow,'yyyy/MM/dd')
            $$('#date-in').html("入住："+dateIn).attr('date',dateIn);
            $$('#date-out').html("离店："+dateOut).attr('date',dateOut);
            room.changePrice(menuId,priceLength,priceData,dateIn,dateOut);
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
                            from: yesterday,
                            to: tomorrow
                        }
                    }],
                disabled: function (date) {
                    if (date < today || date > monthLater) {
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
                        //var oldTime = appFunc.dateToTime('2016-5-9');
                        //alert(oldTime);
                        //var daySelected = $$('.picker-calendar-day-selected');
                        if(confirm.length==0){
                            //$$('#date-in').html("入住："+dateIn).attr('date',dateIn);
                            //$$('#date-out').html("离店："+dateOut).attr('date',dateOut);
                            //room.changePrice(priceLength,priceData,dateIn,dateOut);
                            calendar.close();
                        }
                        else if(confirm.length==2){
                            roomPriceArray=[];
                            dayArray=[];
                            confirm.sort();
                            var earlyDate = confirm[0];
                            var lateDate = confirm[1];
                            var dateInChoose =  appFunc.timeToDate(earlyDate,'yyyy/MM/dd');
                            var dateOutChoose = appFunc.timeToDate(lateDate,'yyyy/MM/dd')
                            $$('#date-in').html("入住："+dateInChoose).attr('date',dateInChoose);
                            $$('#date-out').html("离店："+dateOutChoose).attr('date',dateOutChoose);
                            room.changePrice(menuId,priceLength,priceData,dateInChoose,dateOutChoose);
                            calendar.close();
                            confirm=[];
                        }else{
                            alert("请选择入住和离店时间");
                        }
                    });
                },
                onMonthYearChangeStart: function (p) {
                    $$('.calendar-custom-toolbar .current-value').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                },
                onChange:function(p,values){
                    //var daySelected = $$('.picker-calendar-day-selected');
                    var result = calendar.value;
                    confirm = result;
                    if(result.length>=2) {
                        calendar.value = [];
                    }
                }
            });
        }
    }

    var init = function (menuId){
        xhr.ajax({
            'url': config.getJSONUrl('room'),
            dataType: 'json',
            'success': function(data){room.loadData(menuId,data)}
        })
    };
    return {
        init: init
    };
});