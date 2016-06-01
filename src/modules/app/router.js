define(['framework7', 'appFunc','indexModule', 'briefModule', 'roomModule', 'serviceModule', 'introP1Module'],
    function(framework7, appFunc, indexModule, briefModule, roomModule, serviceModule, introP1Module){

        var $$ = Dom7;

        var router = {
            init: function() {
                router.loadPage();
                $$(document).on('pageBeforeInit', function (e) {
                    var page = e.detail.page;
                    router.pageBeforeInit(page);
                });
                $$(document).on('pageBeforeAnimation', function (e) {
                    var page = e.detail.page;
                    router.pageBeforeAnimation(page);
                });
            },
            loadPage: function() {
              var page = (appFunc.getHashParameters().page === undefined)?'':appFunc.getHashParameters().page;
              if (page === '') {
                indexModule.init();
              }else {
                switch(page) {
                  case 'intro-p1':
                    introP1Module.init(2, 1);
                    break;
                }
              }
            },
            pageBeforeInit: function(page) {
                console.log(page.name);
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

        return {
            init: router.init
        };
});