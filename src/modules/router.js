define(['framework7', 'appFunc', 'hiModule', 'roomModule', 'serviceModule', 'myModule'], 
    function(framework7, appFunc, hiModule, roomModule, serviceModule, myModule){

        var $$ = Dom7;

        var router = {
            init: function() {
                var that = this;
                $$(document).on('pageBeforeInit', function (e) {
                    var page = e.detail.page;
                    that.pageBeforeInit(page);
                });
            },
            pageBeforeInit: function(page) {
                switch (page.name) {
                    case 'tv':
                        appFunc.hideToolbar();
                        break;
                }
            }
        }

        var init = function() {
            router.init();
        }

        var loadView = function (query){
            switch (query) {
                case '#view-1':
                    hiModule.init();
                    break;
                case '#view-2':
                    roomModule.init();
                    break;
                case '#view-3':
                    serviceModule.init();
                    break;
                case '#view-4':
                    myModule.init();
                    break;        
            }
        };
        return {
            loadView: loadView,
            init: init
        };
});