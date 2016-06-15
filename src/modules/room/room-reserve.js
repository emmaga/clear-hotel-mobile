define(['framework7','config','appFunc','i18nText','text!room/room-reserve.tpl.html'], function(framework7,config,appFunc,i18nText,template){

    var $$ = Dom7;

    var roomReserve = {
        bindEvents: function(menuId) {
            $$('.submit').on('click', function(){
                var formData = window.hotelApp.formToJSON('#reserve-form');
                alert(JSON.stringify(formData));
            });
        },
        loadData:function(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2){
            var dayLength = dayArray.length;
            var html ="";
            for(var i=0;i<dayLength;i++){
                html+= '<h3>'+i18nText.room.price_detail+'</h3><div><span>'+dayArray[i]+'</span>&nbsp;&nbsp;<span>￥'+reservePriceArray[i]+'</span></div>';
            }
            var sum = avePrice * dayLength;
            var renderData = {
                date1:i18nText.room.date_in+date1,
                date2:i18nText.room.date_out+date2,
                dayLength:i18nText.room.day1+dayLength+i18nText.room.day2,
                roomName:roomName,
                priceList:html,
                totalPrice:i18nText.room.total_price+sum,
                roomNum:i18nText.room.room_num,
                name:i18nText.room.name,
                preName:i18nText.room.pre_name,
                tel:i18nText.room.tel,
                preTel:i18nText.room.pre_tel,
                submit:i18nText.room.submit
            };
            var output = appFunc.renderTpl(template,renderData);
            window.viewMain.router.load({
                content: output,
                pushState: false,
                animatePages: false
            });
            $$('#room-reserve-toolbar').removeClass('toolbar-hidden');
            $$('#room-reserve-toolbar').css('display','block');
            roomReserve.bindEvents(menuId);
        }
    }
    var init = function (menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2){
        roomReserve.loadData(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2)
    };
    return {
        init: init
    };
});