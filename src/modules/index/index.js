define(['framework7', 'config', 'xhr', 'router', 'appFunc', 'text!index/index.tpl.html'], 
  function(framework7, config, xhr, router, appFunc, template){

    var $$ = Dom7;

    var index = {
      init: function() {
        xhr.ajax({
          'url': config.getJSONUrl('mainMenu'),
          dataType: 'json',
          'success': function(data){index.loadData(data)}
        })
      },
      loadData: function(data) {
        // 加载tabs
        var renderData = data.data;

        var output = appFunc.renderTpl(template,renderData);
        $$('#index-views').html(output);

        // Add views
        window.viewMain = hotelApp.addView('.view-main');

        // 导航按钮切换
        var mm = renderData.mainMenu;
        for(var i = 0; i < mm.length; i++) {
          var selector = "a[href='#tab"+mm[i].type+"_"+mm[i].menuId+"']";
          $$(document).on('click', selector, function (e) {
              var type = $$("a[href='"+this.hash+"']").data('type');
              var menuId = $$("a[href='"+this.hash+"']").data('menuId');
              router.loadPage(type, menuId);
          });
        }

        // init app 
        if(mm.length > 0) {
          router.loadPage(mm[0].type, mm[0].menuId);
        }

        // init router
        router.init();
      }

    };

    return {
        init: index.init
    };
});