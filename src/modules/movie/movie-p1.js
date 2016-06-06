define(['framework7','config', 'xhr','appFunc','router','text!movie/movie-p1.tpl.html','movieP2Module'],
    function(framework7,config, xhr,appFunc,router,template,movieP2Module){

        var $$ = Dom7;

        var movieP1 = {
            
            bindEvents: function(menuId) {
                $$(document).on('click', '.movie-list', function (e) {
                    var movieId = $$(this).attr("data-movieId");
                    //console.log(movieId);
                    //获取到的movieId用于之后传参
                    //movieP2Module.init(menuId);
                });
            },
            loadData: function(menuId,serviceId,data,isFirst) {
                var renderData = data.movieP1;
                var output = appFunc.renderTpl(template,renderData);
                //window.viewMain.router.load({
                //    content: output
                //});
                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="movie-p1" class="page"><div class="page-content infinite-scroll">' + output + '</div></div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-movie-p1').html(output);
                    movieP1.infiniteData(renderData.movies);
                    //movieP1.bindEvents(menuId);
                }

            },
            infiniteData:function (infData){
                //无限滚动
                // 加载flag
                var loading = false;
                var html = '';
                for (var i = 0; i < 10; i++) {
                    html += "<a href='movie-p2.html?movieId="+infData[i].movieId+"' class='col-100'><div class='movie-list' data-movieId='"+infData[i].movieId+"'><img class='lazy movie-p1-img' src='"+infData[i].imgUrl+"'><h3 class='movie-p1-h3'>"+infData[i].name+"</h3><p class='movie-p1-p1'>"+infData[i].intro1+"</p><p class='movie-p1-p2'>"+infData[i].intro2+"</p> </div></a>";
                console.log()
                }
                // 添加新条目
                $$('.row').append(html);

                // 上次加载的序号
                var lastIndex = $$('.movie-list').length;
                //alert(lastIndex);
                // 最多可加载的条目
                var maxItems = 40;
                // 每次加载添加多少条目
                var itemsPerLoad = 10;

                // 注册'infinite'事件处理函数
                $$(document).on('infinite','.infinite-scroll', function () {
                    // 如果正在加载，则退出
                    if (loading) return;

                    // 设置flag
                    loading = true;

                    // 模拟1s的加载过程
                    setTimeout(function () {
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
                        for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
                            html += "<a href='movie-p2.html?movieId="+infData[i].movieId+"' class='col-100'><div class='movie-list' data-movieId='"+infData[i].movieId+"'><img class='lazy movie-p1-img' src='"+infData[i].imgUrl+"'><h3 class='movie-p1-h3'>"+infData[i].name+"</h3><p class='movie-p1-p1'>"+infData[i].intro1+"</p><p class='movie-p1-p2'>"+infData[i].intro2+"</p> </div></a>";
                        }

                        // 添加新条目
                        $$('.row').append(html);

                        // 更新最后加载的序号
                        lastIndex = $$('.movie-list').length;
                    }, 1000);
                });
            }
        }

        var init = function (menuId,serviceId,isFirst){
            xhr.ajax({
                'url': config.getJSONUrl('movie-p1'),
                dataType: 'json',
                'success': function(data){movieP1.loadData(menuId,serviceId,data,isFirst)}
            })
        };
        return {
            init: init
        };
    });