define(['framework7','appFunc','text!hi/hi.tpl.html'], function(framework7,appFunc,template){

    var $$ = Dom7;

    var init = function (){
        var renderData = {title: "hi"};
        var output = appFunc.renderTpl(template,renderData);
        $$('#tab1').html(output);
    };
    return {
        init: init
    };
});