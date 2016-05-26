define(['framework7','appFunc','text!service-p1/service-p1.tpl.html','serviceP2Module'], 
    function(framework7,appFunc,template,serviceP2Module){

        var $$ = Dom7;

        var serviceP1 = {
            bindEvents: function() {
                $$(document).on('click', '#menu-test', function (e) { 
                  serviceP2Module.init(serviceP1.menuId);
                });
            }
        }

        var init = function (menuId){
            var renderData = {};
            var output = appFunc.renderTpl(template,renderData);
            $$('#tab2_'+menuId).html(output);

            serviceP1.menuId = menuId;
            serviceP1.bindEvents();
            

        };
        return {
            init: init
        };

});