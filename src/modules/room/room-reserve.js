define(['framework7','config','xhr','appFunc','i18nText','orderDetail','text!room/room-reserve.tpl.html'], function(framework7,config,xhr,appFunc,i18nText,orderDetail,template){

    var $$ = Dom7;

    var roomReserve = {
        bindEvents: function(moduleId,orderData) {
            $$('.submit').on('click', function(){
                var formData = window.hotelApp.formToJSON('#reserve-form');
                orderData.tel = formData.tel;
                orderData.name = formData.name;
                orderData.roomNumber = Number($$('.number').attr('value'));
                orderData.totalPrice = Number(orderData.totalPrice)*Number($$('.number').attr('value'));

                orderDetail.init(moduleId);
            });
            $$('#number-add').on('click',function(){
                var number = Number($$('.number').attr('value'));
                number += 1;
                if(number>10){
                    number = 10;
                }
                $$('.number').attr('value',number);
                var eachPrice = $$('.each-price');
                for(var i=0;i<eachPrice.length;i++){
                    var price = Number(eachPrice[i].getAttribute('data-price'));
                    var newPrice = price * number ;
                    eachPrice[i].innerHTML = newPrice;
                }
                var preTotalPrice = Number($$('.total-price').attr('data-total-price'));
                var lastTotalPrice = preTotalPrice * number;
                $$('.total-price').html(i18nText.room.total_price+lastTotalPrice);
            });
            $$('#number-sub').on('click',function(){
                var number = Number($$('.number').attr('value'));
                number -= 1;
                if(number<1){
                    number = 1;
                }
                $$('.number').attr('value',number);
                var eachPrice = $$('.each-price');
                for(var i=0;i<eachPrice.length;i++){
                    var price = Number(eachPrice[i].getAttribute('data-price'));
                    var newPrice = price * number ;
                    eachPrice[i].innerHTML = newPrice;
                }
                var preTotalPrice = Number($$('.total-price').attr('data-total-price'));
                var lastTotalPrice = preTotalPrice * number;
                $$('.total-price').html(i18nText.room.total_price+lastTotalPrice);
            })
        },
        loadData:function(moduleId,roomId,data,priceData,isFirst){
            //console.log(data);
            //var dayLength = data.dayArray.length;
            //var html ="";
            //for(var i=0;i<dayLength;i++){
            //    html+= '<h3>'+i18nText.room.price_detail+'</h3><div><span>'+data.dayArray[i]+'</span>&nbsp;&nbsp;<span>￥'+data.reservePriceArray[i]+'</span></div>';
            //}
            //var sum = data.avePrice * dayLength;
            var time1 = appFunc.dateToTime(data.data.check_in);
            var time2 = appFunc.dateToTime(data.data.check_out);
            var roomId = roomId;
            var roomData;
            for(var i=0;i<data.data.roomList.length;i++){
                if(roomId==data.data.roomList[i].roomId){
                    roomData = data.data.roomList[i];
                }
            }
            var priceList = priceData.data.priceList;
            var dayLength = (time2-time1)/86400000;
            var totalPrice = 0;
            for(var j=0;j<priceList.length;j++){
                totalPrice += Number(priceList[j].price);
            }
            var renderData = {
                roomId:roomId,
                img:roomData.img,
                intro:roomData.intro,
                date1:i18nText.room.date_in+data.data.check_in,
                date2:i18nText.room.date_out+data.data.check_out,
                dayLength:i18nText.room.day1+dayLength+i18nText.room.day2,
                roomName:roomData.name,
                priceList:priceList,
                totalPriceNum:totalPrice,
                totalPrice:i18nText.room.total_price+totalPrice,
                roomNum:i18nText.room.room_num,
                name:i18nText.room.name,
                preName:i18nText.room.pre_name,
                tel:i18nText.room.tel,
                preTel:i18nText.room.pre_tel,
                submit:i18nText.room.submit
            };
            var orderData = {
                "check_in":data.data.check_in,
                "check_out":data.data.check_out,
                "roomId":roomId,
                "roomName":roomData.name,
                "totalPrice":totalPrice,
                "roomNumber":"",
                "tel":"",
                "name":"",
                "priceList":priceList
            }
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
                //初始化swiper
                var mySwiper = window.hotelApp.swiper('#room-reserve-swiper_'+roomId, {
                    preloadImages: true,
                    lazyLoading: false,
                    pagination:'.swiper-pagination'
                });
            }
            $$('#room-reserve-toolbar').removeClass('toolbar-hidden');
            $$('#room-reserve-toolbar').css('display','block');
            roomReserve.bindEvents(moduleId,orderData);
        }
    }
    //var init = function (menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2){
    //    roomReserve.loadData(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2)
    //};
    var init = function (moduleId,roomId,isFirst){
        $$('#page-room-reserve').attr('id', 'page-room-reserve_'+moduleId);
        xhr.ajax({
            'url': config.getJSONUrl('getRoomList-response'),
            dataType: 'json',
            method: 'POST',
            'success': function(data){
                //获取价格列表数据
                xhr.ajax({
                    'url': config.getJSONUrl('getPriceList-response'),
                    dataType: 'json',
                    method: 'POST',
                    'success': function(priceData){roomReserve.loadData(moduleId,roomId,data,priceData,isFirst)}
                })
            }
        })
    };
    return {
        init: init
    };
});