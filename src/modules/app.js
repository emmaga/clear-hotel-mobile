
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
            'hiModule': 'hi/hi',
            'roomModule': 'room/room',
            'serviceModule': 'service/service',
            'myModule': 'my/my',
            'tvModule': 'tv/tv',
            'appFunc': 'utils/appFunc',
            'i18n': 'utils/i18n',
            'i18nText': i18nText,
            'xhr': 'utils/xhr',
            'config': 'utils/config',
            'storage': 'utils/storage'
        }
    });
}(window.requirejs));

requirejs(['framework7','router', 'config','xhr', 'storage'], function (framework7,router,config,xhr,storage) {
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
                pushState:true,
                pushStateSeparator:''
            });

            // Export selectors engine
            var $$ = Dom7;

            // Add views
            window.viewMain = hotelApp.addView('.view-main');

            // 导航按钮切换
            $$("a[href='#tab1']").on('click', function (e) {
                router.loadContent('#tab1');
            });
            $$("a[href='#tab2']").on('click', function (e) {
                router.loadContent('#tab2');
            });
            $$("a[href='#tab3']").on('click', function (e) {
                router.loadContent('#tab3');
            });
            $$("a[href='#tab4']").on('click', function (e) {
                router.loadContent('#tab4');
            });

            // init app
            router.init();
            router.loadContent('#tab1');

        }
    };

    app.initialize();
})