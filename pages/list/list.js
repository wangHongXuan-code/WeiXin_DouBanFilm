const api = require('../../api/api.js');

Page({

  data: {
    method:'',
    films:{},  //存储分类的电影
    start: 0,  //起始索引
    count: 12,   //返回数量
    total: 0, //总条数
    showLoading: false,  //是否显示loading
    showNomore: false    //是否显示nomore
  },

  onLoad: function (options) {
    this.data.method = options.method;
  },

  onReady: function () {
    this.loadListData();
  },

  loadListData(){
    //返回Promise对象，便于执行
    return api[this.data.method]({
      start: this.data.start,
      count: this.data.count
    }).then(data => {  
      let list = this.data.films.list || [];
      let films = {
        title:data.subject_collection.name,
        list:list.concat(data.subject_collection_items) //上拉加载时进行数据累加
      };
      this.setData({
        films:films,
        start:this.data.start+this.data.count,
        total:data.total
      });
    }).catch(err => {
      console.log(err);
    });
  },

  //上拉加载
  onReachBottom: function () {
    //判断是否还有更多数据
    if(this.data.start < this.data.total){
      //显示loading
      this.setData({
        showLoading: true
      });
      this.loadListData().then(() => {
        //隐藏loading
        this.setData({
          showLoading: false
        });
      });
    }else{
      this.setData({
        showNomore:true
      });
    }
    
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      start: 0,
      films: {}
    });
    this.loadListData();
  }

 
})