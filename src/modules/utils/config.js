
define([], function () {'use strict';

    /**
     * 本地配置调试开关
     */
    var useLocalConfig = false;
    var requestURL = useLocalConfig ? 'http://m.cleartv.cn/wx/api/' : 'http://mback.cleartv.cn/backend_terminal/v1/';

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

    /**
     * 微信用户唯一标识
     */
    var openId;

    return {
        /**
         * 返回JSON地址
         * @param k
         * @returns {string}
         */
        getJSONUrl: function (k) {
            var e = useLocalConfig ? '.json' : '/';

            if (!useLocalConfig) {
                switch(k) {
                    case 'hotel_intro_list-detail':
                        k = 'hotel_intro_lists';
                        break;
                }
            }

            return requestURL + k + e;
        },
        /**
         * 返回JSON地址
         * @param s, l
         * @returns {string}
         */
        getFullJSONUrl: function (s, l) {
            var url = useLocalConfig ? l : s;
            return url;
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
        },
        /**
         * 设置openId
         * @param k
         */
        setOpenId: function(k) {
            openId = k;
        },
        /**
         * 获取openId
         * @returns {string}
         */
        getOpenId: function() {
            return (typeof(openId) === "undefined") ? '' : openId;
        }
    };

});
