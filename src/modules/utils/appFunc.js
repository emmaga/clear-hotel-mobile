define(['framework7'], function(framework7){

    var $$ = Dom7;

    var renderTpl = function(markup,renderData){
        var compiledTemplate = Template7.compile(markup);
        return compiledTemplate(renderData);
    };

    var hideToolbar = function() {
        window.hotelApp.hideToolbar('.toolbar');
    };

    var showToolbar = function() {
        window.hotelApp.showToolbar('.toolbar');
    };

    var isPhonegap = function () {
        // http://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser
        return document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    };

    return {
        renderTpl: renderTpl,
        hideToolbar: hideToolbar,
        showToolbar: showToolbar,
        isPhonegap: isPhonegap
    };
});