
define(['i18nText'], function (i18nText) {'use strict';

    // http://stackoverflow.com/questions/1730692/jquery-ajax-how-to-detect-network-connection-error-when-making-ajax-call
    function wrapOptions(options) {
        options = typeof options === 'object' ? options : {};
        if (options.suppressError !== true) {
            var errorCallback = options.error;
            options.error = function (xhr, status) {
                var hotelApp = window.hotelApp,
                    message = i18nText.error.unknown_error;
                if (xhr.readyState === 4) {
                    message = i18nText.error.http_error;
                } else if (xhr.readyState === 0) {
                    message = i18nText.error.no_network;
                }
                if (hotelApp) {
                    hotelApp.alert(message);
                }
                return typeof errorCallback === 'function' && errorCallback(xhr, status);
            };
        }
        return options;
    }

    function ajax(options) {
        return window.Dom7.ajax(wrapOptions(options));
    }
    
    function get(url, data, success) {
        return window.Dom7.get(url, data, success);
    }
    
    function post(url, data, success) {
        return window.Dom7.post(url, data, success);
    }
    
    function getJSON(url, data, success) {
        return window.Dom7.getJSON(url, data, success);
    }

    var exports = {};
    exports.ajax = ajax;
    exports.get = get;
    exports.post = post;
    exports.getJSON = getJSON;
    return exports;

});
