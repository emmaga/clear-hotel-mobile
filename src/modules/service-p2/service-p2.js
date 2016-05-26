define(['framework7','appFunc','text!service-p2/service-p2.tpl.html'], 
    function(framework7,appFunc,template){

        var $$ = Dom7;

        var serviceP2 = {
            
        }

        var init = function (menuId){
            var renderData = {};
            var output = appFunc.renderTpl(template,renderData);
            window.viewMain.router.load({
                content: output
            })
        };
        return {
            init: init
        };

});