const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    deviceList:'',
    servicelist:[
      {
        id: 0, type: "测试", content: "一号测试内容", 
      },
      {
        id: 1, type: "测试2", content: "还不起床?真把自己当少爷了?我地都种完了这个时候要是有更多时间我还会去晨跑你现在还不起床?你这懒狗玩手机玩到两三点钟才睡的懒狗社会的败类蛆虫我是你的话我已经跳楼自尽了你现在一定躺在床上睡觉吧？睡得跟死猪一样？一拳打烂你这个懒狗的头 新的一天 你根本没有改变 你还是一只懒狗 不勤奋的可怜虫 今天第一骂 骂的就是你 起床别过少爷生活起床别过少爷生活起床别过少爷生活起床别过少爷生活起床别过少爷生活起床别过少爷生活起床别过少爷生活起床别过少爷生活起床别过少爷生活起床别过少爷生活起床别过少爷生活起床别过少爷生活"
      },
      {
        id: 2, type: "发癫", content: "什么啊，都是假的，怎么可能精神状态不稳定，笑死了，我天天可开心了，学校生活就是如此美妙我直接爱上了，真的相信我，怎么会不稳定呢？大家都这么热爱生活热爱学习，相信我大家都很开心的相信我，真的，一定要相信我啊"
      },
      {
        id: 3, type: "测试", content: "测试内容", 
      },
    ], //服务集市列表
    scrolltop:null, //滚动位置
    page:1,  //分页


    // 分界线
    tabIndex: 0
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
      url: 'http://localhost:8080/test1_war_exploded/drug_file_servlet_action?action=get_knowledge_record',
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
      let type=data.aaData[i].type;
      let content=data.aaData[i].content;
      newlist.push({
        "id":id,
        "type":type,
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



  // 分界线
  // 切换标签
  tabChange(event) {
    this.setData({
      tabIndex: event.target.dataset.tabIndex
    });
  }
  
})