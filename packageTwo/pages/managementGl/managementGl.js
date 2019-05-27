// packageTwo/pages/managementGl/managementGl.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false, 
    arraydata:['请选择你要日认证的身份','社会公益团/院校社团','政府已登记社团组织','公司/个体商户']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  Authentication(){
    const that=this;
    this.setData({ 
      show: !this.data.show
    })
  },
  //点击弹出窗取消 
  onmack(e){
    this.setData({ 
      show: !e.detail
    })

  },
  topone1(e) {
    console.log(e);
    this.setData({
      show:!this.data.show
    })
    wx.navigateTo({
      url: './../../../packageTwo/pages/Socialattestation/Socialattestation',
    })
    console.log('社会公益团/院校社团')
  },
  topone2() {
    wx.navigateTo({
      url: './../../../packageTwo/pages/Indcertification/Indcertification',
    })
    this.setData({
      show: !this.data.show
    })
    console.log('政府已登记社团组织')
  },
  topone3() {
    wx.navigateTo({
      url: './../../../packageTwo/pages/IndAuthen/IndAuthen',
    })
    this.setData({
      show: !this.data.show
    })
    console.log('公司/个体商户')
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