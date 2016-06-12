
define([], function () {'use strict';

    /**
     * 本地配置调试开关
     */
    var useLocalConfig = false;
    
    var requestURL = useLocalConfig ? 'http://localhost/clear-hotel-mobile/src/api/' : 'http://mback.cleartv.cn/backend_terminal/v1/';
    // var requestURL = useLocalConfig ? 'http://m.cleartv.cn/wx/api/' : 'http://mback.cleartv.cn/backend_terminal/v1/';

    /**
     * 微信公众号唯一标识
     */
    var appId;

    /**
     * 微信公众号名称
     */
    var appName;

    /**
     * 清鹤后台接口token
     */
    var clearToken; 

    return {
        /**
         * 返回JSON地址
         * @param k
         * @returns {string}
         */
        getJSONUrl: function (k) {
            var e = useLocalConfig ? '.json' : '/';
            return requestURL + k + e;
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
        },
        /**
         * 设置appName
         * @param k
         */
        setAppName: function(k) {
            appName = k;
        },
        /**
         * 获取appName
         * @returns {string}
         */
        getAppName: function() {
            return (typeof(appName) === "undefined") ? '' : appName;
        },
        /**
         * 设置clearToken
         * @param k
         */
        setClearToken: function(k) {
            clearToken = k;
        },
        /**
         * 获取clearToken
         * @returns {string}
         */
        getClearToken: function() {
            return (typeof(clearToken) === "undefined") ? '' : clearToken;
        }
    };

});
