//app.js
App({
  onLaunch: function() {
    
  },
  globalData: {
    userInfo: null
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://www.exiaoyuanbang.com${url}`,
        method: 'POST',
        header:{
          'weapp-type': 'jz',
          'skey': wx.getStorageSync('skey')
        },
        data: data == undefined ? {} : data,
        success: res => {
          if (res.data.code == 200) {
            if (res.data.data) {
              resolve(res.data.data)
            } else {
              resolve()
            }
          } else {
            wx.showToast({
              title: res.data.message,
              image: '/images/common/tip.png'
            })
            reject()
          }
        }
      })
    })
  },
  get(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://www.exiaoyuanbang.com${url}`,
        data: data == undefined ? {} : data,
        success: res => {
          if (res.data.code == 1) {
            if (res.data.data) {
              resolve(res.data.data)
            } else {
              resolve()
            }
          } else {
            wx.showToast({
              title: res.data.msg,
              image: '/images/tip.png'
            })
          }
        }
      })
    })
  },
  uploadImage(file) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '正在上传',
      })
      let url = 'https://www.exiaoyuanbang.com/wx/upload'
      wx.uploadFile({
        url: url,
        filePath: file,
        name: 'file',
        success: res => {
          wx.hideLoading()
          let data = JSON.parse(res.data)
          if (data.code == 200) {
            resolve(data.data)
          } else {
            wx.showToast({
              title: res.data.msg,
              image: '/images/tip.png'
            })
          }
        }
      })
    })
  },
})