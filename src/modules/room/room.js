define(['framework7','appFunc','text!room/room.tpl.html'], function(framework7,appFunc,template){

    var $$ = Dom7;

    var init = function (){
        var renderData = {};
        var output = appFunc.renderTpl(template,renderData);
        window.view2.router.load({
            content: output,
            animatePages: false
        });
    };
    return {
        init: init
    };
});