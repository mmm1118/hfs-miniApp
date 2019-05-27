const {https} = require("./https.js"); /* 全局域名*/

class Fetch {
  constructor() {
    this.host = https;
  }

  $http(params) {
    let sessionId = wx.getStorageSync('sessionId')
    !params.isNoLoading && wx.showLoading({
      title: params.loadingText || '数据加载中...',
      mask: 'true'
    })
    return new Promise((resolve, reject) => {
      wx.request({
        method: params.method || 'GET',
        url: `${this.host}${params.url}?sessionId=${sessionId}`,
        header: {
          'content-type': params.contentType || 'application/json' || 'application/x-www-form-urlencoded'
        },
        data: params.data || {},
        success: (res) => {
          if (res.data.status === 200) {
            resolve(res.data.data)
          } else {
            reject(res.data.msg)
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail() {
          reject
        },
        complete() {
          wx.hideLoading()
        }
      })
    })
  }
}

export default Fetch
