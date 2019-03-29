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

  },
  login() {
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
          pageNo: this.data.pageNo + 1,
          jobTypes: this.data.jobTypes
        })
        if (data.length == 0) {
          this.setData({
            end: true,
            jobTypeName: '',
            tyoeId: ''
          })
        } else {
          this.setData({
            jobTypeName: this.data.jobTypes[0].categoryName,
            typeId: this.data.jobTypes[0].id
          })
        }
      })
    }
  },
  // 选择分类
  pickerJobType(e) {
    let index = e.detail.value
    this.setData({
      jobTypeName: this.data.jobTypes[index].categoryName,
      typeId: this.data.jobTypes[index].id
    })
  },
  // 选择开始时间
  pickerCrtTime(e) {
    this.setData({
      crtTimeValue: e.detail.value,
      crtTime: e.detail.value + ' ' + '00:00:00'
    })
  },
  // 选择结束时间
  pickerEndTime(e) {
    this.setData({
      endTimeValue: e.detail.value,
      endTime: e.detail.value + ' ' + '23:59:59'
    })
  },
  // input
  input(e) {
    this.setData({
      [e.currentTarget.dataset.key]: e.detail.value
    })
  },
  // 选择图片
  choiceImg(e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        getApp().uploadImage(res.tempFilePaths[0]).then(url => {
          this.setData({
            [e.currentTarget.dataset.key]: url
          })
        })
      },
    })
  },
  // 新增
  addJob() {
    wx.showLoading({
      title: '正在新增',
    })
    let url = '/wx/job'
    getApp().post(url, {
      title: this.data.title,
      schoolId: wx.getStorageSync('schoolId'),
      typeId: this.data.typeId,
      startTime: this.data.crtTime,
      endTime: this.data.endTime,
      timeDesc: this.data.timeDesc,
      jobAddress: this.data.jobAddress,
      recruitNum: this.data.recruitNum,
      coverUrl: this.data.coverUrl,
      qrcodeUrl: this.data.qrcodeUrl,
      jobDetail: this.data.jobDetail
    }).then(data => {
      wx.hideLoading()
      this.setData({
        title: '',
        startTime: '',
        endTime: '',
        timeDesc: '',
        jobAddress: '',
        recruitNum: '',
        coverUrl: '',
        qrcodeUrl: '',
        jobDetail: ''
      })
      wx.showModal({
        content: '发布成功，等待平台审核！'
      })
    }).catch(err => {
      wx.hideLoading()
      if (err) {
        const componentLogin = this.selectComponent('#login')
        componentLogin.setData({
          loginStatus: false
        })
        wx.setStorage({
          key: 'login',
          data: '',
        })
      }
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