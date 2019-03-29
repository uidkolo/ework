// pages/index/workList/workList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    end: false,
    jobs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      typeId: options.typeId
    })
    this.getJobList()
  },
  // 获取兼职列表
  getJobList() {
    if (!this.data.end) {
      wx.showLoading({
        title: '正在加载',
      })
      let url = '/wx/job/page'
      getApp().post(url, {
        typeId: this.data.typeId,
        schoolId: wx.getStorageSync('schoolId'),
        currentPage: 1,
        pageSize: 10,
      }).then(data => {
        wx.hideLoading()
        let list = data
        list.forEach(item => {
          item.startTime = item.startTime.split(' ')[0]
          item.endTime = item.endTime.split(' ')[0]
        })
        this.setData({
          jobs: this.data.jobs.concat(data),
          currentPage: this.data.currentPage + 1
        })
        if(list.length<10){
          this.setData({
            end: true
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
    this.getJobList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})