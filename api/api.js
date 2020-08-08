/**
 * API请求的模块化处理
 * 将项目中所有的请求都进行统一的管理
 */

const URLS = {
  hotUrl:'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
  latestUrl:'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
  freeUrl:'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items',
  detailUrl:'https://m.douban.com/rexxar/api/v2/movie/'
}

const loadHotFilms = function(params={}){
  //返回Promise对象
  return new Promise((resolve,reject) => {
    wx.request({
      url: URLS.hotUrl,
      data: params,
      //必须写箭头函数形式 原因:箭头函数的特性：不改变this的指向
      success: resolve,
      fail: reject
    });
  }).then( res => {
    if(res.statusCode == 200){
      res.data.method = 'loadHotFilms';
      return res.data;
    }else{
      //将promise状态由resolve转换为reject
      Promise.reject({
        message:res.errMsg
      });
    }
  })
}

const loadLatestFilms = function(params={}){
  return new Promise((resolve,reject) => {
    wx.request({
      url: URLS.latestUrl,
      data: params,
      //必须写箭头函数形式 原因:箭头函数的特性：不改变this的指向
      success: resolve,
      fail: reject
    });
  }).then( res => {
    if(res.statusCode == 200){
      res.data.method = 'loadLatestFilms';
      return res.data;
    }else{
      //将promise状态由resolve转换为reject
      Promise.reject({
        message:res.errMsg
      });
    }
  })
}

const loadFreeFilms = function(params={}){
  return new Promise((resolve,reject) => {
    wx.request({
      url: URLS.freeUrl,
      data: params,
      //必须写箭头函数形式 原因:箭头函数的特性：不改变this的指向
      success: resolve,
      fail: reject
    });
  }).then( res => {
    if(res.statusCode == 200){
      res.data.method = 'loadFreeFilms';
      return res.data;
    }else{
      //将promise状态由resolve转换为reject
      Promise.reject({
        message:res.errMsg
      });
    }
  })
}

const loadFilmByFilmId = function(filmId){
  return new Promise((resolve,reject) => {
    wx.request({
      url: URLS.detailUrl+filmId,
      success: resolve,
      fail: reject
    })
  }).then(res => {
    if(res.statusCode == 200){
      return res.data;
    }else{
      return Promise.reject({
        message: res.errMsg
      });
    }
  });
}

const loadCommentsByFilmId = function(filmId,params={}){
  return new Promise((resolve,reject) => {
    wx.request({
      url: URLS.detailUrl+filmId+'/interests',
      data:params,
      success: resolve,
      fail: reject
    })
  }).then(res => {
    if(res.statusCode == 200){
      return res.data;
    }else{
      return Promise.reject({
        message: res.errMsg
      });
    }
  });
}

const showError = function(error){
  wx.showToast({
    title: error,
    image: '/imgs/error.png'
  })
}


module.exports = {
  loadHotFilms,
  loadLatestFilms,
  loadFreeFilms,
  loadFilmByFilmId,
  loadCommentsByFilmId,
  showError
}