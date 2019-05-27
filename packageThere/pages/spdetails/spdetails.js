const { myapi, wxapi } = require('./../../../server/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bussData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const that=this;
    const goodsid = options.goodsid || 33;
    const sessionId = wx.getStorageSync('sessionId');
    this.setData({
      sessionId: sessionId,
      goodsid: goodsid
    })

    //商品详情
    that.selectGoodsDetail()
  },
  selectGoodsDetail(){
    const that=this;
    const goodsid = that.data.goodsid;
    const sessionId = that.data.sessionId;
    myapi.selectGoodsDetail(sessionId,goodsid).then(res=>{
      console.log(res)
      if (res.statusCode == 200 || res.data.data.status==200){ 
            that.setData({ 
              bussData:res.data.data.bussData
            })
      }
    }).catch(err=>{ 
      console.log(err)
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