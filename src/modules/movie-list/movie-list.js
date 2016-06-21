define(['framework7','config', 'xhr', 'appFunc', 'router', 'text!movie-list/movie-list.tpl.html'],
    function(framework7,config, xhr, appFunc, router, template){

        var $$ = Dom7;

        var movieList = {

            bindEvents: function() {
            },
            loadData: function(moduleId, data, isFirst) {
                var renderData = data.movielist;
                renderData.moduleId = moduleId;
                var output = appFunc.renderTpl(template,renderData);
                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="movie-list_'+moduleId+'" class="page"><div class="page-content infinite-scroll">' + output + '</div></div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-movie-list_'+moduleId).html(output);
                    $$("div[data-page='movie-list']").attr('data-page', 'movie-list_'+moduleId);

                    movieList.infiniteData(renderData.movies, moduleId);
                }

            },
            infiniteData:function (infData, moduleId){
                //无限滚动
                // 加载flag
                var loading = false;
                var html = '';
                var pageSize = infData.length < 10 ? infData.length : 10;
                for (var i = 0; i < pageSize; i++) {
                    html += "<a href='movie-list-detail.html?moduleId="+moduleId+"&movieId="+infData[i].movieId+"' class='col-100'><div class='movie-list'><img class='lazy movie-p1-img' src='"+infData[i].imgUrl+"'><h3 class='movie-p1-h3'>"+infData[i].name+"</h3><p class='movie-p1-p1'>"+infData[i].intro1+"</p><p class='movie-p1-p2'>"+infData[i].intro2+"</p> </div></a>";
                }
                // 添加新条目
                $$('#movie-list-row_'+moduleId).append(html);

                // 上次加载的序号
                var lastIndex = $$('.movie-list').length;
                // 最多可加载的条目
                var maxItems =infData.length < 10 ? infData.length : 30;
                // 每次加载添加多少条目
                var itemsPerLoad = 10;

                // 注册'infinite'事件处理函数
                $$(document).on('infinite','.infinite-scroll', function () {
                    // 如果正在加载，则退出
                    if (loading) return;

                    // 设置flag
                    loading = true;

                    // 重置加载flag
                    loading = false;
                    if (lastIndex >= maxItems) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        window.hotelApp.detachInfiniteScroll($$('.infinite-scroll'));
                        // 删除加载提示符
                        $$('.infinite-scroll-preloader').remove();
                        return;
                    }

                    // 生成新条目的HTML
                    var html = '';
                    for (var i = lastIndex ; i < lastIndex + itemsPerLoad; i++) {
                        //console.log(infData[i].movieId)
                        html += "<a href='movie-p2.html?movieId="+infData[i].movieId+"' class='col-100'><div class='movie-list' data-movieId='"+infData[i].movieId+"'><img class='lazy movie-p1-img' src='"+infData[i].imgUrl+"'><h3 class='movie-p1-h3'>"+infData[i].name+"</h3><p class='movie-p1-p1'>"+infData[i].intro1+"</p><p class='movie-p1-p2'>"+infData[i].intro2+"</p> </div></a>";
                    }

                    // 添加新条目
                    $$('#movie-list-row_'+moduleId).append(html);

                    // 更新最后加载的序号
                    lastIndex = $$('.movie-list').length;
                });
            }
        }

        var init = function (moduleId, isFirst){

            $$('#page-movie-list').attr('id', 'page-movie-list_'+moduleId);

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
                        loadMovieList(url);
                    }
                    else {
                        errorFunc.error(rescode);
                    }
                }
            })

            function loadMovieList(url) {
                var data = {
                    project_name: config.getAppId(),
                    action: "GET",
                    token: config.getClearToken(),
                    ModuleInstanceID: moduleId
                }

                xhr.ajax({
                    'url': url,
                    dataType: 'json',
                    data: data,
                    method: 'POST',
                    'success': function(data){
                        var rescode = data.rescode;
                        if (rescode == 200) {
                            movieList.loadData(moduleId, data, isFirst);
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