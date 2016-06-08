define(['framework7', 'config', 'xhr', 'errorFunc', 'router', 'appFunc', 'briefModule', 'roomModule', 'serviceModule','introP1Module', 'introP2Module', 'movieP1Module','movieP2Module','TVModule','text!index/index.tpl.html'],
  function(framework7, config, xhr, errorFunc, router, appFunc, briefModule, roomModule, serviceModule,introP1Module, introP2Module,movieP1Module, movieP2Module,TVModule,template){

    var $$ = Dom7;

    var index = {
      init: function() {
        var data = {
          appId: config.getAppId(),
          token: config.getClearToken()
        }
        
        xhr.ajax({
          'url': config.getJSONUrl('mainMenu'),
          dataType: 'json',
          data: data,
          method: 'POST',
          'success': function(data){
            errorFunc.error(101);
            index.loadData(data);
          }
        })
      },
      activeTab: function (type, menuId) {

        // active menu
        var selector = "a[href='#tab_"+type+"_"+menuId+"']";
        $$('#index-toolbar a.active').removeClass('active');
        $$(selector).addClass('active');

        // active tab
        selector = $$('#tab_'+type+'_'+menuId);
        $$('#index-tabs .active').removeClass('active');
        selector.addClass('active');
      },
      loadPage: function (type, menuId) {
          
          // add active class
          index.activeTab(type, menuId);
          
          switch (type) {
              case 'brief':
                  briefModule.init(menuId);
                  break;
              case 'service':
                  serviceModule.init(menuId);
                  break;
              case 'room':
                  roomModule.init(menuId);
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
          var selector = "a[href='#tab_"+mm[i].type+"_"+mm[i].menuId+"']";
          $$(document).on('click', selector, function (e) {
              var type = $$("a[href='"+this.hash+"']").data('type');
              var menuId = $$("a[href='"+this.hash+"']").data('menuId');
              index.loadPage(type, menuId);
          });
        }

        // init app 
        var h = appFunc.getHashParameters();
        var page = h.page ? h.page : '';
        if (page === '') {
          if(mm.length > 0) {
            index.loadPage(mm[0].type, mm[0].menuId);
          }
        }else {
          // 根据hash跳转到指定页面
          switch(page) {
            case 'intro-p1':
              var menuId = h.menuId;
              var serviceId = h.serviceId;
              introP1Module.init(menuId, serviceId, true);
              break;
            case 'intro-p2':
              var menuId = h.menuId;
              var serviceId = h.serviceId;
              var introId = h.introId;
              introP2Module.init(menuId, serviceId, introId, true);
              break;
            case 'movie-p1':
              var menuId = h.menuId;
              var serviceId = h.serviceId;
              movieP1Module.init(menuId, serviceId, true);
              break;
            case 'movie-p2':
              var menuId = h.menuId;
              var serviceId = h.serviceId;
              var movieId = h.movieId;
              movieP2Module.init(menuId, serviceId, movieId, true);
              break;
            case 'TV':
              var menuId = h.menuId;
              var serviceId = h.serviceId;
              TVModule.init(menuId, serviceId, true);
              break;
            case 'index':
              var type = h.type;
              var menuId = h.menuId;
              index.loadPage(type, menuId);
              break;
          }
        }
        
      }

    };

    return {
        init: index.init
    };
});