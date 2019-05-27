// packageThere/pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    item: ['微信好友', '朋友圈', '编辑', '删除'],
    offset: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  uppater() {
    //自定义点击事件
    this.setData({
      show: !this.data.show
    })
  },
  onSort(val) {
    //接受自定义取消事件
    console.log(val.detail);
    this.setData({
      show: !val.detail
    })
  },

  show_hidemack() {
    console.log('123')
    this.setData({
      offset: !this.data.offset
    })
  },
  onmack(val) {
    //接受点击模板消失事件
    this.setData({
      show: !val.detail
    })
  },
  topone0(val) {
    //接收点击的自定义事件
    console.log('触发1111--------' + val)
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