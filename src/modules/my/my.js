define(['framework7', 'config', 'xhr', 'appFunc','errorFunc','orderDetail', 'text!my/my.tpl.html'],
    function(framework7, config, xhr, appFunc, errorFunc,orderDetail, template){

        var $$ = Dom7;

        var my = {
            bindEvents: function(moduleId) {
                $$('.order-detail').on('click', function(){
                    var self = $$(this);
                    var orderId = self.prev().data('orderId');
                    orderDetail.init(moduleId,orderId);
                });
            },
            loadData: function(moduleId,data) {
                var renderData = data.data;
                var output = appFunc.renderTpl(template,renderData);
                $$('#tab_'+'my'+'_'+moduleId).html(output);
                my.bindEvents(moduleId)
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