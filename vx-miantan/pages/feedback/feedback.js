// pages/feedback/feedback.js
var app = getApp()
var util = require('../../utils/util.js');
Page({
    data: {
      uploadimgs: [], //上传图片列表
      editable: false, //是否可编辑
      attachment_object_id:"",
      attachment_url:"",
  },
    
    //上传图片
    chooseImage: function () {
      let _this = this;
      wx.showActionSheet({
        itemList: ['从相册中选择', '拍照'],
        itemColor: "#f7982a",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              _this.chooseWxImage('album')
            } else if (res.tapIndex == 1) {
              _this.chooseWxImage('camera')
            }
          }
        }
      })
    },
    chooseWxImage: function (type) {
      let _this = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'], 
        //sourceType: [type],
        success: function (res) {
          _this.setData({
            uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
          });
          _this.uploadFile(res);
        }
      })
    },
    editImage: function () {
      this.setData({
        editable: !this.data.editable
      })
    },
    deleteImg: function (e) {
      console.log(e.currentTarget.dataset.index);
      const imgs = this.data.uploadimgs
      // Array.prototype.remove = function(i){
      //   const l = this.length;
      //   if(l==1){
      //     return []
      //   }else if(i>1){
      //     return [].concat(this.splice(0,i),this.splice(i+1,l-1))
      //   }
      // }
      this.setData({
        uploadimgs: imgs.remove(e.currentTarget.dataset.index)
      })
    },
    uploadFile(res) {
      let _this=this;
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      //url: 'http://localhost:8080/test1_war_exploded/drug_file_servlet_action',
      var remoteUrl="http://localhost:8080/test1_war_exploded/drug_file_servlet_action?action=upload";
      wx.uploadFile({
        url: remoteUrl,
        filePath: tempFilePaths[0],
        name: 'img',
        header: { "content-type": "multipart/form-data", "x-requested-with": "XMLHttpRequest"},
        formData: {
          'action': 'upload' //其他额外的formdata，可不写
        },
        success: function (res) {
          console.log(res);
          var data = JSON.parse(res.data);
          data=data.upload_files[0];
          var ids = [data.file_object_id];
          var urls = [data.file_url_name];
          //_this.attachment_url=data.file_url_name;
          //_this.attachment_object_id=data.file_object_id;
          _this.setData({
            attachment_object_id: data.file_object_id,
            attachment_url: data.file_url_name,
            uploadimgsId: ids,
            uploadimgsUrl: urls,
          });
        },
        fail: function (res) {
          console.log('fail');
        },
      })
      console.log(_this.data.attachment_object_id);
    },

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
      this.applySubmit();
    },

    //存入数据库
    applySubmit: function (){
        let _this=this;
        console.log(_this.data.attachment_object_id);
        let tel=_this.data.tel;
        let content=_this.data.content;
        //获取上传时间
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var time = util.formatTime(new Date());
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        _this.setData({
            time: time
        });
        var sql="insert into feedback(tel,content,attachment_object_id,attachment_url,openid,create_time)";
        //attachment_url这是无效值，且感觉不需要存储上传文件的的源地址
        sql=sql+" values('"+tel+"'";
        sql=sql+" ,'"+content+"'";
        sql=sql+" ,'"+_this.data.attachment_object_id+"'";
        sql=sql+" ,'"+_this.data.attachment_url+"'";
        sql=sql+" ,'"+app.globalData.openid+"'";
        sql=sql+" ,'"+time+"')";
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

      //前端表单信息获取
      getDeviceTel(e){
        this.setData({
          tel:e.detail.value
        })
      },
      getDeviceContent(e){
        this.setData({
          content:e.detail.value
        })
      },
  })
  