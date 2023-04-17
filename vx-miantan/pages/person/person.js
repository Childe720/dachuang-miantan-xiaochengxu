// pages/mine/mine.js
Page({
  data: {

  },
  //个人中心的消息,点击跳转到我的消息
  info(){
    wx.navigateTo({
      url: '../info/info',
    })
  },
  //个人中心的我的报告,点击跳转到我的报告
  report() {
    wx.navigateTo({
      url: '../restMoney/restMoney',
    })
  },
  //个人中心的意见反馈,点击跳转到意见反馈
  view() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  //检测
  addr(){
    wx.switchTab({
      url: '../detect/detect',
    })
  },
  // 交流
  com(){
    wx.switchTab({
      url: '../forum_list/forum_list',
    })
  },
  // 科普
  know(){
    wx.switchTab({
      url: '../knowledge_list/knowledge_list',
    })
  },
  //退出登录
  signOut(){
    wx.navigateTo({
      url: '../sign-in/sign-in',
    })
  }
})