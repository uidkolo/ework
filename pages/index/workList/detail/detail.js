// pages/index/workList/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeMask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id != undefined) {
      this.setData({
        id: options.id
      })

    }
  },
  login() {
    this.getJobInfo()
  },
  // 获取兼职详情
  getJobInfo() {
    wx.showLoading({
      title: '正在加载',
    })
    if (this.data.id != undefined) {
      let url = `/wx/job/detail/${this.data.id}`
      getApp().get(url).then(data => {
        wx.hideLoading()
        let info = data
        info.startTime = info.startTime.split(' ')[0]
        info.endTime = info.endTime.split(' ')[0]
        this.setData({
          info: info
        })
        this.timer()
      }).catch((err) => {
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
    }else{
      setTimeout(this.getJobInfo, 100)
    }
  },
  imgLoad(e) {
    this.data[e.currentTarget.dataset.obj] = {
      width: e.detail.width / e.detail.height * 500,
      height: 500
    }
    this.setData({
      [e.currentTarget.dataset.obj]: this.data[e.currentTarget.dataset.obj]
    })
  },
  view() {
    let urls = []
    urls.push(this.data.info.coverUrl)
    wx.previewImage({
      urls: urls,
    })
  },
  // 报名
  apply() {
    wx.showLoading({
      title: '正在报名',
    })
    let url = '/wx/job-user'
    getApp().post(url, {
      jobId: this.data.id
    }).then(data => {
      wx.hideLoading()
      this.data.info.isJoin = 1
      this.setData({
        info: this.data.info
      })
      wx.hideLoading()
      wx.showModal({
        content: '报名成功！请尽快加入群聊',
      })
    }).catch(() => { //登录过期=>重新登录后
      this.apply()
    })
  },
  // 取消报名
  cancelApply() {
    wx.showLoading({
      title: '正在取消',
    })
    let url = '/wx/job-user'
    getApp().put(url, {
      jobId: this.data.id
    }).then(data => {
      wx.hideLoading()
      this.data.info.isJoin = 0
      this.setData({
        info: this.data.info
      })
      wx.showModal({
        content: '取消成功！',
      })
    }).catch(() => { //登录过期=>重新登录后
      this.cancelApply()
    })
  },
  // 倒计时
  timer() {
    let startSecond = new Date(this.data.info.startTime).getTime()
    let endSecond = new Date(this.data.info.endTime).getTime()
    let now = new Date().getTime()
    let differStart = Math.ceil((startSecond - now) / 1000)
    let differEnd = Math.ceil((endSecond - now) / 1000)
    if (differStart > 0) { //未开始=> 倒计时
      this.setData({
        jobStatus: 0
      })
      let day = Math.floor(differStart / (24 * 60 * 60))
      let hour = Math.floor(differStart % (24 * 60 * 60) / (60 * 60))
      let minute = Math.floor((differStart % (60 * 60)) / 60)
      let second = differStart % 60
      this.setData({
        day: day,
        hour: hour,
        minute: minute,
        second: second
      })
      setTimeout(this.timer, 1000)
    } else if (differStart <= 0 && differEnd >= 0) { //进行中
      this.setData({
        jobStatus: 1
      })
    } else if (differEnd < 0) { //已结束
      this.setData({
        jobStatus: 2
      })
    }
  },
  // 加入群聊
  joinGroup() {
    this.setData({
      qrcodeMask: true
    })
  },
  // 保存二维码
  saveQrcode() {
    wx.getImageInfo({
      src: this.data.info.qrcodeUrl,
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: () => {
            wx.showToast({
              title: '保存成功！'
            })
          }
        })
      }
    })
  },
  // 关闭
  closeMask() {
    this.setData({
      qrcodeMask: false
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
    return {
      title: '【兼职】' + this.data.info.title,
      path: `/pages/index/workList/detail/detail?id=${this.data.id}`,
      imageUrl: this.data.info.coverUrl
    }
  }
})