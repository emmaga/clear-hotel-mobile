
define(['xhr', 'config', 'appFunc'], function (xhr, config, appFunc) {'use strict';

    return {        
        /**
         * 当网络环境不是wifi时，do callback_t, else do callback_f
         * @param callback_t, @param callback_f
         */
        isNetworkTypeNotWifi: function(callback_t, callback_f) {
            wx.getNetworkType({
                success: function (res) {
                    var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    if(networkType !== 'wifi') {
                        callback_t();
                    }
                    else {
                        if(callback_f) {
                            callback_f();
                        }
                    }
                }
            });
        },
        /**
         * wx JSSDK config
         * http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         */
        wxConfig: function () {
            var timestamp = new Date().getTime(),
                signature,
                jsapi_ticket,
                url = window.location.origin + window.location.pathname + window.location.search,
                // http://www.cnblogs.com/sunshq/p/4171490.html
                nonceStr = Math.random().toString(36).substr(2);


            var data = {
                "action": "GETJSSign",
                "project_name": config.getAppId(),
                "token": config.getClearToken(),
                "noncestr": nonceStr,
                "timestamp": timestamp,
                "url": url
            }

            xhr.ajax({
                'url': config.getJSONUrl('js_sdk'),
                dataType: 'json',
                data: data,
                method: 'POST',
                'success': function(data){
                    if (data.rescode == 200) {
                      signature = data.signature;
                      wxSign();
                    }
                    else {
                      errorFunc.error(rescode);
                    }
                }
            })

            function wxSign() {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: config.getAppId(), // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: signature,// 必填，签名，见附录1
                    jsApiList: ['getNetworkType', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
        },
        /**
         * wx 获取分享首页跳转地址
         */
        getWxRedirectUrl: function() {
            var appId = config.getAppId(),
                stateRedirectUriCode,
                redirectUri = encodeURIComponent(config.getCallBackEntryUrl());

            var page = window.location.pathname;
            var pageHash = window.location.hash;
            page = pageHash !== "" ? pageHash : page;

            // index
            if(appFunc.hasStr(page, 'index')) {
                stateRedirectUriCode = '';
            }

            // room-reserve
            else if(appFunc.hasStr(page, 'room-reserve')) {
                var moduleId = appFunc.getSearchParameters().moduleId ? appFunc.getSearchParameters().moduleId : appFunc.getHashParameters().moduleId;
                stateRedirectUriCode = '1,2,' + moduleId;
            }

            // hotel-intro-list-detail
            else if(appFunc.hasStr(page, 'hotel-intro-list-detail')) {
                var introListDetailID = appFunc.getSearchParameters().introListDetailID ? appFunc.getSearchParameters().introListDetailID : appFunc.getHashParameters().introListDetailID;
                stateRedirectUriCode = '3,' + introListDetailID;
            }

            // hotel-intro-list
            else if(appFunc.hasStr(page, 'hotel-intro-list')) {
                var moduleId = appFunc.getSearchParameters().moduleId ? appFunc.getSearchParameters().moduleId : appFunc.getHashParameters().moduleId;
                stateRedirectUriCode = '2,' + moduleId;
            }

            // hotel-intro-detail
            else if(appFunc.hasStr(page, 'hotel-intro-detail')) {
                var moduleId = appFunc.getSearchParameters().moduleId ? appFunc.getSearchParameters().moduleId : appFunc.getHashParameters().moduleId;
                stateRedirectUriCode = '4,' + moduleId;
            }

            // movie-list-detail
            else if(appFunc.hasStr(page, 'movie-list-detail')) {
                var moduleId = appFunc.getSearchParameters().moduleId ? appFunc.getSearchParameters().moduleId : appFunc.getHashParameters().moduleId;
                var movieId = appFunc.getSearchParameters().movieId ? appFunc.getSearchParameters().movieId : appFunc.getHashParameters().movieId;
                stateRedirectUriCode = '6,' + moduleId + ',' + movieId;
            }

            // movie-list
            else if(appFunc.hasStr(page, 'movie-list')) {
                var moduleId = appFunc.getSearchParameters().moduleId ? appFunc.getSearchParameters().moduleId : appFunc.getHashParameters().moduleId;
                stateRedirectUriCode = '5,' + moduleId;
            }

            // tv-list
            else if(appFunc.hasStr(page, 'tv-list')) {
                var moduleId = appFunc.getSearchParameters().moduleId ? appFunc.getSearchParameters().moduleId : appFunc.getHashParameters().moduleId;
                stateRedirectUriCode = '7,' + moduleId;
            }

            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId +
                      '&redirect_uri=' + redirectUri +
                      '&response_type=code&scope=snsapi_base' +
                      '&state=ai=' + appId + 
                      '+ru=' + stateRedirectUriCode + '#wechat_redirect';
            
            return url;
        }
    };

});
