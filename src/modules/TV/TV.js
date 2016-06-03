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
            loadData: function(menuId,serviceId,data,isFirst) {
                var renderData = data.TV;
                var output = appFunc.renderTpl(template,renderData);
                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="TV" class="page">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-TV').html(output);
                    TV.bindEvents();
                }
            }
        }

        var init = function (menuId,serviceId,isFirst){
            xhr.ajax({
                'url': config.getJSONUrl('TV'),
                dataType: 'json',
                'success': function(data){TV.loadData(menuId,serviceId,data,isFirst)}
            })
        };
        return {
            init: init
        };
    });