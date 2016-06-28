define(['framework7','config', 'xhr','appFunc','router','text!hotel-intro-detail/hotel-intro-detail.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){
        var $$ = Dom7;

        var hotelIntroDetail = {
            bindEvents: function() {
                
            },
            loadData: function(moduleId, data, isFirst) {
                var renderData = data.introDetail;
                renderData.moduleId = moduleId;
                var output = appFunc.renderTpl(template,renderData);

                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="hotel-intro-detail_'+moduleId+'" class="page intro-p2">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-hotel-intro-detail_'+moduleId).html(output);
                    $$("div[data-page='hotel-intro-detail']").attr('data-page', 'hotel-intro-detail_'+moduleId);

                    //初始化swiper
                    var mySwiper = window.hotelApp.swiper('#hotel-intro-detail-swiper_'+moduleId, {
                        preloadImages: true,
                        lazyLoading: false,
                        autoplay: 4000,
                        pagination:'.swiper-pagination'
                    });
                }

                // hack 显示底部toolbar
                if( $$('#hotel-intro-detail-toolball_'+moduleId).length > 0 ) {
                    $$('#hotel-intro-detail-toolball_'+moduleId).removeClass('toolbar-hidden');
                    $$('#hotel-intro-detail-toolball_'+moduleId).show();
                }

            }
        }

        var init = function (moduleId ,isFirst){

            $$('#page-hotel-intro-detail').attr('id', 'page-hotel-intro-detail_'+moduleId);

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
                method: 'POST',
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