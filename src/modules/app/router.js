define(['framework7', 'appFunc', 'indexModule', 'briefModule', 'roomModule', 'serviceModule', 'hotelIntroListModule', 'hotelIntroListDetailModule', 'hotelIntroDetailModule', 'movieListModule','movieListDetailModule','tvListModule'],
    function(framework7, appFunc, indexModule, briefModule, roomModule, serviceModule, hotelIntroListModule, hotelIntroListDetailModule, hotelIntroDetailModule, movieListModule,movieListDetailModule,tvListModule){

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
                var pageName = page.name;
                if (pageName.indexOf("hotel-intro-list-detail") >= 0) {
                    pageName = "hotel-intro-list-detail";
                }
                else if (pageName.indexOf("hotel-intro-list") >= 0) {
                    pageName = "hotel-intro-list";
                }
                else if (pageName.indexOf("hotel-intro-detail") >= 0) {
                    pageName = "hotel-intro-detail";
                }
                else if (pageName.indexOf("movie-list-detail") >= 0) {
                    pageName = "movie-list-detail";
                }
                else if (pageName.indexOf("movie-list") >= 0) {
                    pageName = "movie-list";
                }
                else if (pageName.indexOf("tv-list") >= 0) {
                    pageName = "tv-list";
                }
                
                var h = appFunc.getHashParameters();
                
                switch (pageName) {
                    case 'hotel-intro-list':
                        var moduleId = page.query.moduleId;
                        moduleId = typeof(moduleId) === 'undefined' ? h.moduleId : moduleId;

                        hotelIntroListModule.init(moduleId);
                        appFunc.hideToolbar();
                        break;
                    case 'hotel-intro-list-detail':
                        var introListDetailID = page.query.introListDetailID;
                        introListDetailID = typeof(introListDetailID) === 'undefined' ? h.introListDetailID : introListDetailID;

                        hotelIntroListDetailModule.init(introListDetailID);
                        appFunc.hideToolbar();
                        break;
                    case 'hotel-intro-detail':
                        var moduleId = page.query.moduleId;
                        moduleId = typeof(moduleId) === 'undefined' ? h.moduleId : moduleId;

                        hotelIntroDetailModule.init(moduleId);
                        appFunc.hideToolbar();
                        break;   
                    case 'movie-list':
                        var moduleId = page.query.moduleId;
                        moduleId = typeof(moduleId) === 'undefined' ? h.moduleId : moduleId;
                        
                        movieListModule.init(moduleId);
                        appFunc.hideToolbar();
                        break;
                    case 'movie-list-detail':
                        var moduleId = page.query.moduleId;
                        moduleId = typeof(moduleId) === 'undefined' ? h.moduleId : moduleId;

                        var movieId = page.query.movieId;
                        movieId = typeof(movieId) === 'undefined' ? h.movieId : movieId;

                        movieListDetailModule.init(moduleId, movieId);
                        appFunc.hideToolbar();
                        break;
                    case 'tv-list':
                        var moduleId = page.query.moduleId;
                        moduleId = typeof(moduleId) === 'undefined' ? h.moduleId : moduleId;
                        
                        tvListModule.init(moduleId);
                        appFunc.hideToolbar();
                        break;
                    case 'room-reserve':
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