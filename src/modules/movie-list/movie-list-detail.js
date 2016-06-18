define(['framework7', 'i18nText', 'config', 'wxJDK', 'xhr', 'appFunc', 'router', 'text!movie-list/movie-list-detail.tpl.html'],
    function(framework7, i18nText, config, wxJDK, xhr, appFunc, router, template){
        var $$ = Dom7,
            isUserAgreeUse2g3g = false,
            checkNetWorkInterval,
            Media;

        var movieListDetail = {
            bindEvents: function(movieId) {
                Media = document.getElementById('movie-list-detail-'+movieId);

                // play()和autoplay开始播放时触发
                Media.addEventListener('play', function() {
                    movieListDetail.checkNetWork();
                });
            },
            startCheckNetworkInterval: function() {
                if(checkNetWorkInterval) {
                    clearInterval(checkNetWorkInterval);
                }
                checkNetWorkInterval = setInterval(function() {
                    if(window.pageName == 'movie-list-detail') {
                        movieListDetail.checkNetWork();
                    }
                    else {
                       clearInterval(checkNetWorkInterval); 
                    }
                },1000);
            },
            stopCheckNetworkInterval: function() {
                if(checkNetWorkInterval) {
                    clearInterval(checkNetWorkInterval);
                }
            },
            checkNetWork: function() {

                movieListDetail.startCheckNetworkInterval();

                //判断是否联网
                if(!navigator.onLine) {
                    Media.pause();
                    var message = i18nText.error.no_network;
                    movieListDetail.stopCheckNetworkInterval();

                    if(hotelApp) {
                        hotelApp.alert(message); 
                    }

                }
                // 判断isUserAgreeUse2g3g
                else if(!isUserAgreeUse2g3g) {
                    // 判断是否是wifi环境
                    wxJDK.isNetworkTypeNotWifi(function() {
                        Media.pause();
                        var message = i18nText.confirm.network_state;
                        movieListDetail.stopCheckNetworkInterval();

                        if(confirm(message)) {
                            isUserAgreeUse2g3g = true;
                            Media.play();
                        }
                    }); 
                }
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
                movieListDetail.bindEvents(renderData.movieId);
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
                method: 'POST',
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                      var url = data.redirect_url;
                      // var moduleId = data.ModuleInstanceID;
                      loadMovieDetail(url);
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
                  movieId: Number(movieId)
                }

                xhr.ajax({
                    'url': config.getFullJSONUrl(url, 'http://localhost/clear-hotel-mobile/src/api/movie_list_detail_private.json'),
                    dataType: 'json',
                    data: data,
                    method: 'POST',
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