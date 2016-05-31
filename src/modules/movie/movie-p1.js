define(['framework7','config', 'xhr','appFunc','router','text!movie/movie-p1.tpl.html','movieP2Module'],
    function(framework7,config, xhr,appFunc,router,template,movieP2Module){

        var $$ = Dom7;

        var movieP1 = {
            bindEvents: function(menuId) {
                $$(document).on('click', '.introMenu', function (e) {
                    var introId = $$(this).attr("data-introId");
                    //console.log(introId);
                    movieP2Module.init(menuId,introId);
                });
            },
            loadData: function(menuId,data) {
                var renderData = data.movieP1;
                var output = appFunc.renderTpl(template,renderData);
                window.viewMain.router.load({
                    content: output
                })
                movieP1.bindEvents(menuId);
            }
        }

        var init = function (menuId){
            xhr.ajax({
                'url': config.getJSONUrl('movie-p1'),
                dataType: 'json',
                'success': function(data){movieP1.loadData(menuId,data)}
            })
        };
        return {
            init: init
        };
    });