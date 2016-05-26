define(['framework7', 'appFunc', 'briefModule', 'roomModule', 'serviceP1Module'], 
    function(framework7, appFunc, briefModule, roomModule, serviceP1Module){

        var $$ = Dom7;

        var router = {
            init: function() {
                $$(document).on('pageBeforeInit', function (e) {
                    var page = e.detail.page;
                    router.pageBeforeInit(page);
                });
                $$(document).on('pageBeforeAnimation', function (e) {
                    var page = e.detail.page;
                    router.pageBeforeAnimation(page);
                });
            },
            pageBeforeInit: function(page) {
                switch (page.name) {
                    case 'service-p2':
                        appFunc.hideToolbar();
                        break; 
                }
            },
            pageBeforeAnimation: function(page) {
                switch (page.name) {
                    case 'index':
                        appFunc.showToolbar();
                        break; 
                }
            }
        }

        var loadPage = function (type, menuId){
            switch (type) {
                case '1':
                    briefModule.init(menuId);
                    break;
                case '2':
                    serviceP1Module.init(menuId);
                    break;
                case '3':
                    roomModule.init(menuId);
                    break;       
            }
        };
        return {
            loadPage: loadPage,
            init: router.init
        };
});