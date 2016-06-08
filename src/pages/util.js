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