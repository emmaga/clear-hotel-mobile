define(['framework7','appFunc','text!brief/brief.tpl.html'], 
    function(framework7,appFunc,template){

    var $$ = Dom7;

    var init = function (menuId){
        var renderData = {title: "hi"};
        var output = appFunc.renderTpl(template,renderData);
        $$('#tab'+'brief'+'_'+menuId).html(output);

        var mySwiper = new Swiper('.swiper-container', {
            preloadImages: true,
            lazyLoading: true,
            pagination: '.swiper-pagination'
        }) 
    };
    return {
        init: init
    };
});