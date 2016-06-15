define(['framework7','config','appFunc','i18nText','text!room/room-reserve.tpl.html'], function(framework7,config,appFunc,i18nText,template){

    var $$ = Dom7;

    var roomReserve = {
        bindEvents: function(moduleId) {
            $$('.submit').on('click', function(){
                var formData = window.hotelApp.formToJSON('#reserve-form');
                alert(JSON.stringify(formData));
            });
        },
        loadData:function(moduleId,isFirst){
            var dataStr = sessionStorage.getItem('orderData');
            var data = JSON.parse(dataStr);
            console.log(data);
            var dayLength = data.dayArray.length;
            var html ="";
            for(var i=0;i<dayLength;i++){
                html+= '<h3>'+i18nText.room.price_detail+'</h3><div><span>'+data.dayArray[i]+'</span>&nbsp;&nbsp;<span>￥'+data.reservePriceArray[i]+'</span></div>';
            }
            var sum = data.avePrice * dayLength;
            var renderData = {
                date1:i18nText.room.date_in+data.date1,
                date2:i18nText.room.date_out+data.date2,
                dayLength:i18nText.room.day1+dayLength+i18nText.room.day2,
                roomName:data.roomName,
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

            if(isFirst) {
                window.viewMain.router.load({
                    content: '<div data-page="room-reserve_'+moduleId+'" class="page">' + output + '</div>',
                    pushState: false,
                    animatePages: false
                })
            }
            else {
                $$('#page-room-reserve_'+moduleId).html(output);
                $$("div[data-page='room-reserve']").attr('data-page', 'room-reserve_'+moduleId);
            }
            $$('#room-reserve-toolbar').removeClass('toolbar-hidden');
            $$('#room-reserve-toolbar').css('display','block');
            roomReserve.bindEvents(moduleId);
        }
    }
    //var init = function (menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2){
    //    roomReserve.loadData(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2)
    //};
    var init = function (moduleId,isFirst){
        $$('#page-room-reserve').attr('id', 'page-room-reserve_'+moduleId);
        roomReserve.loadData(moduleId,isFirst)
    };
    return {
        init: init
    };
});