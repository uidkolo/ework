//app.js
App({
  onLaunch: function() {
    
  },
  onShow(options){
    if (options.referrerInfo.extraData != undefined){
      wx.setStorage({
        key: 'schoolId',
        data: options.referrerInfo.extraData.school_id
      })
    }
  },
  globalData: {

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
            if (res.data.message.indexOf('过期')!=-1){ //登录过期
              reject(true)
            }else{
              wx.showModal({
                title: '错误提示',
                content: res.data.message,
              })
              reject()
            }
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
        header: {
          'weapp-type': 'jz',
          'skey': wx.getStorageSync('skey')
        },
        success: res => {
          if (res.data.code == 200) {
            if (res.data.data) {
              resolve(res.data.data)
            } else {
              resolve()
            }
          } else {
            if (res.data.message.indexOf('过期') != -1) { //登录过期
              reject(true)
            } else {
              wx.showModal({
                title: '错误提示',
                content: res.data.message,
              })
              reject()
            }
          }
        }
      })
    })
  },
  put(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://www.exiaoyuanbang.com${url}`,
        method: 'PUT',
        header: {
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
            if (res.data.message.indexOf('过期') != -1) { //登录过期
              reject(true)
            } else {
              wx.showModal({
                title: '错误提示',
                content: res.data.message,
              })
              reject()
            }
          }
        }
      })
    })
  },
  delete(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://www.exiaoyuanbang.com${url}`,
        method: 'DELETE',
        header: {
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
            if (res.data.message.indexOf('过期') != -1) { //登录过期
              reject(true)
            } else {
              wx.showModal({
                title: '错误提示',
                content: res.data.message,
              })
              reject()
            }
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
  }
})