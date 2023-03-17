const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    deviceList:'',
    servicelist:[], //服务集市列表
    scrolltop:null, //滚动位置
    page: 0  //分页
  },
  onLoad: function () { //加载数据渲染页面
    //this.fetchServiceData();
    this.onDeviceListTap();
    this.fetchFilterData();
  },
 
  //list的初始化显示
  onDeviceListTap(e){
    let that=this;
    wx.request({
      url: 'http://localhost:8080/test1_war_exploded/drug_file_servlet_action?action=get_forum_list',
      //data:{"time_from":"2022-11-01 00:00:00","time_to":"2022-11-12 23:59:59","device_type":"sensor","device_id":"CDYLX888819944"},
      data:{},
      method:'post',
      header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest", "Cookie": "JSESSIONID=" + app.globalData.sessionId },
      success:function(res){
        console.log("[onDeviceListTap]从服务器收到的查询结果是："+JSON.stringify(res));
        that.handleGetDeviceRecordResult(res.data);
      },
      fail:function(res){
        console.log("[onDeviceListTap]服务器查询结果失败："+JSON.stringify(res));
      }
    })
  },

  //获取列表
  handleGetDeviceRecordResult(data){
    let _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    const perpage = 10;
    this.setData({
      page:this.data.page+1
    })
    const page = this.data.page;
    const newlist = [];
    //for (var i = (page-1)*perpage; i < page*perpage; i++) {
    for (var i = 0; i < data.aaData.length; i++) {
      let id=data.aaData[i].id;
      let title=data.aaData[i].title;
      let content=data.aaData[i].content;
      let openid=data.aaData[i].openid;
      let create_time=data.aaData[i].create_time;
      newlist.push({
        "id":id,
        "title":title,
        "content":content,
        "openid":openid,
        "create_time":create_time,
      })
    }
    setTimeout(()=>{
      _this.setData({
        servicelist:_this.data.servicelist.concat(newlist)
      })
    },1500)
  },
  
  scrollHandle:function(e){ //滚动事件
    this.setData({
      scrolltop:e.detail.scrollTop
    })
  },
  goToTop:function(){ //回到顶部
    this.setData({
      scrolltop:0
    })
  },
  scrollLoading:function(){ //滚动加载
    this.fetchServiceData();
  },
  onPullDownRefresh:function(){ //下拉刷新
    this.setData({
      page:0,
      servicelist:[]
    })
    this.fetchServiceData();
    this.fetchFilterData();
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },1000)
  },
  /*================================================================================*/
  //CRUD
  //add
  goto_add() {
    wx.navigateTo({
      url: '../forum_add/forum_add'
    })
  },
  goto_find() {
    wx.navigateTo({
      url: '../forum_find/forum_find'
    })
  },

})