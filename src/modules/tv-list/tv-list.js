define(['framework7','config', 'wxJDK', 'i18nText', 'xhr','appFunc','router','text!tv-list/tv-list.tpl.html'],
    function(framework7,config, wxJDK, i18nText, xhr,appFunc,router,template){

        var $$ = Dom7,
            isUserAgreeUse2g3g,
            checkNetWorkInterval,
            Media,
            loadingInterval,
            currMediaUrl,
            mediaSrcs = new Array();

        var tvList = {
            bindEvents: function(moduleId) {
                $$('#tv-list_'+moduleId).off('click').on('click', '.TV-item', function (e) {
                    var TVId = $$(this).attr("data-TVId");
                    //console.log(TVId);
                    var video = $$(this).prev();
                    Media = video[0];
                    var number = video.attr("data-number");
                    Media.src = mediaSrcs[number];
                    tvList.startCheckNetworkInterval();
                    tvList.checkNetWorkFirst();

                });
            },
            startCheckNetworkInterval: function() {
                if(checkNetWorkInterval) {
                    clearInterval(checkNetWorkInterval);
                }
                checkNetWorkInterval = setInterval(function() {
                    if(window.clearcrane.pageName === 'tv-list') {
                        tvList.checkNetWork();
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
            checkNetWorkFirst: function() {
                //判断是否联网
                if(!navigator.onLine) {
                    Media.pause();
                    var message = i18nText.error.no_network;
                    tvList.stopCheckNetworkInterval();

                    if(hotelApp) {
                        hotelApp.alert('', message); 
                    }

                }
                else {
                    // 判断是否是wifi环境
                    wxJDK.isNetworkTypeNotWifi(
                        function() {
                            
                            // 用户未确认非wifi时启用流量观看时
                            if(!isUserAgreeUse2g3g) {
                                currMediaUrl = Media.src;

                                // stop Media 流量保护
                                Media.pause();
                                Media.src = "";

                                var message = i18nText.confirm.network_state;
                                tvList.stopCheckNetworkInterval();

                                if(confirm(message)) {
                                    isUserAgreeUse2g3g = true;
                                    Media.src = currMediaUrl;
                                    Media.play();
                                }else{
                                    Media.src = currMediaUrl;
                                }
                            }
                            else {
                                play();
                            }    

                        },
                        function() {
                            play();
                        }
                    ); 
                }

                function play() {
                    if(Media.paused) {
                        Media.play();
                        $$('#tv-list-loading').addClass('full-view-loading-show');
                        if(loadingInterval){
                            clearInterval(loadingInterval);
                        }
                        loadingInterval = setInterval(function() {
                            if(window.clearcrane.pageName !== 'tv-list') {
                                clearInterval(loadingInterval);
                            }
                            //准备状态 Media.readyState; //1:HAVE_NOTHING 2:HAVE_METADATA 3.HAVE_CURRENT_DATA 4.HAVE_FUTURE_DATA 5.HAVE_ENOUGH_DATA
                            else if(Media.readyState > 2) {
                                clearInterval(loadingInterval);
                                $$('#tv-list-loading').removeClass('full-view-loading-show');
                            }
                        },1000)
                    }
                }
            },
            checkNetWork: function() {
                
                // 仅在视频播放时检查
                if(Media.paused) {
                    return;
                }

                //判断是否联网
                if(!navigator.onLine) {
                    Media.pause();
                    var message = i18nText.error.no_network;
                    tvList.stopCheckNetworkInterval();

                    if(hotelApp) {
                        hotelApp.alert('', message); 
                    }

                }
                // 判断isUserAgreeUse2g3g
                else if(!isUserAgreeUse2g3g) {
                    // 判断是否是wifi环境
                    wxJDK.isNetworkTypeNotWifi(
                        function() {
                            currMediaUrl = Media.src;

                            // stop Media 流量保护
                            Media.pause();
                            Media.src = "";

                            var message = i18nText.confirm.network_state;
                            tvList.stopCheckNetworkInterval();

                            if(confirm(message)) {
                                isUserAgreeUse2g3g = true;
                                Media.src = currMediaUrl;
                                Media.play();
                            }
                            else{
                                Media.src = currMediaUrl;
                                tvList.startCheckNetworkInterval();
                            }
                        }
                    ); 
                }
            },
            loadData: function(moduleId, data, isFirst) {
                var renderData = data.TV;
                //缓存live url
                for(var i = 0; i < renderData.TVList.length; i++) {
                    renderData.TVList[i].number = i;
                    mediaSrcs[i] = renderData.TVList[i].url;
                }

                renderData.moduleId = moduleId;
                renderData.preparing = i18nText.global.preparing;
                var output = appFunc.renderTpl(template,renderData);
                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="tv-list_'+moduleId+'" class="page">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-tv-list_'+moduleId).html(output);
                    $$("div[data-page='tv-list']").attr('data-page', 'tv-list_'+moduleId);
                    tvList.bindEvents(moduleId);
                }

            }
        }

        var init = function (moduleId, isFirst){
            isUserAgreeUse2g3g = false;
            $$('#page-tv-list').attr('id', 'page-tv-list_'+moduleId);

            var data = {
              project_name: config.getAppId(),
              action: "GET",
              token: config.getClearToken(),
              ModuleInstanceID: moduleId
            }

            xhr.ajax({
                'url': config.getJSONUrl('tv_lists'),
                dataType: 'json',
                data: data,
                method: 'POST',
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                        var url = data.redirect_url;
                        loadTVLists(url);
                    }
                    else {
                      errorFunc.error(rescode);
                    }
                }
            })

            function loadTVLists(url) {
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
                            tvList.loadData(moduleId, data, isFirst);
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