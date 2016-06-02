define(['framework7','config', 'xhr','appFunc','router','text!TV/TV.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){

        var $$ = Dom7;

        var TV = {
            bindEvents: function(menuId) {
                $$(document).on('click', '.TV-item', function (e) {
                    var TVId = $$(this).attr("data-TVId");
                    console.log(TVId);
                });
            },
            loadData: function(menuId,data) {
                var renderData = data.TV;
                var output = appFunc.renderTpl(template,renderData);
                window.viewMain.router.load({
                    content: output
                })
                TV.bindEvents(menuId);
            }
        }

        var init = function (menuId){
            xhr.ajax({
                'url': config.getJSONUrl('TV'),
                dataType: 'json',
                'success': function(data){TV.loadData(menuId,data)}
            })
        };
        return {
            init: init
        };
    });