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

    return {
        renderTpl: renderTpl,
        hideToolbar: hideToolbar,
        showToolbar: showToolbar
    };
});