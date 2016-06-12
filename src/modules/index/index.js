define(['framework7', 'config', 'xhr', 'errorFunc', 'router', 'appFunc', 'briefModule', 'roomModule', 'serviceModule','introP1Module', 'introP2Module', 'movieP1Module','movieP2Module','TVModule','text!index/index.tpl.html'],
  function(framework7, config, xhr, errorFunc, router, appFunc, briefModule, roomModule, serviceModule,introP1Module, introP2Module,movieP1Module, movieP2Module,TVModule,template){

    var $$ = Dom7;

    var index = {
      init: function() {
        var data = {
          project_name: config.getAppId(),
          action: "GET",
          token: config.getClearToken()
        }
        
        xhr.ajax({
          'url': config.getJSONUrl('mainmenus'),
          dataType: 'json',
          data: data,
          method: 'POST',
          'success': function(data){
            var rescode = data.rescode;
            if (rescode == 200) {
              index.loadData(data);
            }
            else {
              errorFunc.error(rescode);
            }
            
          }
        })
      },
      activeTab: function (type, moduleId) {

        // active menu
        var selector = "a[href='#tab_"+type+"_"+moduleId+"']";
        $$('#index-toolbar a.active').removeClass('active');
        $$(selector).addClass('active');

        // active tab
        selector = $$('#tab_'+type+'_'+moduleId);
        $$('#index-tabs .active').removeClass('active');
        selector.addClass('active');
      },
      loadPage: function (type, moduleId) {
          
          // add active class
          index.activeTab(type, moduleId);
          
          switch (type) {
              case 'brief':
                  briefModule.init(moduleId);
                  break;
              case 'service':
                  serviceModule.init(moduleId);
                  break;
              case 'room':
                  roomModule.init(moduleId);
                  break;
          }
      },
      loadData: function(data) {

        // 修改title
        document.title = data.data.appTitle;

        // 加载tabs
        var renderData = data.data;

        var output = appFunc.renderTpl(template,renderData);
        $$('#index-views').html(output);

        // Add views
        window.viewMain = hotelApp.addView('.view-main', {domCache: true});

        // 导航按钮切换
        var mm = renderData.mainMenu;
        for(var i = 0; i < mm.length; i++) {
          var selector = "a[href='#tab_"+mm[i].ModuleName+"_"+mm[i].ContentModuleInstanceID+"']";
          $$(document).on('click', selector, function (e) {
              var type = $$("a[href='"+this.hash+"']").data('type');
              var moduleId = $$("a[href='"+this.hash+"']").data('moduleId');
              index.loadPage(type, moduleId);
          });
        }

        // init app 
        var h = appFunc.getHashParameters();
        var page = h.page ? h.page : '';
        if (page === '') {
          if(mm.length > 0) {
            index.loadPage(mm[0].ModuleName, mm[0].ContentModuleInstanceID);
          }
        }else {
          // 根据hash跳转到指定页面
          switch(page) {
            case 'intro-p1':
              var moduleId = h.moduleId;
              var serviceId = h.serviceId;
              introP1Module.init(moduleId, serviceId, true);
              break;
            case 'intro-p2':
              var moduleId = h.moduleId;
              var serviceId = h.serviceId;
              var introId = h.introId;
              introP2Module.init(moduleId, serviceId, introId, true);
              break;
            case 'movie-p1':
              var moduleId = h.moduleId;
              var serviceId = h.serviceId;
              movieP1Module.init(moduleId, serviceId, true);
              break;
            case 'movie-p2':
              var moduleId = h.moduleId;
              var serviceId = h.serviceId;
              var movieId = h.movieId;
              movieP2Module.init(moduleId, serviceId, movieId, true);
              break;
            case 'TV':
              var moduleId = h.moduleId;
              var serviceId = h.serviceId;
              TVModule.init(moduleId, serviceId, true);
              break;
            case 'index':
              var type = h.type;
              var moduleId = h.moduleId;
              index.loadPage(type, moduleId);
              break;
          }
        }
        
      }

    };

    return {
        init: index.init
    };
});