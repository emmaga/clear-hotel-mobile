
define([], function () {'use strict';

    /**
     * 本地配置调试开关
     */
    var useLocalConfig = false;

    var requestURL = useLocalConfig ? 'api/' : 'api/';

    return {
        /**
         * 返回JSON地址
         * @param k
         * @returns {string}
         */
        getJSONUrl: function (k) {
            return requestURL + k + '.json';
        }
    };

});
