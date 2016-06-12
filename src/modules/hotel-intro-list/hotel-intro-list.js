define(['framework7','config', 'xhr','appFunc','router','text!hotel-intro-list/hotel-intro-list.tpl.html'],
    function(framework7,config, xhr,appFunc,router,template){

        var $$ = Dom7;

        var hotelIntroList = {
            bindEvents: function(menuId,serviceId) {

            },
            loadData: function(moduleId, data, isFirst) {
                var renderData = data.intro;
                var output = appFunc.renderTpl(template, renderData);

                if(isFirst) {
                    window.viewMain.router.load({
                        content: '<div data-page="hotel-intro-list" class="page">' + output + '</div>',
                        pushState: false,
                        animatePages: false
                    })
                }
                else {
                    $$('#page-hotel-intro-list').html(output);
                }
            }
        }

        var init = function (moduleId, isFirst){

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