const {
  wxapi,
  myapi
} = require('../../server/index.js')
const {
  fliter
} = require('./../../utils/util.js')
Component({
  properties: {
    authorization: {
      type: Boolean,
      value: true
    }
  },
  data: {
    val: '',
    code: '',
    latitude: '',
    longitude: ''
  },
  methods: {
    bindgetuserinfo(e) {
      console.log(e)
      const that = this;
      if (e.detail.errMsg == 'getUserInfo:ok' || e.detail.userInfo !== undefined) {
        wx.showLoading({
          title: '登录中...',
          mask: true, //阻止其他操作
        })
        console.log(e.detail.userInfo);
        wxapi.login().then(res => {
          /* 授权成功获取 code 再去经纬度*/
          console.log('拿到小程序_code', res)
          that.setData({
            code: res.code
          })
          return wxapi.getLocation('gcj02')
        }).then(res => {
          /* 获取经度纬度*/
          console.log(res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
          //获取经纬度之后去请求用户信息
          return wxapi.userInfo();
        }).then(res => {
          /*拿到授权后的用户信息*/
          console.log(res);
          console.log(that.data.code);
          /*传递参数 用户登陆参数*/
          const data = {
            avatarUrl: res.userInfo.avatarUrl,
            code: that.data.code,
            nickname: fliter(res.userInfo.nickName),
            sex: res.userInfo.gender,
            latitude: that.data.latitude,
            longitude: that.data.longitude
          }
          return myapi.api_loin(data)
        }).then(res => {
          console.log(res.data)
          if (res.data.status == 200) {
            /* 授权成功 之后 把sessionId 保存在本都*/
            // const sessionId = res.data.data.substr(4);
            wx.setStorageSync('sessionId', res.data.data)
            wx.hideLoading(); //授权成功之后关闭 提示
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })
            //授权成功 返回false状态
            that.triggerEvent('sessionIdTap', false);

          } else {
            return Promise.reject(res.data) //不等200的返回
          }
        }).catch(err => {
          console.log(err);
          wx.hideLoading()
          if (err.status == 500) {
            console.log(`登录接口 500错误`)
            wx.showModal({
              title: '登陆失败',
              content: `服务器繁忙，请稍后重试`,
              confirmText: '知道了',
              success: function(res) {}
            });
          } else if (err.errMsg == 'request:fail timeout') {
            console.log(`登录接口 请求超时错误`)
            wx.showModal({
              title: '登陆失败',
              content: `服务器繁忙，请稍后重试`,
              confirmText: '知道了',
              success: function(res) {}
            });
          }

        })
      }
    }
  },
  pageLifetimes: {
    show() {
      wx.hideTabBar({})
    }
  }
})