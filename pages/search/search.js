// pages/index/workList/workList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    end: false,
    jobs: [],
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 获取兼职列表
  getJobList() {
    wx.showLoading({
      title: '正在加载',
    })
    this.setData({
      end: false
    })
    let url = '/wx/job/list'
    getApp().post(url, {
      typeId: this.data.typeId,
      schoolId: wx.getStorageSync('schoolId'),
      keyword: this.data.keyword
    }).then(data => {
      wx.hideLoading()
      let list = data
      list.forEach(item => {
        item.startTime = item.startTime.split(' ')[0]
        item.endTime = item.endTime.split(' ')[0]
      })
      this.setData({
        jobs: data,
        end: true
      })
    }).catch(()=>{
      this.getJobList()
    })
  },
  input(e) {
    this.setData({
      [e.currentTarget.dataset.key]: e.detail.value
    })
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
    this.getJobList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})