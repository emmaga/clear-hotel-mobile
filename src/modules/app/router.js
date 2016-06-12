define(['framework7', 'appFunc', 'indexModule', 'briefModule', 'roomModule', 'serviceModule', 'introP1Module', 'introP2Module','movieP1Module','movieP2Module','TVModule'],
    function(framework7, appFunc, indexModule, briefModule, roomModule, serviceModule, introP1Module, introP2Module,movieP1Module,movieP2Module,TVModule){

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
                        var moduleId = page.query.moduleId;
                        introP1Module.init(2, moduleId);
                        appFunc.hideToolbar();
                        break;
                    case 'intro-p2':
                        var moduleId = page.query.moduleId;
                        var introId = page.query.introId;
                        introP2Module.init(2,moduleId,introId);
                        appFunc.hideToolbar();
                        break;
                    case 'movie-p1':
                        var moduleId = page.query.moduleId;
                        movieP1Module.init(2, moduleId);
                        appFunc.hideToolbar();
                        break;
                    case 'movie-p2':
                        var moduleId = page.query.moduleId;
                        var movieId = page.query.movieId;
                        movieP2Module.init(2,moduleId,movieId);
                        appFunc.hideToolbar();
                        break;
                    case 'TV':
                        var moduleId = page.query.moduleId;
                        TVModule.init(2, moduleId);
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