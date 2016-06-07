
define([], function () {'use strict';

    /**
     * 本地配置调试开关
     */
    var useLocalConfig = true;

    var requestURL = useLocalConfig ? 'http://localhost/clear-hotel-mobile/src/api/' : 'api/';

    /**
     * 微信公众号唯一标识
     */
     var appId;

    return {
        /**
         * 返回JSON地址
         * @param k
         * @returns {string}
         */
        getJSONUrl: function (k) {
            return requestURL + k + '.json';
        },
        /**
         * 返回服务器根目录配置地址
         * @returns {string}
         */
        getrequestURL: function () {
            return requestURL;
        },
        /**
         * 设置appId
         * @param k
         */
        setAppId: function(k) {
            appId = k;
        },
        /**
         * 获取appId
         * @returns {string}
         */
        getAppId: function() {
            return (typeof(appId) === "undefined") ? '' : appId;
        }
    };

});
