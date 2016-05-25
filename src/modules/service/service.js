define(['framework7','appFunc','text!service/service.tpl.html','tvModule'], 
    function(framework7,appFunc,template,tvModule){

        var $$ = Dom7;

        var service = {
            bindEvents: function() {
                $$(document).on('click', '#menu-tv', function (e) { 
                  tvModule.init();
                });
            }
        }

        var init = function (){
            var renderData = {};
            var output = appFunc.renderTpl(template,renderData);
            window.view3.router.load({
                content: output,
                animatePages: false
            });

            service.bindEvents();

        };
        return {
            init: init
        };

});