// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginMask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.checkLogin()
  },
  // 判断登录
  checkLogin(){
   let skey = wx.getStorageSync('skey')
   if(skey==''){ //未登录
    this.setData({
      loginMask: true
    })
   }
  },
  //授权登录
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      let userInfo = e.detail
      let url = '/wx/login'
      wx.login({
        success: res=>{
          // console.log({
          //   code: res.code,
          //   encryptedData: userInfo.encryptedData,
          //   iv: userInfo.iv,
          //   rawData: userInfo.rawData,
          //   signature: userInfo.signature
          // })
          getApp().post(url, {
            code: res.code,
            encryptedData: userInfo.encryptedData,
            iv: userInfo.iv,
            rawData: userInfo.rawData, 
            signature: userInfo.signature
          }).then(data=>{
            wx.setStorageSync('skey', data.skey)
            wx.setStorageSync('userInfo', data.userInfo)
            // this.setData({
            //   loginMask: false
            // })
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})