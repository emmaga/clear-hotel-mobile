define(['framework7','appFunc','text!hi/hi.tpl.html'], function(framework7,appFunc,template){

    var $$ = Dom7;

    var init = function (){
        var renderData = {title: "hi"};
        var output = appFunc.renderTpl(template,renderData);
        window.view1.router.load({
            content: output,
            animatePages: false
        });
    };
    return {
        init: init
    };
});