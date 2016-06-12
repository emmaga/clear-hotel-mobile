define(['framework7', 'config', 'xhr', 'appFunc', 'text!service/service.tpl.html'],
    function(framework7, config, xhr, appFunc, template){

        var $$ = Dom7;

        var service = {
            bindEvents: function() {
                
            },
            loadData: function(moduleId,data) {
                var renderData = data.services;
                renderData.appId = config.getAppId();
                var output = appFunc.renderTpl(template,renderData);
                $$('#tab_'+'service'+'_'+moduleId).html(output);
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
                'url': config.getJSONUrl('services'),
                data: data,
                dataType: 'json',
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                      service.loadData(moduleId,data)
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