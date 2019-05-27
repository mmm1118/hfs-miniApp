// packageTwo/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  show() {
    const that = this;
    that.setData({
      show: true
    })
  },
  mk() {
    //阻止默认冒泡事件
  },
  onSort(val) {
    console.log(val);
    const that = this;
    that.setData({
      show: !val
    })
  },
  cancel() {
    const that = this;
    //点击蒙版取消
    that.setData({
      show: !that.data.show
    })
  },
  NextStep() {
    const that = this;
    //点击蒙版取消
    that.setData({
      show: !that.data.show
    })
  },
  remove_cancel() {
    const that = this;
    //点击蒙版取消
    that.setData({
      show: false
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