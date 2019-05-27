const {wxapi,myapi} = require('./../../server/index.js')
var app = getApp();

Page({
  data: {
    val: '',
    code: '',
    latitude: '',
    longitude: ''
  },
  onLoad: function(options) {
  
  },
  bindgetuserinfotwo(e){
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
          nickname: res.userInfo.nickName,
          sex: res.userInfo.gender,
          latitude: that.data.latitude,
          longitude: that.data.longitude
        }
        return myapi.api_loin(data)
      }).then(res => {
        console.log(res.data)
        if (res.data.status == 200) {
          /* 授权成功 之后 把sessionId 保存在本都*/
          const sessionId = res.data.data
          wx.setStorageSync('sessionId', sessionId );
          return myapi.userInformation(sessionId)//获取用户信息
        } else {
          //授权成功 返回false状态
          return Promise.reject(res.data) //不等200的返回
        }
      }).then(res=>{
        console.log(res.data.data)
        if (res.data.status==200){ 
            console.log('userInformation', res);
              wx.hideLoading(); //授权成功之后关闭 提示
              wx.setStorageSync("userInformation", res.data.data.bussData);//把用户信息保存到本地
              wx.showToast({
                title: '登录成功',
                icon: 'none'
              })
              setTimeout(()=>{
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
              },1500)
        }
      }).catch(err => {
        console.log(err);
        wx.hideLoading()
        if (err.status == 500) {
          wx.hideLoading()
          console.log(`登录接口 500错误`)
          wx.showModal({
            title: '登陆失败',
            content: `服务器繁忙，请稍后重试`,
            confirmText: '知道了',
            success: function (res) { }
          });
        } else if (err.errMsg == 'request:fail timeout'){
          console.log(`登录接口 请求超时错误`)
          wx.showModal({
            title: '登陆超时',
            content: `请稍后重试`,
            confirmText: '知道了',
            success: function (res) {}
          });
        }

      })
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
    this.isSessionId();
  },
  isSessionId(){ 
    const that = this;
    const sessionId = wx.getStorageSync('sessionId');
    if(typeof sessionId == 'string' && sessionId.length >= 1) {
        console.log('已经授权 sessionId已经存在') 
          //授权成功挑转首页
          wx.switchTab({
            url: '/pages/index/index',
          })
    }else{

      wxapi.getSetting().then(settingRes=>{
        if (settingRes.authSetting['scope.userInfo'] === true){
              that.lginInfo()
        }
        return Promise.reject('未授权!');
      }).catch(err=>{ 
        console.log(err)
      })
    }
},

//授权成功但是 登陆失败进人这里
lginInfo(){
  var that = this;
  wx.showLoading({
    title: '登录中',
    mask:true
  })
  wxapi.login().then(res=>{
    console.log(res)
    var code = res.code;
    console.log('1--授权成功,登陆失败获取获取code--' + res.code);
    that.setData({
      code: res.code
    })
    /* 去获取精度维度*/ 
    return wxapi.getLocation('gcj02');
  }).then(res => {
    console.log(res)
    that.setData({
      latitude: res.latitude,
      longitude: res.longitude
    })

    /*去请求用户信息*/
    return wxapi.userInfo();
  }).then(res => {
    console.log('2--授权成功,登陆失败获取用户信息', res);
    const data = {
      avatarUrl: res.userInfo.avatarUrl,
      code: that.data.code,
      nickname: res.userInfo.nickName,
      sex: res.userInfo.gender,
      latitude: that.data.latitude,
      longitude: that.data.longitude
    }
    return myapi.api_loin(data); //去请求登录
  }).then(res => {
    console.log('3--授权成功,登陆失败获取登陆成功信息', res);
    if (res.data.status == 200) {
      /* 授权成功 之后 把sessionId 保存在本都*/
        const sessionId = res.data.data
        wx.setStorageSync('sessionId', sessionId);
        return myapi.userInformation(sessionId)//获取用户信息
    }else{ 
      //登陆不成功 catch接收错误
      return Promise.reject(res.data) //不等200的返回
    }
  }).then(res=>{
    if (res.data.status == 200) {
      console.log('userInformation',res);
      wx.hideLoading(); //授权成功之后关闭 提示
      wx.setStorageSync("userInformation",res.data.data.bussData); //把用户信息保存到本地
      wx.showToast({
        title: '登录成功',
        icon: 'none'
      })
      setTimeout(() => {
        
        wx.switchTab({
          url: '/pages/index/index',
        })
      }, 1500)
    }
    return Promise.reject(res.data) //不等200的返回
  }).catch(err => {
    wx.hideLoading();
    console.log(err);
    if (err.errMsg == 'request:fail timeout') {
      wx.showModal({
        title: '登陆失败',
        content: `服务器繁忙，请稍后重试`,
        confirmText: '知道了',
        success: res => { }
      });

    } else if (err.status == 500) {
      wx.hideLoading()
      console.log(`请求500错误`, err)
      wx.showModal({
        title: '登陆失败',
        content: `服务器繁忙，请稍后重试`,
        confirmText: '知道了',
        success: function (res) { }
      });
    }
  })
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
    // return {
    //   path: '/pages/load/load',
    // }
  },

  // 获取用户信息
  bindgetuserinfo: function(e) {
    var that = this;

    if (e.detail.errMsg == "getUserInfo:ok") {

    }
  }
})