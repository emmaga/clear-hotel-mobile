define(['framework7','config', 'xhr','appFunc','router','text!intro/intro-p1.tpl.html','introP2Module'],
    function(framework7,config, xhr,appFunc,router,template,introP2Module){

        var $$ = Dom7;

        var introP1 = {
            bindEvents: function(menuId,serviceId) {
                $$(document).on('click', '.introMenu', function (e) {
                    var introId = $$(this).attr("data-introId");
                    // window.location.hash = 'page=intro-p2&menuId='+menuId+'&serviceId='+serviceId+'&introId='+introId;
                });
            },
            loadData: function(menuId,serviceId,data,isFirst) {
                //var animatePages = (animatePages===undefined)?true:animatePages;
                var renderData = data.introP1;
                var output = appFunc.renderTpl(template,renderData);

                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="intro-p1" class="page">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-intro-p1').html(output);
                    introP1.bindEvents(menuId,serviceId);
                }
            }
        }

        var init = function (menuId,serviceId,isFirst){
            xhr.ajax({
                'url': config.getJSONUrl('intro-p1'),
                dataType: 'json',
                'success': function(data){introP1.loadData(menuId,serviceId,data,isFirst)}
            })
        };
        return {
            init: init
        };
    });