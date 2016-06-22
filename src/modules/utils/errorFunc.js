define(['framework7', 'i18nText', 'config'], function(framework7, i18nText, config){

    var $$ = Dom7;

    var error = function (errCode) {
        switch (errCode) {

            // 抱歉，该页面已过期，你可以重新访问该页面，通过关注公众号：xxx
            case '301':
            case 301:
                var message = i18nText.error.error_expired + decodeURI(config.getAppName()) + i18nText.error.error_expired2;
                hotelApp.alert('', message);
                break;
            case 404:
                var message = i18nText.error.error_text;
                hotelApp.alert('', message);
                break;
            // 未知错误    
            case 100001:
                var message = i18nText.error.unknown_error;
                hotelApp.alert('', message); 
                break; 
            // 网络错误    
            case 100002:
                var message = i18nText.error.http_error;
                hotelApp.alert('', message); 
                break;  
            // 无网络连接    
            case 100003:
                var message = i18nText.error.no_network;
                hotelApp.alert('', message); 
                break; 
            // 404, 页面未找到       
            case 100404:
                var message = i18nText.error.not_found;
                hotelApp.alert('', message); 
                break;   
        }
    }

    return {
        error: error
    };
});