// pages/activity/seatMap/seatMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 座位列表
    seatList: [],

  },
  // 点击座位
  clickSeat(e) {
    // 跳转个人中心

    // 选中座位

    // 取消选中

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 处理轮播图数据分页
    var catList = [],
      temCount = Math.ceil([...Array(160)].length / 100);
    for (var i = 0; i < temCount; i++) {
      catList.push([...Array(100 * temCount)].slice(i * 100, (i + 1) * 100))
    }
    that.setData({
      seatList: catList
    })
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

  }
})