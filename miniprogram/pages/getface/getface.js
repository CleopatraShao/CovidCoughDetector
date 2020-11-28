//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    taken:0,
    debuginfo:'debugmode',
  },
  onLoad:function(){
    this.setData({debuginfo:getApp().globalData.coughtoken});
  },
  takePhoto:function() {
    var app = getApp();
    var imgrt=app.globalData.imgrt;
    this.setData({taken:1});
    var that=this;
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('temp photo path:',res.tempImagePath);
        getApp().globalData.imgrt=res.tempImagePath;
        /*
        //插入上传代码段
        wx.saveFile({
          tempFilePath:res.tempImagePath,
          success (res) {
            getApp().globalData.imgrt = res.savedFilePath
          }
        })*/
      }
    })
  },
  skipit:function(){
    var app = getApp();
    var imgrt=app.globalData.imgrt;
    wx.navigateTo({url: '/pages/return/return'});
  },
  jumptorecord: function(){
    var app = getApp();
    var that=this;
    var imgrt=app.globalData.imgrt;
    var coughtoken=app.globalData.coughtoken;
    wx.showLoading({title: '上传中...',});
    wx.uploadFile({
      url: getApp().globalData.imgurl,     
      filePath: imgrt,     
      name: "figure", //name should be the file key in formData,
      header: {
        coughtoken:coughtoken
      },
      method: 'POST',     
      timeout:"1000",
      formData: {       
      },     
      success: res => {
        wx.hideLoading();
        successCallback(res);     
        var data = res.data
        console.log(data)
        //do something
        that.setData({debuginfo:JSON.stringify(res.data)});
        //wx.navigateTo({url: '/pages/return/return'});
      },     
      fail: err => {     
        that.setData({debuginfo:err});
        wx.hideLoading();     
        wx.showToast({
          title: '请求超时',
          icon: 'loading',     
          durantion:"5000"
        })
      }
    });
  },
})
