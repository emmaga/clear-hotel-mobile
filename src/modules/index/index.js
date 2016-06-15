define(['framework7', 'config', 'xhr', 'errorFunc', 'router', 'appFunc', 'briefModule', 'roomModule','roomReserveModule', 'serviceModule','hotelIntroListModule', 'hotelIntroListDetailModule', 'hotelIntroDetailModule', 'movieListModule','movieListDetailModule','tvListModule','myModule','text!index/index.tpl.html'],
  function(framework7, config, xhr, errorFunc, router, appFunc, briefModule, roomModule,roomReserveModule, serviceModule,hotelIntroListModule, hotelIntroListDetailModule, hotelIntroDetailModule, movieListModule, movieListDetailModule,tvListModule,myModule,template){

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
              case 'my':
                  myModule.init(moduleId);
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

          if (page.indexOf("hotel-intro-list-detail") >= 0) {
              page = "hotel-intro-list-detail";
          }
          else if (page.indexOf("hotel-intro-list") >= 0) {
              page = "hotel-intro-list";
          }
          else if (page.indexOf("hotel-intro-detail") >= 0) {
              page = "hotel-intro-detail";
          }
          else if (page.indexOf("movie-list-detail") >= 0) {
              page = "movie-list-detail";
          }
          else if (page.indexOf("movie-list") >= 0) {
              page = "movie-list";
          }
          else if (page.indexOf("tv-list") >= 0) {
              page = "tv-list";
          }
          else if (page.indexOf("room-reserve") >= 0) {
              page = "room-reserve";
          }

          // 根据hash跳转到指定页面
          switch(page) {
            case 'hotel-intro-list':
              var moduleId = h.moduleId;
              hotelIntroListModule.init(moduleId, true);
              break;
            case 'hotel-intro-list-detail':
              var introListDetailID = h.introListDetailID;
              hotelIntroListDetailModule.init(introListDetailID, true);
              break;
            case 'hotel-intro-detail':
              var moduleId = h.moduleId;
              hotelIntroDetailModule.init(moduleId, true);
              break;
            case 'movie-list':
              var moduleId = h.moduleId;
              movieListModule.init(moduleId, true);
              break;
            case 'movie-list-detail':
              var moduleId = h.moduleId;
              var movieId = h.movieId;
              movieListDetailModule.init(moduleId, movieId, true);
              break;
            case 'tv-list':
              var moduleId = h.moduleId;
              tvListModule.init(moduleId, true);
              break;
            case 'index':
              var type = h.type;
              var moduleId = h.moduleId;
              index.loadPage(type, moduleId);
              break;
            case 'room-reserve':
              var moduleId = h.moduleId;
                roomReserveModule.init(moduleId, true);
              break;
          }
        }
        
      }

    };

    return {
        init: index.init
    };
});