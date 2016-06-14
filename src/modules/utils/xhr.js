
define(['i18nText', 'i18n'], function (i18nText, i18n) {'use strict';

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
        
        // set lang
        if (options.data === undefined) {
            options.data = {};
            options.data.lang = i18n.getLocale();
        }
        else {
            options.data.lang = i18n.getLocale();
        }

        //JSON.stringify(data)
        options.data = JSON.stringify(options.data);   
        return window.Dom7.ajax(wrapOptions(options));
    }

    function createShortcuts($) {
        var methods = ('get post getJSON').split(' ');
        function createMethod(method) {
            $[method] = function (url, data, success, error, suppressError) {
                var options = {
                    url: url,
                    method: method === 'post' ? 'POST' : 'GET',
                    data: typeof data === 'function' ? undefined : data,
                    success: typeof data === 'function' ? data : success,
                    error: typeof data === 'function' ? success : error,
                    dataType: method === 'getJSON' ? 'json' : undefined
                };
                if (typeof suppressError === 'boolean') {
                    options.suppressError = suppressError;
                }

                return $.ajax(options);
            };
        }
        for (var i = 0; i < methods.length; i++) {
            createMethod(methods[i]);
        }
    }

    var exports = {};
    exports.ajax = ajax;
    createShortcuts(exports);
    return exports;

});
