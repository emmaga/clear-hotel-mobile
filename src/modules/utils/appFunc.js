define(['framework7'], function(framework7){

    var $$ = Dom7;

    var renderTpl = function(markup,renderData){
        var compiledTemplate = Template7.compile(markup);
        return compiledTemplate(renderData);
    };

    var hideToolbar = function() {
        window.hotelApp.hideToolbar('.toolbar');
        $$('.toolbar').hide();
    };

    var showToolbar = function() {
        $$('.toolbar').show();
        window.hotelApp.showToolbar('.toolbar');
    };

    var getHashParameters = function () {
        var queryString = window.location.hash;
        queryString = queryString.substr(1);
        var ret = getParameters(queryString, '&');
        return ret;
    };

    var getSearchParameters = function () {
        var queryString = window.location.search;
        queryString = queryString.substr(1);
        var ret = getParameters(queryString, '&');
        return ret;
    }

    var getParameters = function (queryString, splitStr) {
        if (queryString.length <= 1) {
            return {};
        }
        var pairs = queryString.split(splitStr);
        var ret = {};
        pairs.forEach(function (el, idx, arr) {
            var i = el.indexOf('='), k, v;
            if (i === -1) {
                k = el;
                v = '';
            } else if (i === el.length - 1) {
                k = el.substring(0, el.length - 1);
                v = '';
            } else {
                k = el.substring(0, i);
                v = el.substring(i + 1);
            }
            ret[k] = v;
        });
        return ret;
    }

    return {
        renderTpl: renderTpl,
        hideToolbar: hideToolbar,
        showToolbar: showToolbar,
        getHashParameters: getHashParameters,
        getSearchParameters: getSearchParameters,
        getParameters: getParameters
    };
});