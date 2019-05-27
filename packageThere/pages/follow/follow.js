const { myapi, wxapi } = require('./../../../server/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 100,
    bussData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const userid = options.userid || 10000031;
    const sessionId = wx.getStorageSync('sessionId');
    this.setData({
      sessionId: sessionId,
      options: options
    })

    that.selectFollowByPage(sessionId, userid)
  },
  selectFollowByPage(sessionId, userid){
    const that = this;
    const data = {
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize,
      userId: userid
    }

    myapi.selectFollowByPage(sessionId,data).then(res=>{
      console.log(res)
      if (res.data.status == 200) {
        console.log(res.data.data.bussData)
        if (res.data.data.bussData == '') {
          console.log('无数据')
          return false;
        }
        that.setData({
          bussData: res.data.data.bussData
        })
      }
  
    }).catch(err=>{
        console.log(err)
    })
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