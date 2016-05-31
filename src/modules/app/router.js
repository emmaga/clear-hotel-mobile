define(['framework7', 'appFunc', 'briefModule', 'roomModule', 'serviceModule'],
    function(framework7, appFunc, briefModule, roomModule, serviceModule){

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
                    case 'intro-p1':
                        appFunc.hideToolbar();
                        break;
                    case 'intro-p2':
                        appFunc.hideToolbar();
                        break;
                    case 'movie-p1':
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
                case 'brief':
                    briefModule.init(menuId);
                    break;
                case 'service':
                    serviceModule.init(menuId);
                    break;
                case 'room':
                    roomModule.init(menuId);
                    break;
            }
        };
        return {
            loadPage: loadPage,
            init: router.init
        };
});