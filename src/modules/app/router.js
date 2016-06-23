define(['framework7', 'wxJDK', 'config', 'appFunc', 'indexModule', 'briefModule', 'roomModule','roomReserveModule', 'serviceModule', 'hotelIntroListModule', 'hotelIntroListDetailModule', 'hotelIntroDetailModule', 'movieListModule','movieListDetailModule','tvListModule'],
    function(framework7, wxJDK, config, appFunc, indexModule, briefModule, roomModule,roomReserveModule, serviceModule, hotelIntroListModule, hotelIntroListDetailModule, hotelIntroDetailModule, movieListModule,movieListDetailModule,tvListModule){

        var $$ = Dom7;

        var router = {
            init: function() {

                router.wxJDKInit();
                
                $$(document).on('pageAfterBack', function (e) {
                    router.wxJDKInit();
                });

                $$(document).on('pageBeforeInit', function (e) {
                    router.wxJDKInit();
                    var page = e.detail.page;
                    router.pageBeforeInit(page);
                });
                $$(document).on('pageBeforeAnimation', function (e) {
                    var page = e.detail.page;
                    router.pageBeforeAnimation(page);
                });
            },
            wxJDKInit: function() {
                // wx 分享
                wxJDK.wxConfig();
        
                wx.error(function(){
                  wxJDK.wxConfig();
                })

                wx.ready(function(){
                  // 分享给朋友
                  wx.onMenuShareAppMessage(router.getWxMenuShareAppMessage()); 

                  // 分享给朋友圈
                  wx.onMenuShareTimeline(router.getWxMenuShareTimeline()); 
                });
            },
            getWxMenuShareAppMessage: function() {
                return {
                  title: document.title, // 分享标题
                  desc: window.location.hostname, // 分享描述
                  link: wxJDK.getWxRedirectUrl(), // 分享链接
                  imgUrl: appFunc.getFirstEleVal('img'), // 分享图标
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () { 
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () { 
                      // 用户取消分享后执行的回调函数
                  }
                }
            },
            getWxMenuShareTimeline: function() {
                return {
                  title: document.title, // 分享标题
                  desc: window.location.hostname, // 分享描述
                  link: wxJDK.getWxRedirectUrl(), // 分享链接
                  imgUrl: appFunc.getFirstEleVal('img'), // 分享图标
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () { 
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () { 
                      // 用户取消分享后执行的回调函数
                  }
                }
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
                else if (pageName.indexOf("room-reserve") >= 0) {
                    pageName = "room-reserve";
                }

                window.pageName = pageName;
                
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
                        // wxJDK.wxConfig();
                        var moduleId = page.query.moduleId;
                        moduleId = typeof(moduleId) === 'undefined' ? h.moduleId : moduleId;

                        var movieId = page.query.movieId;
                        movieId = typeof(movieId) === 'undefined' ? h.movieId : movieId;

                        movieListDetailModule.init(moduleId, movieId);
                        appFunc.hideToolbar();
                        break;
                    case 'tv-list':
                        // wxJDK.wxConfig();
                        var moduleId = page.query.moduleId;
                        moduleId = typeof(moduleId) === 'undefined' ? h.moduleId : moduleId;
                        
                        tvListModule.init(moduleId);
                        appFunc.hideToolbar();
                        break;
                    case 'room-reserve':
                        var moduleId = page.query.moduleId;
                        moduleId = typeof(moduleId) === 'undefined' ? h.moduleId : moduleId;

                        var roomId = page.query.roomId;
                        roomId = typeof(roomId) === 'undefined' ? h.roomId : roomId;

                        var checkIn = page.query.checkIn;
                        checkIn = typeof(checkIn) === 'undefined' ? h.checkIn : checkIn;

                        var checkOut = page.query.checkOut;
                        checkOut = typeof(checkOut) === 'undefined' ? h.checkOut : checkOut;

                        roomReserveModule.init(moduleId,roomId,checkIn,checkOut);
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