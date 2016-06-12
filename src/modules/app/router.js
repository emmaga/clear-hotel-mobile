define(['framework7', 'appFunc', 'indexModule', 'briefModule', 'roomModule', 'serviceModule', 'hotelIntroListModule', 'hotelIntroListDetailModule', 'hotelIntroDetailModule', 'movieListModule','movieListDetailModule','TVModule'],
    function(framework7, appFunc, indexModule, briefModule, roomModule, serviceModule, hotelIntroListModule, hotelIntroListDetailModule, hotelIntroDetailModule, movieListModule,movieListDetailModule,TVModule){

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
                    case 'hotel-intro-list':
                        var moduleId = page.query.moduleId;
                        hotelIntroListModule.init(moduleId);
                        appFunc.hideToolbar();
                        break;
                    case 'hotel-intro-list-detail':
                        var introListDetailID = page.query.introListDetailID;
                        hotelIntroListDetailModule.init(introListDetailID);
                        appFunc.hideToolbar();
                        break;
                    case 'hotel-intro-detail':
                        var moduleId = page.query.moduleId;
                        hotelIntroDetailModule.init(moduleId);
                        appFunc.hideToolbar();
                        break;   
                    case 'movie-list':
                        var moduleId = page.query.moduleId;
                        movieListModule.init(moduleId);
                        appFunc.hideToolbar();
                        break;
                    case 'movie-list-detail':
                        var moduleId = page.query.moduleId;
                        var movieId = page.query.movieId;
                        movieListDetailModule.init(moduleId, movieId);
                        appFunc.hideToolbar();
                        break;
                    case 'TV':
                        var moduleId = page.query.moduleId;
                        TVModule.init(moduleId);
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