define(['framework7','config', 'xhr','appFunc','router','text!hotel-intro-detail/hotel-intro-detail.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){
        var $$ = Dom7;

        var hotelIntroDetail = {
            bindEvents: function() {
                
            },
            loadData: function(moduleId, data, isFirst) {
                var renderData = data.introDetail;
                var output = appFunc.renderTpl(template,renderData);

                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="hotel-intro-detail" class="page intro-p2">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#hotel-intro-detail').html(output);

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
                        $$('#introP2-toolbar').css('display','block');
                    }else{
                        return;
                    }
                }

            }
        }

        var init = function (moduleId ,isFirst){

            var data = {
              project_name: config.getAppId(),
              action: "GET",
              token: config.getClearToken(),
              ModuleInstanceID: moduleId
            }
            
            xhr.ajax({
                'url': config.getJSONUrl('hotel_intro_details'),
                dataType: 'json',
                data: data,
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                      hotelIntroDetail.loadData(moduleId, data, isFirst);
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