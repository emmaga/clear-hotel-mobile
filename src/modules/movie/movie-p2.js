define(['framework7','config', 'xhr','appFunc','router','text!movie/movie-p2.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){
        var $$ = Dom7;

        var movieP2 = {
            bindEvents: function(menuId) {
                //$$(document).on('click', '.introMenu', function (e) {
                    //var introId = $$(this).attr("data-introId");
                //});
            },
            loadData: function(menuId,data) {
                var renderData = data.movieP2;
                var output = appFunc.renderTpl(template,renderData);
                window.viewMain.router.load({
                    content: output
                });
                movieP2.bindEvents(menuId);
            }
        }

        var init = function (menuId){
            xhr.ajax({
                'url': config.getJSONUrl('movie-p2'),
                dataType: 'json',
                'success': function(data){movieP2.loadData(menuId,data)}
            })
        };
        return {
            init: init
        };
    });