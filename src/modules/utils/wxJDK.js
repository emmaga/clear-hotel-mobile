
define(['xhr', 'config'], function (xhr, config) {'use strict';

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
                        callback_f();
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
                    if (rescode == 200) {
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
                    appId: appId, // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: signature,// 必填，签名，见附录1
                    jsApiList: ['getNetworkType'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
        
        }
    };

});
