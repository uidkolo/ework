// pages/insue/issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    end: false,
    pageNo: 1,
    jobTypes: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getJobTypes()
  },
  // 获取兼职分类
  getJobTypes() {
    if (!this.data.end) {
      let url = '/wx/job-type/page'
      getApp().post(url, {
        currentPage: this.data.pageNo,
        pageSize: 10,
        schoolId: wx.getStorageSync('schoolId')
      }).then(data => {
        this.data.jobTypes = this.data.jobTypes.concat(data)
        this.setData({
          pageNo: this.data.pageNo+1,
          jobTypes: this.data.jobTypes
        })
        if (data.length<10){
          this.setData({
            end: true
          })
        }
        this.getJobTypes()
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