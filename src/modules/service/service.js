define(['framework7', 'config', 'xhr','appFunc','text!service/service.tpl.html','introP1Module','introP2Module','movieP1Module','TVModule'],
    function(framework7,config, xhr,appFunc,template,introP1Module,introP2Module,movieP1Module,TVModule){

        var $$ = Dom7;

        var service = {
            bindEvents: function(menuId) {
                $$(document).on('click', '#menu-test', function (e) {
                    var serviceId = $$(this).attr("data-serviceId");
                    var type = $$(this).attr("data-serviceType");
                    if(type=="intro") {
                        window.location.hash = 'page=intro-p1&menuId='+menuId+'&serviceId='+serviceId;
                        introP1Module.init(menuId, serviceId);
                    }else if(type=="introP2") {
                        window.location.hash = 'page=intro-p2&menuId='+menuId+'&serviceId='+serviceId;
                        introP2Module.init(menuId, serviceId);
                    }else if(type=="movies"){
                        window.location.hash = 'page=movie-p1&menuId='+menuId;
                        movieP1Module.init(menuId)
                    }else{
                        window.location.hash = 'page=TV&menuId='+menuId;
                        TVModule.init(menuId)
                    }
                });
            },
            loadData: function(menuId,data) {
                var renderData = data.serviceP1;
                var output = appFunc.renderTpl(template,renderData);
                $$('#tab_'+'service'+'_'+menuId).html(output);
                //serviceP1.menuId = menuId;   获取不到data，将menuId作为参数传递
                service.bindEvents(menuId);
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