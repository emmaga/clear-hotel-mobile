define(['framework7','config', 'xhr','appFunc','router','text!hotel-intro-list/hotel-intro-list.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){

        var $$ = Dom7;

        var hotelIntroList = {
            bindEvents: function() {

            },
            loadData: function(moduleId, data, isFirst) {
                var renderData = data.intro;
                var output = appFunc.renderTpl(template, renderData);

                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="hotel-intro-list_'+moduleId+'" class="page">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-hotel-intro-list_'+moduleId).html(output);
                    $$("div[data-page='hotel-intro-list']").attr('data-page', 'hotel-intro-list_'+moduleId);
                }
            }
        }

        var init = function (moduleId, isFirst){

            $$('#page-hotel-intro-list').attr('id', 'page-hotel-intro-list_'+moduleId);

            var data = {
              project_name: config.getAppId(),
              action: "GET",
              token: config.getClearToken(),
              ModuleInstanceID: moduleId
            }

            xhr.ajax({
                'url': config.getJSONUrl('hotel_intro_lists'),
                dataType: 'json',
                data: data,
                'success': function(data){
                    var rescode = data.rescode;
                    if (rescode == 200) {
                      hotelIntroList.loadData(moduleId, data, isFirst);
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
    }
);