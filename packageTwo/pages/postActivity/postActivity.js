// packageTwo/pages/postActivity/postActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movableAreaData: [{
      type: 'image'
    }, {
      type: 'text'
    }, {
      type: 'video'
    }, {
      type: 'vote'
    }, {
      type: 'file'
    }, {
      type: 'record'
    }],

    // 是否显示操作面板
    showDialog: false

  },
  // 移动事件
  onChange(e) {
    console.log(e)
  },
  // 点击添加弹出操作面板
  showDialog(e) {
    this.setData({
      showDialog: true
    })
  },
  // 隐藏操作面板
  hiddenDialog(e) {
    this.setData({
      showDialog: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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