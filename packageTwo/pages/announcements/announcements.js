const {circleFetch} = require("./../../../server/index");

// packageTwo/pages/announcements/announcements.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    noticeData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._findByPage()
  },

  /**
   * 查询公告
   * @private
   */
  _findByPage() {
    const params = {
      "pageIndex": this.data.pageIndex,
      "pageSize": 15
    }
    circleFetch._findByPage(params).then(res => {
      this.setData({
        noticeData: res.bussData
      })
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
