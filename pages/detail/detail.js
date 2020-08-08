const api = require('../../api/api.js');
const app = getApp();

Page({


  data: {
    filmId:'',
    film:{},  //存储电影信息
    start: 0,
    count: 10,
    total: 0,
    showLoading: false,
    showNomore: false,
    comments:[]  //存储电影评论
  },


  onLoad: function (options) {
    this.data.filmId = options.filmId;
  },

  onReady: function () {
    this.loadDetailData();
  },

  loadDetailData(){
    api.loadFilmByFilmId(this.data.filmId).then(data => {
      this.setData({
        film:data
      });
    }).catch(api.showError);
    //加载电影评论
    api.loadCommentsByFilmId(this.data.filmId,{
      start: this.data.start,
      count: this.data.count,
      order_by: 'time'
    }).then(data => {
      this.setData({
        comments: this.data.comments.concat(data.interests),
        start: this.data.start+this.data.count,
        total: data.total
      });
    }).catch(api.showError);
    //加载电影评论
    this.loadComments();
  },

  //加载电影评论
  loadComments(){
    return api.loadCommentsByFilmId(this.data.filmId,{
      start: this.data.start,
      count: this.data.count,
      order_by: 'time'
    }).then(data => {
      this.setData({
        comments: this.data.comments.concat(data.interests),
        start: this.data.start+this.data.count,
        total: data.total
      });
    }).catch(api.showError);
  },

  //上拉加载
  onReachBottom:function(){
    if(this.data.start < this.data.total){
      this.setData({
        showLoading: true
      });
      this.loadComments().then(() => {
        this.setData({
          showLoading: false
        });
      });
    }else{
      this.setData({
        showNomore: true
      });
    }
  },

  //添加收藏
  addFavorite(){
    if(!app.userInfo){
      //判断是否已授权登录
      wx.showModal({
        title: '提示',
        content: '请先登录'
      })
      return;
    }
    //获取本地缓存中的收藏数据
    var favorites = wx.getStorageSync('favorites') || {};
    if(favorites[this.data.filmId]){
      wx.showToast({
        title: '已收藏',
        image: '/imgs/error.png'
      })
      return;
    }
    //添加电影到本地缓存
    //由于detail中的film对象和home中的film对象的属性有差异，所以需要手动处理
    this.data.film.cover.url = this.data.film.pic.normal;
    favorites[this.data.filmId] = this.data.film;
    wx.setStorageSync('favorites', favorites);
    wx.showToast({
      title: '收藏成功',
      image: '/imgs/success.png'
    });
  }

})