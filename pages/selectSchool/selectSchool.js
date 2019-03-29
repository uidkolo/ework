// pages/selectSchool/selectSchool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSchools()
  },
  // 获取学校列表
  getSchools() {
    let url = '/wx/school/list'
    getApp().post(url).then(data => {
      this.setData({
        schools: data
      })
      if (this.data.schoolName == undefined) {
        this.setSchool(data[0].id)
      }
    })
  },
  // 设置学校
  setSchool(id){
    wx.setStorageSync('schoolId', id)
  },
  // 选择学校
  pickerSchool(e) {
    let index = e.detail.value
    let schoolId = this.data.schools[index].id
    this.setSchool(schoolId)
  },
  toIndex(){
    let schoolId = wx.getStorageSync('schoolId')
    if (schoolId == "") { 
      wx.showToast({
        image: '/images/common/tip.png',
        title: '请选择学校'
      })
    } else { 
      wx.switchTab({
        url: '/pages/index/index',
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