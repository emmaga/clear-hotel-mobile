define(['framework7','config', 'xhr','appFunc','router','text!intro/intro-p1.tpl.html','introP2Module'],
    function(framework7,config, xhr,appFunc,router,template,introP2Module){

        var $$ = Dom7;

        var introP1 = {
            bindEvents: function(menuId) {
                $$(document).on('click', '.introMenu', function (e) {
                    var introId = $$(this).attr("data-introId");
                    introP2Module.init(menuId,introId);
                });
            },
            loadData: function(menuId,data,ignoreHistory) {
                var ignoreHistory = ignoreHistory?false:true;
                var renderData = data.introP1;
                var output = appFunc.renderTpl(template,renderData);
                window.viewMain.router.load({
                    content: output,
                    pushState: ignoreHistory,
                    animatePages: ignoreHistory
                })
                introP1.bindEvents(menuId);
            }
        }

        var init = function (menuId,serviceId,ignoreHistory){
            xhr.ajax({
                'url': config.getJSONUrl('intro-p1'),
                dataType: 'json',
                'success': function(data){introP1.loadData(menuId,data,ignoreHistory)}
            })
        };
        return {
            init: init
        };
    });