define(['framework7','config','appFunc','text!room/room.tpl.html'], function(framework7,config,appFunc,template){

    var $$ = Dom7;
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
    //日历选择的日期数组
    var confirm = [];
    var dayLength;
    //生成的选定时间段内的房间的价格数组
    var roomPriceArray = [];
    //选定的时间段数组
    var dayArray = [];

    var roomReserve = {
        bindEvents: function(menuId) {

        },
        loadData:function(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray){
            var renderData = {
                'roomId':roomId,
                'roomName':roomName,
                'avePrice':avePrice,
                'reservePriceArray':reservePriceArray,
                'dayArray':dayArray
            };
            var output = appFunc.renderTpl(template,renderData);
            $$('.room-reserve').html(output);
            console.log(renderData.reservePriceArray);
            roomReserve.bindEvents(menuId);

        }
    }

    var init = function (menuId,roomId,roomName,avePrice,reservePriceArray,dayArray){
        roomReserve.loadData(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray)
    };
    return {
        init: init
    };
});