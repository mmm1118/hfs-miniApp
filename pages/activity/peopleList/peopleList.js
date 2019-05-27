//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '报名详情', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    // 报名人员列表
    peopleList: [{
        userImg: "/images/index/meizi01.png",
        name: "小林林",
        idNum: "123456",
        seatNumber: "12",
        buyTime: "2019/04/25"
      },
      {
        userImg: "/images/index/meizi01.png",
        name: "小林林",
        idNum: "123456",
        seatNumber: "12,15",
        buyTime: "2019/04/25"
      },
      {
        userImg: "/images/index/meizi01.png",
        name: "小林林",
        idNum: "123456",
        seatNumber: "12",
        buyTime: "2019/04/25"
      },
      {
        userImg: "/images/index/meizi01.png",
        name: "小林林",
        idNum: "123456",
        seatNumber: "12",
        buyTime: "2019/04/25"
      },
      {
        userImg: "/images/index/meizi01.png",
        name: "小林林",
        idNum: "123456",
        seatNumber: "12,18",
        buyTime: "2019/04/25"
      }
    ]
  },
  // 去座位表页面
  toSeatMap(e){
    wx.navigateTo({
      url: '/pages/activity/seatMap/seatMap',
    })
  },
  // 去客户中心
  toUserCenter(e){
    wx.navigateTo({
      url: '/pages/activity/seatMap/seatMap',
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