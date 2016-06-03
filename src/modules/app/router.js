define(['framework7', 'appFunc', 'indexModule', 'briefModule', 'roomModule', 'serviceModule', 'introP1Module', 'introP2Module'],
    function(framework7, appFunc, indexModule, briefModule, roomModule, serviceModule, introP1Module, introP2Module){

        var $$ = Dom7;

        var router = {
            init: function() {
                // window.onhashchange = router.onhashchange;
                $$(document).on('pageBeforeInit', function (e) {
                    var page = e.detail.page;
                    router.pageBeforeInit(page);
                });
                $$(document).on('pageBeforeAnimation', function (e) {
                    var page = e.detail.page;
                    router.pageBeforeAnimation(page);
                });
            },
            onhashchange: function() {
                var h = appFunc.getHashParameters();
                var page = (h.page === undefined)?'':h.page;
                
                switch(page) {
                    case '':
                        indexModule.init();
                        break;
                    case 'intro-p1':
                      var menuId = h.menuId;
                      var serviceId = h.serviceId;
                      introP1Module.init(menuId, serviceId);
                      break;
                    case 'intro-p2':
                      var menuId = h.menuId;
                      var serviceId = h.serviceId;
                      var introId = h.introId;
                      introP2Module.init(menuId,serviceId,introId);
                      break;
                }
            },
            pageBeforeInit: function(page) {
                switch (page.name) {
                    case 'intro-p1':
                        var serviceId = page.query.serviceId;
                        introP1Module.init(2, serviceId);
                        appFunc.hideToolbar();
                        break;
                    case 'intro-p2':
                        var introId = page.query.introId;
                        introP2Module.init(2,1,introId);
                        appFunc.hideToolbar();
                        break;
                    case 'movie-p1':
                        appFunc.hideToolbar();
                        break;
                    case 'TV':
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

        return {
            init: router.init
        };
});