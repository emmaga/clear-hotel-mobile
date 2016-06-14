define(['framework7','config', 'xhr','appFunc','router','text!movie-list/movie-list-detail.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){
        var $$ = Dom7;

        var movieListDetail = {
            bindEvents: function() {
            },
            loadData: function(data, isFirst, moduleId) {
                var renderData = data.movie;
                var output = appFunc.renderTpl(template,renderData);
                
                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="movie-list-detail_'+moduleId+'" class="page">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-movie-list-detail_'+moduleId).html(output);
                    $$("div[data-page='movie-list-detail']").attr('data-page', 'movie-list-detail_'+moduleId);
                }
            }
        }

        var init = function (moduleId, movieId, isFirst){

            $$('#page-movie-list-detail').attr('id', 'page-movie-list-detail_'+moduleId);

            var data = {
              project_name: config.getAppId(),
              action: "GET",
              token: config.getClearToken(),
              ModuleInstanceID: moduleId
            }

            xhr.ajax({
                'url': config.getJSONUrl('movie_lists'),
                dataType: 'json',
                data: data,
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                      var url = data.redirect_url;
                      // var moduleId = data.ModuleInstanceID;
                      loadMovieDetail(url, moduleId);
                    }
                    else {
                      errorFunc.error(rescode);
                    }
                }
            })

            function loadMovieDetail(url) {
                var data = {
                  project_name: config.getAppId(),
                  action: "GETDetail",
                  token: config.getClearToken(),
                  movieId: movieId
                }

                xhr.ajax({
                    'url': config.getFullJSONUrl(url, 'http://m.cleartv.cn/wx/api/movie_list_detail_private.json'),
                    dataType: 'json',
                    data: data,
                    'success': function(data){
                        var rescode = data.rescode;
                        if (rescode == 200) {
                          movieListDetail.loadData(data, isFirst, moduleId)
                        }
                        else {
                          errorFunc.error(rescode);
                        }
                    }
                })
            }
        };
        return {
            init: init
        };
    });