define(['framework7','config','xhr','appFunc','i18nText','text!room/order-detail.tpl.html'], function(framework7,config,xhr,appFunc,i18nText,template){

    var $$ = Dom7;

    var orderDetail = {
        bindEvents: function(moduleId) {
        },
        loadData:function(moduleId,data){
            var orderState = data.data.orderState;
            var stateText;
            switch (orderState){
                case '1':
                    stateText = i18nText.order.stateText1;
                    break;
                case '2':
                    stateText = i18nText.order.stateText2;
                    break;
                case '3':
                    stateText = i18nText.order.stateText3;
                    break;
            }
            var renderData = {
                data:data.data,
                state:stateText,
                order_message:i18nText.order.order_message,
                order_id:i18nText.order.order_id,
                order_time:i18nText.order.order_time,
                total_price:i18nText.order.total_price,
                room_message:i18nText.order.room_message,
                room_type:i18nText.order.room_type,
                date:i18nText.order.date,
                room_num:i18nText.order.room_num,
                price_detail:i18nText.order.price_detail,
                contacts:i18nText.order.contacts,
                telephone:i18nText.order.telephone,
                name:i18nText.order.name

            };
            var output = appFunc.renderTpl(template,renderData);

            //if(isFirst) {
                window.viewMain.router.load({
                    content:output,
                    pushState: true,
                    animatePages: true
                });
            //}
            //else {
            //    $$('#page-room-reserve_'+moduleId).html(output);
            //    $$("div[data-page='room-reserve']").attr('data-page', 'room-reserve_'+moduleId);
            //}
            //$$('#order-detail').html(output);
            orderDetail.bindEvents(moduleId);
        }
    }
    //var init = function (menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2){
    //    roomReserve.loadData(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2)
    //};
    var init = function (moduleId,orderId){
        //$$('#page-room-reserve').attr('id', 'page-room-reserve_'+moduleId);
        //xhr.ajax({
        //    'url': config.getJSONUrl('submit-response'),
        //    dataType: 'json',
        //    method: 'POST',
        //    'success': function(data){orderDetail.loadData(moduleId,data,orderId)}
        //})
        var data = {
            project_name: config.getAppId(),
            action: "GETByID",
            lang:"en-us",
            token: config.getClearToken(),
            RoomOrderID:orderId
        }
        xhr.ajax({
            'url': config.getJSONUrl('room_orders'),
            dataType: 'json',
            data: data,
            method: 'POST',
            'success': function(data){
                var rescode = data.rescode;
                if (rescode == 200) {
                    orderDetail.loadData(moduleId,data)
                }
                else {
                    errorFunc.error(rescode);
                }
            }
        })
    };
    return {
        init: init
    };
});