define(['framework7','appFunc','text!brief/brief.tpl.html','text!brief/brief.css'], 
    function(framework7,appFunc,template,css){

    var $$ = Dom7;

    var init = function (menuId){
        var renderData = {title: "hi"};
        var output = appFunc.renderTpl(template,renderData);
        $$('#tab1_'+menuId).html(output);
    };
    return {
        init: init
    };
});