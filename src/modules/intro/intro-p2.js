define(['framework7','config', 'xhr','appFunc','router','text!intro/intro-p2.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){
        var $$ = Dom7;

        var introP2 = {
            bindEvents: function(menuId) {
                //$$(document).on('click', '.introMenu', function (e) {
                    //var introId = $$(this).attr("data-introId");
                //});
            },
            loadData: function(menuId,data) {
                var renderData = data.introP2;
                var output = appFunc.renderTpl(template,renderData);
                window.viewMain.router.load({
                    content: output
                });
                //初始化swiper
                var mySwiper = window.hotelApp.swiper('#intro-swiper', {
                    preloadImages: true,
                    lazyLoading: false,
                    pagination:'.swiper-pagination'
                });
                //根据开关显示/隐藏预定按钮
                var hasToolbar = renderData.switch;
                if(hasToolbar){
                    $$('#introP2-toolbar').removeClass('toolbar-hidden');
                    $$('#introP2-toolbar').css('display','block')
                }else{
                    return
                }
                introP2.bindEvents(menuId);
            }
        }

        var init = function (menuId,introId){
            xhr.ajax({
                'url': config.getJSONUrl('intro-p2'),
                dataType: 'json',
                'success': function(data){introP2.loadData(menuId,data)}
            })
        };
        return {
            init: init
        };
    });