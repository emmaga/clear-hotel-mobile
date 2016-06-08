define(['framework7','appFunc','text!room/room.tpl.html'], function(framework7,appFunc,template){

    var $$ = Dom7;
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];

    var room = {

    }
    var confirm = [];

    var init = function (menuId){
        var renderData = {};
        var output = appFunc.renderTpl(template,renderData);
        $$('#tab_'+'room'+'_'+menuId).html(output);
        //日历控件
        var today = new Date();
        var tomorrow = new Date().setDate(today.getDate() + 1);
        var yesterday = new Date().setDate(today.getDate() - 1);

        var calendarDisabled = window.hotelApp.calendar({
            input: '#calendar-disabled',
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
                //var price = '<div data-year="2016" data-month="5" data-day="1" class="picker-calendar-day picker-calendar-day-selected" data-date="2016-5-1" style="position:relative"><span class="">1</span><br><div style="position:absolute;top:60px;left:0;width:100%;text-align:center;margin:0 auto;">$100</div></div>';

                $$('.picker-calendar').css('height',"100%");
                $$('.calendar-custom-toolbar .current-value').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                $$('.calendar-custom-toolbar .right').on('click', function (){
                    //var oldTime = appFunc.dateToTime('2016-5-9');
                    //alert(oldTime);
                    //var daySelected = $$('.picker-calendar-day-selected');
                    if(confirm.length==0){
                        //传参为默认的today和tomorrow
                        today = today.getTime();
                        var dateIn =  appFunc.timeToDate(today,'yyyy/MM/dd');
                        var dateOut = appFunc.timeToDate(tomorrow,'yyyy/MM/dd')

                        console.log(dateIn+"++++++++"+dateOut)
                    }
                    else if(confirm.length==2){
                        confirm.sort();
                        var earlyDate = confirm[0];
                        var lateDate = confirm[1];
                        var dateIn =  appFunc.timeToDate(earlyDate,'yyyy/MM/dd');
                        var dateOut = appFunc.timeToDate(lateDate,'yyyy/MM/dd')
                        console.log(dateIn+'+++++++++'+dateOut);
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
                var result = calendarDisabled.value;
                confirm = result;
                if(result.length>=2) {
                    calendarDisabled.value = [];
                }
            }
            //onDayClick:function(p, dayContainer, year, month, day){
            //    console.log(day)
            //}
});
    };
    return {
        init: init
    };
});