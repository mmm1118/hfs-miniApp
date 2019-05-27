const {circleFetch} = require("./../../../server/index"); /* 全局域名*/
// packageTwo/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    detailData: null,
    noticeText:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.classid)
    // this._selectCircleClassDetail(options.classid)
  },

  _sendNotice(classid) {
    const params = {classid}
    circleFetch._sendNotice(params).then(res => {
      console.log(res)
    })
  },

  input_val(v) {
    const {value} = val.detail
    console.log(value)
    if (!value) return
    this.setData({
      noticeText:value
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
