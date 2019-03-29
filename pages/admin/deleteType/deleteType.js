// pages/admin/deleteType/deleteType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    jobTypes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchools()
  },
  // 获取学校列表
  getSchools() {
    let url = '/wx/school/list'
    getApp().post(url).then(data => {
      this.setData({
        schools: data,
        schoolName: data[0].name,
        schoolId: data[0].id,
        pageNo: 1,
        jobTypes: []
      })
      this.getJobTypes()
    })
  },
  // 选择学校
  pickerSchool(e) {
    let index = e.detail.value
    this.setData({
      schoolName: this.data.schools[index].name,
      schoolId: this.data.schools[index].id
    })
    this.getJobTypes()
  },
  // 获取兼职分类
  getJobTypes() {
    let url = '/wx/job-type/page'
    getApp().post(url, {
      currentPage: this.data.pageNo,
      pageSize: 10,
      schoolId: this.data.schoolId
    }).then(data => {
      this.data.jobTypes = this.data.jobTypes.concat(data)
      this.setData({
        pageNo: this.data.pageNo++,
        jobTypes: this.data.jobTypes
      })
    })
  },
  // 删除
  delete(e){
    let url = '/wx/job-type/' + e.currentTarget.dataset.id
    getApp().delete(url).then(data=>{
      wx.showToast({
        title: '删除成功！'
      })
      this.setData({
        pageNo: 1,
        jobTypes: []
      })
      this.getJobTypes()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})