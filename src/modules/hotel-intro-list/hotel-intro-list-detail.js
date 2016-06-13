define(['framework7','config', 'xhr','appFunc','router','text!hotel-intro-list/hotel-intro-list-detail.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){
        var $$ = Dom7;

        var hotelIntroListDetail = {
            bindEvents: function() {
                
            },
            loadData: function(introListDetailID, data, isFirst) {
                var renderData = data.introDetail;
                var output = appFunc.renderTpl(template,renderData);

                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="hotel-intro-list-detail_'+introListDetailID+'" class="page intro-p2">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-hotel-intro-list-detail_'+introListDetailID).html(output);
                    $$("div[data-page='page-hotel-intro-list-detail']").attr('data-page', 'page-hotel-intro-list-detail_'+introListDetailID);

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

        var init = function (introListDetailID ,isFirst){
            
            $$('#page-hotel-intro-list-detail').attr('id', 'page-hotel-intro-list-detail_'+introListDetailID);

            var data = {
              project_name: config.getAppId(),
              action: "GET",
              token: config.getClearToken(),
              IntroListDetailID: introListDetailID
            }
            
            xhr.ajax({
                'url': config.getJSONUrl('hotel_intro_list-detail'),
                dataType: 'json',
                data: data,
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                      hotelIntroListDetail.loadData(introListDetailID, data, isFirst);
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