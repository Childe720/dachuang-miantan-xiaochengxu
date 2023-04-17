// pages/forum_add/forum_add.js
var app = getApp()
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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

    /*applySubmit:function(){
        this.addDbRecord();
      },*/
//弹窗
tanchuang(){
  wx.showModal({
    title: '提示',
    content: '确认发表回复吗？',
    success: function (res) {
      if (res.confirm) { //这里是点击了确定以后
        console.log('用户点击确认')
      } else { //这里是点击了取消以后
        console.log('用户点击取消')
      }
    }
  })
  this.addDbRecord();
},


      addDbRecord(e){
        let title=this.data.title;
        let content=this.data.content;
        //获取上传时间
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var time = util.formatTime(new Date());
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        this.setData({
            time: time
        });
        var sql="insert into forum(title,content,openid,create_time)";
        //attachment_url这是无效值，且感觉不需要存储上传文件的的源地址
        sql=sql+" values('"+title+"'";
        sql=sql+" ,'"+content+"'";
        sql=sql+" ,'"+app.globalData.openid+"'";
        sql=sql+" ,'"+time+"')";
        wx.request({
          url: 'http://localhost:8080/test1_war_exploded/drug_file_servlet_action',
          data:{"action":"update_record","sql":sql},
          header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest",},    //主要是x-requested-with，要填点东西
          success:function(res){
            console.log(res.data);
          }
        })
      },
      getDeviceTiltle(e){
        this.setData({
          title:e.detail.value
        })
      },
      getDeviceContent(e){
        this.setData({
          content:e.detail.value
        })
      },

      return() {
        wx.navigateTo({
          url: '../forum_list/forum_list'
        })
      },
})