
define([], function () {'use strict';

    function formatLocale(locale) {
        return locale.toLowerCase().replace(/_/g, '-');
    }

    function getLocale() {
        var userLocale = window.clearcaneStorage && window.clearcaneStorage.getItem('lang');
        var browserLocale = navigator.language && navigator.language;

        return formatLocale(userLocale || browserLocale || 'zh-cn');
    }
    
    function setLocale(locale) {
        window.clearcaneStorage && window.clearcaneStorage.setItem('lang', formatLocale(locale));
    }
    
    var exports = {};
    exports.getLocale = getLocale;
    exports.setLocale = setLocale;
    return exports;

});

