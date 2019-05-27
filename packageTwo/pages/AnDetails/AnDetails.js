const {circleFetch} = require("./../../../server/index");

// packageTwo/pages/AnDetails/AnDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeData:null
  },
  delect() {
    wx.showModal({
      title: '删除公告',
      content: '删除后不可恢复哦',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  edit() {
    wx.navigateTo({
      url: './../../../packageTwo/pages/Editorsnotice/Editorsnotice',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this._selectCircleNoticeDetail(options.noticeid)
  },


  /**
   * 查询公告
   * @private
   */
  _selectCircleNoticeDetail(id) {
    const params = {
      id
    }
    circleFetch._selectCircleNoticeDetail(params).then(res => {
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
