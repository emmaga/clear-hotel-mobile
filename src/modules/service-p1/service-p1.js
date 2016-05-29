define(['framework7', 'config', 'xhr','appFunc','text!service-p1/service-p1.tpl.html','serviceP2Module'],
    function(framework7,config, xhr,appFunc,template,serviceP2Module){

        var $$ = Dom7;

        var serviceP1 = {
            bindEvents: function() {
                $$(document).on('click', '#menu-test', function (e) {
                  serviceP2Module.init(serviceP1.menuId);
                });
            },
            loadData: function(menuId,data) {
                var renderData = data.serviceP1;
                var output = appFunc.renderTpl(template,renderData);
                $$('#tab'+'service-p1'+'_'+menuId).html(output);
                //serviceP1.menuId = menuId;   获取不到data，将menuId作为参数传递
                serviceP1.bindEvents();
            }
        }

        var init = function (menuId){
            xhr.ajax({
                'url': config.getJSONUrl('serviceP1'),
                dataType: 'json',
                'success': function(data){serviceP1.loadData(menuId,data)}
            })

        };
        return {
            init: init
        };

});