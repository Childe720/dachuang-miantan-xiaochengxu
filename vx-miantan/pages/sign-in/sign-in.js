// pages/sign-in/sign-in.js
    var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo:{},
	  hasUserInfo:false,
	  indicatorDots: true,
	  
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true
    },


	in(){
        wx.switchTab({
          url: '../forum_list/forum_list',
        })
	},

    getUserInfo:function(e){
      wx.getUserProfile({
        desc: '展示用户信息',
        success:res => {
          console.log(res.userInfo)
          wx.setStorage({key:'userInfo',data:res.userInfo})
          this.setData({
            userInfo:res.userInfo,
            hasUserInfo:true
          })
        }
      })
    },

    onLoad:function(){
      if(app.globalData.userInfo){
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }
    },

    //点击登录进行跳转
   /* info(){
        wx.getUserInfo({
            success:(res)=>{
                console.log(res);
                this.setData({
                    wxCode:res.code,
                })
                let m_code=this.data.wxCode;
                let m_AppID="wx253644a41de85667";
                let m_mi="5a8b1868ddd3e8efa3c04aec3cfd1d45";
                console.log("m_code:"+m_code);
                let url="https://api.weixin.qq.com/sns/jscode2session?appid="+m_AppID+"&secret="+m_mi+"&js_code="+m_code+"&grant_type=authorization_code";
                console.log(url);
                wx.request({
                  url: url,
                  success:(res)=>{
                      console.log(res);
                      this.setData({
                          wxOpenID:res.data.openid
                      })
                      console.log(this.data.wxOpenID);
                  }
                })
            }
        })
    },*/

    //下面是新注释的
    info(){
        wx.getUserInfo({
            //成功后会返回
            success:(res)=>{
              console.log(res);
              // 把你的用户信息存到一个变量中方便下面使用
              let userInfo= res.userInfo;
              //获取openId（需要code来换取）这是用户的唯一标识符
              // 获取code值
              wx.login({
                //成功放回
                success:(res)=>{
                  console.log(res);
                  let code=res.code;
                  console.log(res.code);
                  // 通过code换取openId
                  wx.request({
                    url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx253644a41de85667&secret=5a8b1868ddd3e8efa3c04aec3cfd1d45&js_code=${code}&grant_type=authorization_code`,
                    method:"POST",
                    success:(res)=>{
                      console.log(res);
                      app.globalData.openid=res.data.openid;
                      //userInfo.openid=res.data.openid;
                      console.log(app.globalData.openid);
                    }
                  })
                }
              })
              //ajaxSettings.async = true;
        }
          })

          
    },  

    saveInfo(){
        //存入数据库
        //var sql="insert into user_list(openid)";
        //sql=sql+" values('"+app.globalData.openid+"')";
        var sql="replace into user_list(openid)";
        sql=sql+" values('"+app.globalData.openid+"')";
        console.log("存入数据库");
        wx.request({
          url: 'http://localhost:8080/test1_war_exploded/drug_file_servlet_action',
          data:{"action":"update_record","sql":sql},
          header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest",},    //主要是x-requested-with，要填点东西
          success:function(res){
              console.log(res.data);
          }
        })
    },

  
/*async login() {
  try {
    const userInfo = await wx.getUserInfo({}); // 获取用户信息
    console.log(userInfo);
    let code;
    try {
      const res = await wx.login({}); // 获取登录凭证code
      code = res.code;
      console.log(res.code);

    } catch (error) {
      console.error(error);
      return;
    }
    const res = await wx.request({ // 通过code获取openid
    //const res = wx.request({ // 通过code获取openid
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx253644a41de85667&secret=5a8b1868ddd3e8efa3c04aec3cfd1d45&js_code=${code}&grant_type=authorization_code`,
      method: "POST",
    });
    console.log(res);
    console.log(res.data.openid);
    app.globalData.openid = res.data.openid; // 存储openid到全局数据
    console.log(app.globalData.openid);
    await this.saveInfo(); // 存入数据库
  } 
  catch (error) {
    console.error(error);
  }
},

async saveInfo() {
  try {
    var sql = "replace into user_list(openid)";
    sql = sql + " values('" + app.globalData.openid + "')";
    console.log("存入数据库");
    const res = await wx.request({
      url: 'http://localhost:8080/test1_war_exploded/drug_file_servlet_action',
      data: { "action": "update_record", "sql": sql },
      header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
      method: 'POST'
    });
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
},
*/
    
	//轮播
	changeIndicatorDots(e) {
		this.setData({
		  indicatorDots: !this.data.indicatorDots
		})
	  },
	  changeAutoplay(e) {
		this.setData({
		  autoplay: !this.data.autoplay
		})
	  },
	  intervalChange(e) {
		this.setData({
		  interval: e.detail.value
		})
	  },
	  durationChange(e) {
		this.setData({
		  duration: e.detail.value
		})
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

    }
})