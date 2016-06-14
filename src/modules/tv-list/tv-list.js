define(['framework7','config', 'xhr','appFunc','router','text!tv-list/tv-list.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){

        var $$ = Dom7;

        var tvList = {
            bindEvents: function() {
                $$(document).on('click', '.TV-item', function (e) {
                    var TVId = $$(this).attr("data-TVId");
                    //console.log(TVId);
                    var video = $$(this).prev();
                    video[0].play();
                });
            },
            loadData: function(moduleId, data, isFirst) {
                var renderData = data.TV;
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
                    tvList.bindEvents();
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