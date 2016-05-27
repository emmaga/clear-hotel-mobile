define(['framework7','appFunc','text!brief/brief.tpl.html'],
    function(framework7,appFunc,template){
    var myApp = new Framework7({});
    var $$ = Dom7;

    var init = function (menuId){
        var renderData = {};
        var output = appFunc.renderTpl(template,renderData);
        $$('#tab'+'brief'+'_'+menuId).html(output);
        var mySwiper = myApp.swiper('.swiper-container', {
            preloadImages: false,
            lazyLoading: true,
            pagination:'.swiper-pagination'
        });
    };
    return {
        init: init
    };
});