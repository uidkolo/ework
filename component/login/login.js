// component/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loginStatus:{
      type: Boolean,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    //授权登录
    bindGetUserInfo(e) {
      if (e.detail.userInfo) {
        wx.showLoading({
          title: '正在授权',
        })
        let userInfo = e.detail
        let url = '/wx/login'
        wx.login({
          success: res => {
            getApp().post(url, {
              code: res.code,
              encryptedData: userInfo.encryptedData,
              iv: userInfo.iv,
              rawData: userInfo.rawData,
              signature: userInfo.signature
            }).then(data => {
              wx.hideLoading()
              wx.setStorageSync('skey', data.skey)
              wx.setStorageSync('userInfo', data.userInfo)
              wx.setStorage({
                key: 'login',
                data: true,
              })
              this.setData({
                loginStatus: true
              })
              this.triggerEvent('login', {}, {})
            })
          }
        })
      }
    },
  },
  attached() {
    let skey = wx.getStorageSync('skey')
    if (skey == '') { //未登录
      this.setData({
        loginStatus: ''
      })
    }else{
      this.setData({
        loginStatus: true
      })
      this.triggerEvent('login', {}, {})
    }
  },
  pageLifetimes:{
    show(){
      this.setData({
        loginStatus: wx.getStorageSync('login')
      })
    }
  }
})
