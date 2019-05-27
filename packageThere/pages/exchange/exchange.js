const { myapi, wxapi } = require('./../../../server/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const sessionId = wx.getStorageSync('sessionId');
    const that = this;
    this.setData({
      sessionId: sessionId
    })
    //查询商品
    that.findGoodsByPage()
  },
  //查询商品
  findGoodsByPage() {
    const that = this;
    const sessionId = that.data.sessionId;
    const data = {
      goodsname: '',
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize
    }
    console.log(data);
    myapi.findGoodsByPage(sessionId, data).then(res => {
      if (res.data.status == 200) {
        console.log(res.data.data.bussData)
        that.setData({
          pirceList: res.data.data.bussData
        })
      }

    }).catch(err => {
      console.log(err)
    })
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