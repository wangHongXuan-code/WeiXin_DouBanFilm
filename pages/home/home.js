const api = require('../../api/api.js');

Page({
  data: {
    types:[]
  },

  onReady: function () {
    this.loadHomeData();
  },

  loadHomeData(){
    //加载影院热映
    api.loadHotFilms({
      start: 0,
      count: 6
    }).then(data => {
      let type = {
        title: data.subject_collection.name,
        list: data.subject_collection_items,
        method: data.method
      };
      this.setData({
        'types[0]': type
      });
    }).catch(api.showError);

    //加载近期热门
    api.loadLatestFilms({
      start: 0,
      count: 6
    }).then(data => {
      let type = {
        title: data.subject_collection.name,
        list: data.subject_collection_items,
        method: data.method
      };
      this.setData({
        'types[1]': type
      });
    }).catch(api.showError);

    //加载免费在线
    api.loadFreeFilms({
      start: 0,
      count: 6
    }).then(data => {
      let type = {
        title: data.subject_collection.name,
        list: data.subject_collection_items,
        method: data.method
      };
      this.setData({
        'types[2]': type
      });
    }).catch(api.showError);
  }

})