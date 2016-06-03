define(['framework7','config', 'xhr','appFunc','router','text!movie/movie-p2.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){
        var $$ = Dom7;

        var movieP2 = {
            bindEvents: function(menuId) {
            },
            loadData: function(menuId,serviceId,movieId,data,isFirst) {
                var renderData = data.movieP2;
                var output = appFunc.renderTpl(template,renderData);
                //window.viewMain.router.load({
                //    content: output
                //});
                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="movie-p2" class="page">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-movie-p2').html(output);
                    movieP2.bindEvents(menuId);
                }
            }
        }

        var init = function (menuId,serviceId,movieId,isFirst){
            xhr.ajax({
                'url': config.getJSONUrl('movie-p2'),
                dataType: 'json',
                'success': function(data){movieP2.loadData(menuId,serviceId,movieId,data,isFirst)}
            })
        };
        return {
            init: init
        };
    });