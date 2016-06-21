define(['framework7','config', 'xhr','appFunc','errorFunc','i18nText','text!room/room.tpl.html','roomReserveModule'], function(framework7,config,xhr,appFunc,errorFunc,i18nText,template,roomReserveModule){

    var $$ = Dom7;
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
    //日历选择的日期数组
    var confirm = [];

    var room = {
        bindEvents: function(moduleId,data) {

        },
        loadData:function(moduleId,data){
            var renderData = {
                data:data.data,
                reserve:i18nText.room.reserve,
                soldOut:i18nText.room.soldOut,
                date_in:i18nText.room.date_in,
                date_out:i18nText.room.date_out,
                moduleId:moduleId,
                appId: config.getAppId()
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
                dateFormat: 'yyyy/MM/dd',
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
                            //confirm.sort();
                            var earlyDate = confirm[0];
                            var lateDate = confirm[1];
                            var dateInChoose =  appFunc.timeToDate(earlyDate,'yyyy/MM/dd');
                            var dateOutChoose = appFunc.timeToDate(lateDate,'yyyy/MM/dd');
                            var data = {
                                project_name: config.getAppId(),
                                action: "GET",
                                lang:"en-us",
                                check_in:dateInChoose,
                                check_out:dateOutChoose,
                                token: config.getClearToken(),
                                ModuleInstanceID:moduleId
                            }
                            xhr.ajax({
                                'url':config.getJSONUrl('room_lists'),
                                dataType: 'json',
                                data: data,
                                method: 'POST',
                                'success': function(data){
                                    var rescode = data.rescode;
                                    if (rescode == 200) {
                                        room.loadData(moduleId,data);
                                    }
                                    else {
                                        errorFunc.error(rescode);
                                    }
                                }
                            })
                            //$$('#date-in').html(i18nText.room.date_in+dateInChoose).attr('date',dateInChoose);
                            //$$('#date-out').html(i18nText.room.date_out+dateOutChoose).attr('date',dateOutChoose);
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
                        //先将选中日期的值（毫秒数）转为日期格式
                        var clickDate1 = appFunc.timeToDate(result[0],'yyyy/MM/dd');
                        var clickDate2 = appFunc.timeToDate(result[1],'yyyy/MM/dd');
                        //将获取到的日期格式转换为日历上的日期格式
                        var calendarDate1 = appFunc.toCalendarDate(clickDate1);
                        var calendarDate2 = appFunc.toCalendarDate(clickDate2);
                        //再转换为毫秒数以作比较判断
                        var time1 = appFunc.dateToTime(calendarDate1);
                        var time2 = appFunc.dateToTime(calendarDate2);
                        var days = $$('.picker-calendar-day');
                        for(var i=0;i<days.length;i++){
                            var date = days[i].getAttribute('data-date');
                            var time = appFunc.dateToTime(date);
                            if(time1<time&&time<time2){
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
        var today = new Date();
        var tomorrow = new Date().setDate(today.getDate() + 1);
        var todayTime = appFunc.dateToTime(today);
        var tomorrowTime = appFunc.dateToTime(tomorrow);
        var checkIn = appFunc.timeToDate(todayTime,'yyyy/MM/dd');
        var checkOut = appFunc.timeToDate(tomorrowTime,'yyyy/MM/dd');
        var data = {
            project_name: config.getAppId(),
            action: "GET",
            lang:"en-us",
            check_in:checkIn,
            check_out:checkOut,
            token: config.getClearToken(),
            ModuleInstanceID:moduleId
        }
        xhr.ajax({
            'url': config.getJSONUrl('room_lists'),
            dataType: 'json',
            data: data,
            method: 'POST',
            'success': function(data){
                var rescode = data.rescode;
                if (rescode == 200) {
                    room.loadData(moduleId,data);
                }
                else {
                    errorFunc.error(rescode);
                }
            }
        })
        //xhr.ajax({
        //    'url': config.getJSONUrl('getRoomList-response'),
        //    dataType: 'json',
        //    method: 'POST',
        //    'success': function(data){room.loadData(moduleId,data)}
        //})
    };
    return {
        init: init
    };
});