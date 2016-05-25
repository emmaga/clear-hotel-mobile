requirejs.config({
    baseUrl: 'modules',
    paths: {
        text : '../lib/text',
        'framework7': '../lib/Framework7/js/framework7.min',
        'hiModule': 'hi/hi',
        'roomModule': 'room/room',
        'serviceModule': 'service/service',
        'myModule': 'my/my',
        'tvModule': 'tv/tv',
        'appFunc': 'utils/appFunc'
    }
});

requirejs(['framework7','router'], function (framework7,router) {
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
            hotelApp = new Framework7({   
                pushState:true,
                pushStateSeparator:''
            });

            // Export selectors engine
            var $$ = Dom7;

            // Add views
            window.view1 = hotelApp.addView('#view-1');
            window.view2 = hotelApp.addView('#view-2');
            window.view3 = hotelApp.addView('#view-3');
            window.view4 = hotelApp.addView('#view-4');

            // 导航按钮切换
            $$("a[href='#view-1']").on('click', function (e) {
                router.loadView('#view-1');
            })
            $$("a[href='#view-2']").on('click', function (e) {
                router.loadView('#view-2');
            })
            $$("a[href='#view-3']").on('click', function (e) {
                router.loadView('#view-3');
            })
            $$("a[href='#view-4']").on('click', function (e) {
                router.loadView('#view-4');
            })
            

            // init app
            router.init();
            router.loadView('#view-1');
        }
    }

    app.initialize();
})