define(['framework7', 'config', 'xhr', 'router', 'appFunc', 'briefModule', 'roomModule', 'serviceModule', 'text!index/index.tpl.html'], 
  function(framework7, config, xhr, router, appFunc, briefModule, roomModule, serviceModule, template){

    var $$ = Dom7;

    var index = {
      init: function() {
        xhr.ajax({
          'url': config.getJSONUrl('mainMenu'),
          dataType: 'json',
          'success': function(data){
            index.loadData(data)
          }
        })
      },
      loadPage: function (type, menuId){
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

        // 加载tabs
        var renderData = data.data;

        var output = appFunc.renderTpl(template,renderData);
        $$('#index-pages').html(output);

        // init app 
        var mm = renderData.mainMenu;
        if(mm.length > 0) {
          index.loadPage(mm[0].type, mm[0].menuId);
        }
      }

    };

    return {
        init: index.init,
        loadPage: index.loadPage
    };
});