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
                $$(document).on('pageBeforeAnimation', function (e) {
                    var page = e.detail.page;
                    that.pageBeforeAnimation(page);
                });
            },
            pageBeforeInit: function(page) {
                switch (page.name) {
                    case 'tv':
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

        var init = function() {
            router.init();
        }

        var loadContent = function (query){
            switch (query) {
                case '#tab1':
                    hiModule.init();
                    break;
                case '#tab2':
                    roomModule.init();
                    break;
                case '#tab3':
                    serviceModule.init();
                    break;
                case '#tab4':
                    myModule.init();
                    break;        
            }
        };
        return {
            loadContent: loadContent,
            init: init
        };
});