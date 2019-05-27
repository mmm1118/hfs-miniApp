//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我是动态的标题', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    // 是否关注
    whetherAtten: true,
    // 是否显示礼物列表
    showGift: false,
    // 礼物列表
    giftData: [...Array(20)],
    // 选中的索引
    checkedIndex: null,
    // 是否显示礼物数量列表
    showAmount: false,
    // 选中礼物后显示数量按钮
    checkedItem: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      // 获取是否是通过分享进入的小程序
      share: app.globalData.share,
      // 定义导航栏的高度   方便对齐
      height: app.globalData.height
    });
  },
  // 返回上一页面
  _navback() {
    wx.navigateBack()
  },
  //返回到首页
  _backhome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 去聊天页面
  toPrivate(e) {
    wx.navigateTo({
      url: '/pages/memorialIndex/webView/webView',
    })
  },
  // 显示礼物列表
  showGift(e) {
    this.setData({
      showGift: true
    })
  },
  // 显示礼物列表
  hiddenGift(e) {
    this.setData({
      showGift: false
    })
  },
  // 选中礼物
  checkedGift(e) {
    console.log(e)
    this.setData({
      checkedIndex: e.currentTarget.dataset.index,
      checkedItem: true
    })
  },
  // 选择礼物数量
  showAmount(e) {
    this.setData({
      showAmount: !this.data.showAmount
    })
  },
  // 点击赠送
  presentBtn(){
    wx.showModal({
      title: '汉服币不足',
      content: '您的汉服币不够啦，赶快去做任务赚取汉服币吧~',
      showCancel: false,
      confirmText: '确定',
      confirmColor: '#d61800',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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