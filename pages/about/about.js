const app = getApp();

Page({
  data: {
    userInfo: null,
    favorites: {},    //存储收藏的电影信息
    showNoFavorite: true  //是否显示暂无收藏
  },

  onLoad(){
    //当页面加载时从全局数据中获取用户信息
    if(app.userInfo){
      this.setData({
        userInfo:app.userInfo
      });
    }else{
      //由于wx.getUserInfo是异步请求，可能会在当前页面onload之后才返回结果，所以此处加入callback以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        });
      };
    }
  },

  onShow(){
    let favorites = wx.getStorageSync('favorites');
    this.setData({
      favorites: favorites,
      showNoFavorite: Object.keys(favorites).length == 0 //当收藏为空时，显示提示
    });
  },

  getUserInfo(e){
    let userInfo = e.detail.userInfo;
    this.setData({
      userInfo: userInfo
    });
    app.userInfo = userInfo;  //添加到全局数据中
  },

  deleteFavorite(e){
    let id = e.currentTarget.dataset.id; //获取事件触发时传递的参数
    //从data中删除
    delete this.data.favorites[id];
    this.setData({
      favorites: this.data.favorites,
      showNoFavorite: Object.keys(this.data.favorites).length == 0
    });
    //从缓存中删除
    wx.setStorageSync('favorites', this.data.favorites);
  }

})