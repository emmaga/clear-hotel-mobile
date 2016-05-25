define(['framework7','appFunc','text!tv/tv.tpl.html'], function(framework7,appFunc,template){

    var $$ = Dom7;

    var init = function (){
        var renderData = {
            title: "tv"
        };
        var output = appFunc.renderTpl(template,renderData);
        window.viewMain.router.load({
            content: output
        })
    };
    return {
        init: init
    };
});