// packageTwo/pages/Groupdetails/Groupdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    txVal:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  addMember(){
    console.log('添加成功');

    wx.navigateTo({
      url: '/packageTwo/pages/addMember/addMember',
    })
  },
    /**
   * 监听-滑动手势
   */
  onTouchGesture(e) {
    console.log(e);
    if (e.detail.txVal>0){ 
      this.setData({
        txVal: false
      })
      console.log('我是向右滑动的')
    } else if (e.detail.txVal < 0){ 
        this.setData({ 
          txVal:true
        })
      console.log('我是向左滑动的')
    }

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