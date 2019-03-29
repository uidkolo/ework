// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    pubData: {
      currentPage: 1,
      list: [],
      end: false
    },
    joinData: {
      currentPage: 1,
      list: [],
      end: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  login(){
    this.getUserInfo()
    this.getMyJoin()
  },
  // 获取用户信息
  getUserInfo() {
    this.setData({
      nickName: wx.getStorageSync('userInfo').nickName,
      avatar: wx.getStorageSync('userInfo').avatarUrl
    })
  },
  // 获取我发布的兼职
  getMyPub() {
    if (!this.data.pubData.end) {
      wx.showLoading({
        title: '正在加载',
      })
      let url = '/wx/job/pageMyPub'
      getApp().post(url, {
        currentPage: this.data.pubData.currentPage,
        pageSize: 10,
        schoolId: wx.getStorageSync('schoolId')
      }).then(data => {
        wx.hideLoading()
        data.forEach(item => {
          item.startTime = item.startTime.split(' ')[0]
          item.endTime = item.endTime.split(' ')[0]
        })
        this.data.pubData.list = this.data.pubData.list.concat(data)
        this.data.pubData.currentPage = this.data.pubData.currentPage + 1
        if (data.length < 10) {
          this.data.pubData.end = true
        }
        this.setData({
          pubData: this.data.pubData
        })
      }).catch(err => { //登录过期=>重新登录后
        wx.hideLoading()
        if(err){
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
    }
  },
  // 获取我参加的兼职
  getMyJoin() {
    if (!this.data.joinData.end) {
      wx.showLoading({
        title: '正在加载',
      })
      let url = '/wx/job/pageListMyJoin'
      getApp().post(url, {
        currentPage: this.data.joinData.currentPage,
        pageSize: 10,
        schoolId: wx.getStorageSync('schoolId')
      }).then(data => {
        wx.hideLoading()
        data.forEach(item => {
          item.startTime = item.startTime.split(' ')[0]
          item.endTime = item.endTime.split(' ')[0]
        })
        this.data.joinData.list = this.data.joinData.list.concat(data)
        this.data.joinData.currentPage = this.data.joinData.currentPage + 1
        if (data.length < 10) {
          this.data.joinData.end = true
        }
        this.setData({
          joinData: this.data.joinData
        })
      }).catch(err => { //登录过期=>重新登录后
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
    }
  },
  tab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index
    })
    if (index == 0) { //参加的兼职
      this.data.joinData = {
        currentPage: 1,
        list: [],
        end: false
      }
      this.getMyJoin()
    } else { //发布的兼职
      this.data.pubData = {
        currentPage: 1,
        list: [],
        end: false
      }
      this.getMyPub()
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