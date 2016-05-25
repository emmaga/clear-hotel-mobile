define(['framework7','appFunc','text!my/my.tpl.html'], function(framework7,appFunc,template){

    var $$ = Dom7;

    var init = function (){
        var renderData = {};
        var output = appFunc.renderTpl(template,renderData);
        $$('#tab4').html(output);
    };
    return {
        init: init
    };
});