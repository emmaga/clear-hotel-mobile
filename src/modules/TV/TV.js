define(['framework7','config', 'xhr','appFunc','router','text!TV/TV.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){

        var $$ = Dom7;

        var TV = {
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
                        content: '<div data-page="TV_'+moduleId+'" class="page">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-TV_'+moduleId).html(output);
                    $$("div[data-page='TV']").attr('data-page', 'TV_'+moduleId);
                    TV.bindEvents();
                }
            }
        }

        var init = function (moduleId, isFirst){

            $$('#page-TV').attr('id', 'page-TV_'+moduleId);

            var data = {
              project_name: config.getAppId(),
              action: "GET",
              token: config.getClearToken(),
              ModuleInstanceID: moduleId
            }

            xhr.ajax({
                'url': config.getJSONUrl('tv-lists'),
                data: data,
                dataType: 'json',
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                        TV.loadData(moduleId, data, isFirst);
                    }
                    else {
                      errorFunc.error(rescode);
                    }
                }
            })
        };
        return {
            init: init
        };
    });