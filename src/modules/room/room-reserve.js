define(['framework7','config','appFunc','text!room/room-reserve.tpl.html'], function(framework7,config,appFunc,template){

    var $$ = Dom7;

    var roomReserve = {
        bindEvents: function(menuId) {
            $$('.submit').on('click', function(){
                var formData = window.hotelApp.formToJSON('#reserve-form');
                alert(JSON.stringify(formData));
            });
        },
        loadData:function(menuId,roomId,roomName,avePrice,reservePriceArray,dayArray,date1,date2){
            var renderData = {
            };
            var output = appFunc.renderTpl(template,renderData);
            window.viewMain.router.load({
                content: output,
                pushState: true,
                animatePages: true
            });
            var dayLength = dayArray.length;
            $$('.room-name').text(roomName);
            $$('.date-in').html('入住：'+date1);
            $$('.date-out').html('离店：'+date2);
            $$('#days').html('共'+dayLength+"晚");
            var html ="<h3>价格明细</h3>";
            for(var i=0;i<dayLength;i++){
                html+= '<div><span>'+dayArray[i]+'</span>&nbsp;&nbsp;<span>￥'+reservePriceArray[i]+'</span></div>';
            }
            $$('.price-detail').html(html);
            var sum = avePrice * dayLength;
            $$('.total-price').html("总价:￥"+sum);
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