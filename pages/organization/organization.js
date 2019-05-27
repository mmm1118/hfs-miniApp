const { recom, wxapi } = require('./../../server/index.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 服务器地址
    serverIp: app.globalData.serverIp,

    // 形制列表
    xingzhiList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('dasfaf');
    // wx.request({
    //   url: that.data.serverIp + 'common/getShetuanList',
    //   success: function (res) {
    //     console.log(res)
    //     if (res.data.code == 0) {
    //       that.setData({
    //         xingzhiList: res.data.data
    //       });
    //     }
    //   }
    // })
  },
  initRender: function() {

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
    return {
      path: '/pages/load/load?uid=' + wx.getStorageSync('userInfo').userId
    }
  },

  // 动态搜索社团
  searchFriends: function (e) {
    var that = this;

    wx.request({
      url: that.data.serverIp + "common/getShetuan",
      data: {
        topicName: e.detail.value,
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            xingzhiList: res.data.data
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求超时',
          image: '/images/index/unhappy.png',
          mask: true,
          duration: 1500
        })
      }
    })
  },

  // 跳转到话题页面
  toTopic: function (e) {
    wx.navigateTo({
      url: '/pages/circleIndex/circleIndex',
    })
  }
})