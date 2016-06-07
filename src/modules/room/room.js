define(['framework7','appFunc','text!room/room.tpl.html'], function(framework7,appFunc,template){

    var $$ = Dom7;
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];

    var init = function (menuId){
        var renderData = {};
        var output = appFunc.renderTpl(template,renderData);
        $$('#tab_'+'room'+'_'+menuId).html(output);
        //日历控件
        var today = new Date();
        var weekLater = new Date().setDate(today.getDate() + 7);
        var tomorrow = new Date().setDate(today.getDate() + 1);
        var yesterday = new Date().setDate(today.getDate() - 1);

        var calendarDisabled = window.hotelApp.calendar({
            input: '#calendar-disabled',
            dateFormat: 'M dd yyyy',
            onlyOnPopover:true,
            toolbar:true,
            toolbarCloseText:'OK',
            multiple:true,
            rangesClasses: [
                //Add "day-october' class for all october dates
                {
                    // string CSS class name for this range in "cssClass" property
                    cssClass: 'picker-calendar-day-selected', //string CSS class
                    // Date Range in "range" property
                    range: {
                        from: yesterday,
                        to: tomorrow
                    }
                }],
            //convertToPopover:true,
            //onlyOnPopover:true,
            toolbarTemplate:
            '<div class="toolbar calendar-custom-toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                        '<a href="#" class="link icon-only picker-calendar-prev-month">'+
                            '<i class="icon icon-prev"></i>'+
                        '</a>'+
                            '<span class="current-value"></span>'+
                        '<a href="#" class="link icon-only picker-calendar-next-month">'+
                            '<i class="icon icon-next"></i>'+
                        '</a>'+
                    '<div class="right">' +
                        '<a href="#" class="link close-picker">{{closeText}}&nbsp;&nbsp;</a>' +
                    '</div>' +
                '</div>' +
            '</div>',
            onOpen: function (p) {
                //var price = '<div data-year="2016" data-month="5" data-day="1" class="picker-calendar-day picker-calendar-day-selected" data-date="2016-5-1" style="position:relative"><span class="">1</span><br><div style="position:absolute;top:60px;left:0;width:100%;text-align:center;margin:0 auto;">$100</div></div>';

                $$('.picker-calendar').css('height',"100%");
                //calendarDisabled.setPrice();
                $$('.calendar-custom-toolbar .current-value').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                //$$('.calendar-custom-toolbar .picker-calendar-prev-month').on('click', function () {
                //    calendarDisabled.prevMonth();
                //});
                //$$('.calendar-custom-toolbar .picker-calendar-next-month').on('click', function () {
                //    calendarDisabled.nextMonth();
                //});
                $$('.calendar-custom-toolbar .right').on('click', function (){
                    var oldTime = calendarDisabled.value;
                    var chooseValue = new Date(parseInt(oldTime));
                    alert(chooseValue);
                });
            },
            onMonthYearChangeStart: function (p) {
                $$('.calendar-custom-toolbar .current-value').text(monthNames[p.currentMonth] +', ' + p.currentYear);
            },
            onDayClick:function(p){
                var daySelected = $$('.picker-calendar-day-selected');
                if(daySelected.length>=2) {
                    calendarDisabled.value = [];
                }else{
                    
                }
            }
});
    };
    return {
        init: init
    };
});