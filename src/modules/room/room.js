define(['framework7','appFunc','text!room/room.tpl.html'], function(framework7,appFunc,template){

    var $$ = Dom7;

    var init = function (menuId){
        var renderData = {};
        var output = appFunc.renderTpl(template,renderData);
        $$('#tab3_'+menuId).html(output);
    };
    return {
        init: init
    };
});