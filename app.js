const { myapi,wxapi}=require('./server/index.js')
App({
  onLaunch: function(options) {
    var that = this;

    //判断登陆是否过期
    const sessionId = wx.getStorageSync('sessionId');
    console.log(sessionId)
    if (sessionId){
    //通过用户信息去 返回去判断 用户是否在登录状态
      myapi.userInformation(sessionId).then(res => {
        if (res.data.status == 401) {//判断sessionId 是否失效  到首页去重新登录
           console.log('401不在登录状态')
             wx.removeStorageSync('sessionId')
              wx.redirectTo({
                url: '/pages/load/load',
              })

              return Promise.reject('401不在登录状态')
         }
              return Promise.reject('已经在登录状态')
      }).catch(err=>{
        console.log(err);
      })
    }else{
      console.log('-----------------load')
      wx.redirectTo({
        url: '/pages/load/load',
      })
    }

    // 小程序版本更新
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function(){
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用applyUpdate应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      })
    });
    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    })
    var res = wx.getSystemInfoSync();
    wx.setStorageSync('windowHeight', res.windowHeight);
    wx.setStorageSync('windowWidth', res.windowWidth);
  },

  globalData: {

    // 自定义标题组件
    height: 0,

  },
  // 跳转到发布页
  toSend: function(e) {
    wx.navigateTo({
      url: '/pages/send/send',
    })
  },
})
