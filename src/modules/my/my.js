define(['framework7', 'config', 'xhr', 'appFunc','errorFunc', 'text!my/my.tpl.html'],
    function(framework7, config, xhr, appFunc, errorFunc, template){

        var $$ = Dom7;

        var my = {
            bindEvents: function() {
                
            },
            loadData: function(moduleId,data) {
                var renderData = data.data;
                var output = appFunc.renderTpl(template,renderData);
                $$('#tab_'+'my'+'_'+moduleId).html(output);
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
                'url': config.getJSONUrl('room_orders'),
                dataType: 'json',
                data: data,
                method: 'POST',
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                      my.loadData(moduleId,data);
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