define(['framework7','config', 'wxJDK', 'i18nText', 'xhr','appFunc','router','text!tv-list/tv-list.tpl.html'],
    function(framework7,config, wxJDK, i18nText, xhr,appFunc,router,template){

        var $$ = Dom7,
            isUserAgreeUse2g3g = false,
            checkNetWorkInterval,
            Media;

        var tvList = {
            bindEvents: function(moduleId) {
                $$('#tv-list_'+moduleId).off('click').on('click', '.TV-item', function (e) {
                    var TVId = $$(this).attr("data-TVId");
                    //console.log(TVId);
                    var video = $$(this).prev();
                    Media = video[0];
                    tvList.startCheckNetworkInterval();
                    tvList.checkNetWorkFirst();

                });
            },
            startCheckNetworkInterval: function() {
                if(checkNetWorkInterval) {
                    clearInterval(checkNetWorkInterval);
                }
                checkNetWorkInterval = setInterval(function() {
                    if(window.pageName === 'tv-list') {
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
                // 判断isUserAgreeUse2g3g
                else if(!isUserAgreeUse2g3g) {
                    // 判断是否是wifi环境
                    wxJDK.isNetworkTypeNotWifi(
                        function() {
                            Media.pause();
                            var message = i18nText.confirm.network_state;
                            tvList.stopCheckNetworkInterval();

                            if(confirm(message)) {
                                isUserAgreeUse2g3g = true;
                                Media.play();
                            }
                        },
                        function() {
                            if(Media.paused) {
                                Media.play();
                            }
                        }
                    ); 
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
                            Media.pause();
                            var message = i18nText.confirm.network_state;
                            tvList.stopCheckNetworkInterval();

                            if(confirm(message)) {
                                isUserAgreeUse2g3g = true;
                                Media.play();
                            }
                            else{
                                tvList.startCheckNetworkInterval();
                            }
                        }
                    ); 
                }
            },
            loadData: function(moduleId, data, isFirst) {
                var renderData = data.TV;
                renderData.moduleId = moduleId;
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