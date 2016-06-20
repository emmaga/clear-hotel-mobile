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

    /*
    任意格式的时间转换为毫秒数
    */
    var dateToTime = function(date){
        var time = (new Date(date)).getTime();
        return time;
    }

    /*
    毫秒数转换为时间，格式为format（例如‘yyyy/MM/dd’）
    */
    var timeToDate = function(time,format){
        var t = new Date(time);
        var tf = function(i){return (i < 10 ? '0' : '') + i};
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
            switch(a){
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    }

    /*
    将普通日期转换为日历上的日期格式（即月份为0-11）
    */
    var toCalendarDate = function(date){
        var stringArr = date.split('/');
        stringArr[1] = Number(stringArr[1]) - 1;
        var calendarDate = stringArr.join('/');
        return calendarDate;
    }

    /*
    为DOM元素手写的addClass方法
    */
    var addClass = function(ele,newClass){
        if(ele.className == ''){
            ele.className = newClass;
        } else{
            ele.className += ' ' + newClass;
        }
    }

    /*
    手机号的正则检测（是否以数字1开头，是否是11位数字）
    */
    var checkMobile = function(str) {
        var
            re = /^1\d{10}$/
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    return {
        renderTpl: renderTpl,
        hideToolbar: hideToolbar,
        showToolbar: showToolbar,
        getHashParameters: getHashParameters,
        getSearchParameters: getSearchParameters,
        getParameters: getParameters,
        dateToTime:dateToTime,
        timeToDate:timeToDate,
        addClass:addClass,
        checkMobile:checkMobile,
        toCalendarDate:toCalendarDate
    };
});