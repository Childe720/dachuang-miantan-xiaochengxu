// pages/forum_comment/forum_comment.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type_id:"",
        deviceList:'',
    servicelist:[], //服务集市列表
    scrolltop:null, //滚动位置
    page: 0  //分页
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.type_id=options.id;
        console.log(this.type_id);
        //let comment_id=options.id;
        this.getComment(this.type_id);
        //this.fetchFilterData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    return() {
        wx.navigateTo({
          url: '../knowledge_list/knowledge_list'
        })
    },
    getComment(type_id){
        let that=this;
    wx.request({
      url: 'http://localhost:8080/test1_war_exploded/drug_file_servlet_action?action=get_knowledge_type',
      //data:{"time_from":"2022-11-01 00:00:00","time_to":"2022-11-12 23:59:59","device_type":"sensor","device_id":"CDYLX888819944"},
      data:{"type_id":type_id},
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
//显示列表
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
      let content=data.aaData[i].content;
      newlist.push({
        "id":id,
        "content":content,
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
})