
define([], function () {'use strict';

    function formatLocale(locale) {
        // 默认中文以外语言设置en-us
        locale = locale.toLowerCase().replace(/_/g, '-');
        locale = (locale === 'zh-cn') ? locale : 'en-us';
        return locale;
    }

    function getLocale() {
        var userLocale = window.clearcraneStorage && window.clearcraneStorage.getItem('lang');
        var browserLocale = navigator.language;
        
        return formatLocale(userLocale || browserLocale || 'zh-cn');
    }
    
    function setLocale(locale) {
        window.clearcraneStorage && window.clearcraneStorage.setItem('lang', formatLocale(locale));
    }
    
    var exports = {};
    exports.getLocale = getLocale;
    exports.setLocale = setLocale;
    return exports;

});