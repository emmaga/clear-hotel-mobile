define(['framework7', 'appFunc', 'indexModule', 'briefModule', 'roomModule', 'serviceModule', 'introP1Module', 'introP2Module','movieP1Module','movieP2Module','TVModule'],
    function(framework7, appFunc, indexModule, briefModule, roomModule, serviceModule, introP1Module, introP2Module,movieP1Module,movieP2Module,TVModule){

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
                    case 'movie-p1':
                        var menuId = h.menuId;
                        var serviceId = h.serviceId;
                        movieP1Module.init(menuId,serviceId);
                        break;
                    case 'movie-p2':
                        var menuId = h.menuId;
                        var serviceId = h.serviceId;
                        var movieId = h.movieId;
                        movieP2Module.init(menuId,serviceId,movieId);
                        break;
                    case 'TV':
                        var menuId = h.menuId;
                        var serviceId = h.serviceId;;
                        TVModule.init(menuId,serviceId);
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
                        var serviceId = page.query.serviceId;
                        var introId = page.query.introId;
                        introP2Module.init(2,serviceId,introId);
                        appFunc.hideToolbar();
                        break;
                    case 'movie-p1':
                        var serviceId = page.query.serviceId;
                        movieP1Module.init(2, serviceId);
                        appFunc.hideToolbar();
                        break;
                    case 'movie-p2':
                        var serviceId = page.query.serviceId;
                        var movieId = page.query.movieId;
                        movieP2Module.init(2,serviceId,movieId);
                        appFunc.hideToolbar();
                        break;
                    case 'TV':
                        var serviceId = page.query.serviceId;
                        TVModule.init(2, serviceId);
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