define(['framework7','config', 'xhr','appFunc','router','text!intro/intro-p1.tpl.html','introP2Module'],
    function(framework7,config, xhr,appFunc,router,template,introP2Module){

        var $$ = Dom7;

        var introP1 = {
            bindEvents: function(menuId,serviceId) {
                $$(document).on('click', '.introMenu', function (e) {
                    var introId = $$(this).attr("data-introId");
                    window.location.hash = 'page=intro-p2&menuId='+menuId+'&serviceId='+serviceId+'&introId='+introId;
                    introP2Module.init(menuId,serviceId,introId);
                });
            },
            loadData: function(menuId,serviceId,data,animatePages) {
                var animatePages = (animatePages===undefined)?true:animatePages;
                var renderData = data.introP1;
                var output = appFunc.renderTpl(template,renderData);
                window.viewMain.router.load({
                    content: output,
                    pushState: false,
                    animatePages: animatePages
                })
                introP1.bindEvents(menuId,serviceId);
            }
        }

        var init = function (menuId,serviceId,animatePages){
            xhr.ajax({
                'url': config.getJSONUrl('intro-p1'),
                dataType: 'json',
                'success': function(data){introP1.loadData(menuId,serviceId,data,animatePages)}
            })
        };
        return {
            init: init
        };
    });