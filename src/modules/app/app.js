
(function() {'use strict';

    var locale = (window.clearcaneStorage && window.clearcaneStorage.getItem('lang') ||
    navigator.language && navigator.language ||
    'zh-cn').toLowerCase().replace(/_/g, '-');

    var i18nText = 'lang/' + locale;
    requirejs.config({
        baseUrl: 'modules',
        paths: {
            'text' : '../lib/text',
            'framework7': '../lib/Framework7/js/framework7.min',
            'router': 'app/router',
            'indexModule': 'index/index',
            'briefModule': 'brief/brief',
            'roomModule': 'room/room',
            'serviceModule': 'service/service',
            'introP1Module': 'intro/intro-p1',
            'introP2Module':'intro/intro-p2',
            'movieP1Module':'movie/movie-p1',
            'movieP2Module':'movie/movie-p2',
            'appFunc': 'utils/appFunc',
            'i18n': 'utils/i18n',
            'i18nText': i18nText,
            'xhr': 'utils/xhr',
            'config': 'utils/config',
            'storage': 'utils/storage'
        }
    });
}(window.requirejs));

requirejs(['framework7', 'config', 'router', 'xhr', 'storage', 'indexModule'], 
    function (framework7,config, router, xhr,storage, indexModule) {
    
    var app = {
        initialize: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            window.onload = this.onDeviceReady();
        },
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        receivedEvent: function(event) {
            switch (event) {
                case 'deviceready':
                    app.initMainView();
                    break;
            }
        },
        initMainView: function() {
            app.initFramework7();
        },
        initFramework7: function() {
            // Initialize your app
            window.hotelApp = new Framework7({
                dynamicPageUrl:'{{name}}',
                pushState:true,
                pushStateSeparator:''
            });

            // Export selectors engine
            var $$ = Dom7;

            // init router
            router.init();

            // init index
            indexModule.init();
        }
    };

    app.initialize();
})