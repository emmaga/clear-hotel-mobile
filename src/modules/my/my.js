define(['framework7', 'config', 'i18nText', 'xhr', 'appFunc','errorFunc', 'text!my/my.tpl.html'],
    function(framework7, config, i18nText, xhr, appFunc, errorFunc, template){

        var $$ = Dom7;

        var my = {
            bindEvents: function() {
                
            },
            loadData: function(moduleId,data) {
                var renderData = data.data;
                renderData.hasOrder = renderData.orders.length === 0 ? false : true;
                renderData.stateText1 = i18nText.order.stateText1;
                renderData.stateText2 = i18nText.order.stateText2;
                renderData.stateText3 = i18nText.order.stateText3;
                renderData.total_price = i18nText.order.total_price;
                renderData.check_in_check_out = i18nText.order.check_in_check_out;
                renderData.order_id = i18nText.order.order_id;
                var output = appFunc.renderTpl(template,renderData);
                $$('#tab_'+'my'+'_'+moduleId).html(output);
            }
        }

        var init = function (moduleId){

            var data = {
              project_name: config.getAppId(),
              action: "GETUserList",
              token: config.getClearToken(),
              OpenID: config.getOpenId()
            }

            xhr.ajax({
                'url': config.getJSONUrl('room_orders'),
                dataType: 'json',
                data: data,
                method: 'POST',
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                        my.loadData(moduleId, data);
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