define(['framework7','config', 'xhr','appFunc','text!brief/brief.tpl.html'],
    function(framework7,config, xhr,appFunc,template){
        var $$ = Dom7;

        var brief = {
            bindEvents: function() {

            },
            loadData: function(menuId,data) {
                var renderData = data.brief;
                var output = appFunc.renderTpl(template,renderData);
                $$('#tab_'+'brief'+'_'+menuId).html(output);
                //初始化swiper
                var mySwiper = window.hotelApp.swiper('#brief-swiper', {
                    preloadImages: true,
                    lazyLoading: false,
                    pagination:'.swiper-pagination'
                });
                brief.bindEvents();
            }
        }

        var init = function (menuId){
            xhr.ajax({
                'url': config.getJSONUrl('brief'),
                dataType: 'json',
                'success': function(data){brief.loadData(menuId,data)}
            });
        };
        return {
            init: init
        };
    });
