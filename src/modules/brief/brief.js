define(['framework7','config', 'xhr','appFunc','text!brief/brief.tpl.html'],
    function(framework7,config, xhr,appFunc,template){
        var $$ = Dom7;

        var brief = {
            bindEvents: function() {

            },
            loadData: function(moduleId,data) {
                var renderData = data.brief;
                renderData.moduleId = moduleId;
                var output = appFunc.renderTpl(template,renderData);
                $$('#tab_'+'brief'+'_'+moduleId).html(output);
                //初始化swiper
                var mySwiper = window.hotelApp.swiper('#brief-swiper_'+moduleId, {
                    preloadImages: true,
                    lazyLoading: false,
                    pagination:'.swiper-pagination'
                });
                brief.bindEvents();
            }
        }

        var init = function (moduleId){

            var data = {
              project_name: config.getAppId(),
              action: "GET",
              token: config.getClearToken(),
              ModuleInstanceID: moduleId
            }

            xhr.ajax({
                'url': config.getJSONUrl('briefs'),
                dataType: 'json',
                data: data,
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                      brief.loadData(moduleId,data);
                    }
                    else {
                      errorFunc.error(rescode);
                    }
                }
            });
        };
        return {
            init: init
        };
    });
