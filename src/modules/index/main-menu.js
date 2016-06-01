define(['framework7', 'config', 'xhr', 'router', 'appFunc', 'indexModule', 'text!index/main-menu.tpl.html'], 
  function(framework7, config, xhr, router, appFunc, indexModule, template){

    var $$ = Dom7;

    var mainMenu = {
      init: function() {
        xhr.ajax({
          'url': config.getJSONUrl('mainMenu'),
          dataType: 'json',
          'success': function(data){mainMenu.loadData(data)}
        })
      },
      loadData: function(data) {

        // 修改title
        document.title = data.data.appTitle;

        // 加载tabs
        var renderData = data.data;

        var output = appFunc.renderTpl(template,renderData);
        $$('#index-toolbar').html(output);

        // 导航按钮切换
        var mm = renderData.mainMenu;
        for(var i = 0; i < mm.length; i++) {
          var selector = "a[href='#tab"+mm[i].type+"_"+mm[i].menuId+"']";
          $$(document).on('click', selector, function (e) {
              var type = $$("a[href='"+this.hash+"']").data('type');
              var menuId = $$("a[href='"+this.hash+"']").data('menuId');
              indexModule.loadPage(type, menuId);
          });
        }
      }

    };

    return {
        init: mainMenu.init
    };
});