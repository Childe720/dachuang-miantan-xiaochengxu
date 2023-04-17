// pages/detect/detect.js
var app = getApp()
var util = require('../../utils/util.js');
Page({
    data: {
      uploadimgs: [], //上传图片列表
      editable: false, //是否可编辑
      attachment_object_id:"",
      attachment_url:"",
  },
    
    
    chooseImage: function () {
      let _this = this;
      wx.showActionSheet({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
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
    },

    applySubmit: function () {
        //获取上传时间
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var time = util.formatTime(new Date());
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        this.setData({
            time: time
        });
        var sql="insert into pic_list(url,openid,create_time)";
        //attachment_url这是无效值，且感觉不需要存储上传文件的的源地址
        sql=sql+" values('"+this.attachment_url+"'";
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
  })
  