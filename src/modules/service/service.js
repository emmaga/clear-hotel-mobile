define(['framework7', 'config', 'xhr','appFunc','text!service/service.tpl.html','introP1Module','introP2Module','movieP1Module','TVModule'],
    function(framework7,config, xhr,appFunc,template,introP1Module,introP2Module,movieP1Module,TVModule){

        var $$ = Dom7;

        var service = {
            bindEvents: function() {
                
            },
            loadData: function(menuId,data) {
                var renderData = data.serviceP1;
                renderData.appId = config.getAppId();
                var output = appFunc.renderTpl(template,renderData);
                $$('#tab_'+'service'+'_'+menuId).html(output);
            }
        }

        var init = function (menuId){
            xhr.ajax({
                'url': config.getJSONUrl('service'),
                dataType: 'json',
                'success': function(data){service.loadData(menuId,data)}
            })

        };
        return {
            init: init
        };

});