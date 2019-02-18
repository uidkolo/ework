// pages/addType/addType.js
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
        schools: data,
        schoolName: data[0].name,
        schoolId: data[0].id
      })
    })
  },
  // 选择学校
  pickerSchool(e) {
    let index = e.detail.value
    this.setData({
      schoolName: this.data.schools[index].name,
      schoolId: this.data.schools[index].id
    })
  },
  // input
  input(e){
    this.setData({
      [e.currentTarget.dataset.key]: e.detail.value
    })
  },
  // 选择封面
  choiceImg(){
    wx.chooseImage({
      count: 1,
      success: res=> {
        getApp().uploadImage(res.tempFilePaths[0]).then(url=>{
          this.setData({
            coverUrl: url
          })
        })
      },
    })
  },
  // 新增
  addType(){
    wx.showLoading({
      title: '正在新增',
    })
    let url = '/wx/job-type'
    getApp().post(url, {
      categoryCode: 0,
      categoryDesc: this.data.categoryDesc,
      categoryName: this.data.categoryName,
      coverUrl: this.data.coverUrl,
      schoolId: this.data.schoolId
    }).then(data=>{
      wx.hideLoading()
      wx.showToast({
        title: '新增成功！',
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})