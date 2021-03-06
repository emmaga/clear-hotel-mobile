
(function() {'use strict';

    var locale = (window.clearcraneStorage && window.clearcraneStorage.getItem('lang') ||
    navigator.language && navigator.language ||
    'zh-cn').toLowerCase().replace(/_/g, '-');

    // 默认中文以外语言设置en-us
    locale = (locale === 'zh-cn') ? locale : 'en-us';

    var i18nText = 'lang/' + locale;
    requirejs.config({
        baseUrl: '../modules',
        paths: {
            'text' : '../lib/text',
            'framework7': '../lib/Framework7/js/framework7.min',
            'router': 'app/router',
            'indexModule': 'index/index',
            'briefModule': 'brief/brief',
            'roomModule': 'room/room',
            'roomReserveModule': 'room/room-reserve',
            'orderDetail':'room/order-detail',
            'serviceModule': 'service/service',
            'hotelIntroListModule': 'hotel-intro-list/hotel-intro-list',
            'hotelIntroListDetailModule':'hotel-intro-list/hotel-intro-list-detail',
            'hotelIntroDetailModule': 'hotel-intro-detail/hotel-intro-detail',
            'movieListModule':'movie-list/movie-list',
            'movieListDetailModule':'movie-list/movie-list-detail',
            'tvListModule':'tv-list/tv-list',
            'myModule':'my/my',
            'appFunc': 'utils/appFunc',
            'errorFunc': 'utils/errorFunc',
            'i18n': 'utils/i18n',
            'i18nText': i18nText,
            'xhr': 'utils/xhr',
            'config': 'utils/config',
            'wxJDK': 'utils/wxJDK',
            'storage': 'utils/storage'
        }
    });
}(window.requirejs));

requirejs(['framework7', 'config', 'appFunc', 'router', 'xhr', 'storage', 'indexModule'], 
    function (framework7,config, appFunc, router, xhr, storage, indexModule) {
    
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
        setAppId: function() {
            var state = appFunc.getSearchParameters().state ? appFunc.getParameters(appFunc.getSearchParameters().state, '+') : {};
            var appId = state.appid ? state.appid : '';
            if (appId !== '') {
                config.setAppId(appId);
            }
        },
        setAppName: function() {
            var state = appFunc.getSearchParameters().state ? appFunc.getParameters(appFunc.getSearchParameters().state, '+') : {};
            var appName = state.appname ? state.appname : '';
            if (appName !== '') {
                config.setAppName(appName);
            }
        },
        setClearToken: function() {
            var clearToken = appFunc.getSearchParameters().cleartoken ? appFunc.getSearchParameters().cleartoken : '';
            if (clearToken !== '') {
                config.setClearToken(clearToken);
            }
        },
        setOpenId: function() {
            var openId = appFunc.getSearchParameters().openid ? appFunc.getSearchParameters().openid : '';
            if (openId !== '') {
                config.setOpenId(openId);
            }
        },
        initMainView: function() {
            app.setAppId();
            app.setAppName();
            app.setClearToken();
            app.setOpenId();
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