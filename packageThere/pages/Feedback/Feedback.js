const { myapi } = require('./../../../server/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  in_title(e){
    const that=this;
    that.setData({ 
      title: e.detail.value
    })

  },
  textval(e){
    const that = this;
    that.setData({
      text: e.detail.value
    })

  },
  submission(){
    wx.showLoading({
      title: '提交成功',
      mask:true
    })

    const that=this;
    const sessionId = wx.getStorageSync('sessionId');
    const data={ 
      channel:'H5' ,
      content:that.data.text,
      linkman:that.data.nickname,
      linkmanType: '13507404693', //写死的，需要后台协作 获得手机号码
      title: that.data.title
    }
    myapi.insertback(sessionId,data).then(res=>{
    
      if (res.data.status==200){ 
          wx.hideLoading()
          that.setData({ 
            titles:'',
            texts:''
          })
          wx.showToast({
            title: '提交成功',
          })
        console.log(res.data)
      }
    }).catch(err=>{
      wx.showToast({
        title: '提交失败，稍后再试',
      }) 
      wx.hideLoading()
     
    })

    // wx.showModal({
    //   title: '提交成功',
    //   content: '感谢您的支持,我们会越做越好',
    //   showCancel:false,
    //   success(res) {
    //     if (res.confirm){
    //       console.log('用户点击确定')
    //     }
    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInformation = wx.getStorageSync('userInformation')
    console.log(userInformation.nickname)
    this.setData({
      nickname: userInformation.nickname
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})