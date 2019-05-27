// packageTwo/pages/circleSetup/circleSetup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { name: 'USA', value: '公开', checked: 'true', text:'任何人都能加入圈子，无需审核'},
      { name: 'CHN', value: '隐私', text:'加入圈子必须提交申请等待圈主审核'},
    ],
    against:false
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  against(){
      this.setData({ 
        against:!this.data.against 
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