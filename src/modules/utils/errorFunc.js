define(['framework7', 'i18nText', 'config'], function(framework7, i18nText, config){

    var $$ = Dom7;

    var error = function (errCode) {
        switch (errCode) {

            // 抱歉，该页面已过期，你可以重新访问该页面，通过关注公众号：xxx
            case 301:
                var message = i18nText.error.error_expired + decodeURI(config.getAppName());
                hotelApp.alert(message);
                break;
            case 404:
                var message = i18nText.error.error_text;
                hotelApp.alert(message);
                break;
        }
    }

    return {
        error: error
    };
});