// packageTwo/pages/Grade/Grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    datalist:['一级会员','二级会员','三级会员'],
    addName:false,
    identityis:false,
    datalistLength:''
  },
  rank_tap(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.setData({ 
      datalistLength: this.data.datalist.length
    })
    console.log(this.data.datalist.length)
  },
  //编辑身会员等级
  tapIndex(e){
    //点击谁清除掉谁
    const that=this;
    console.log(e.currentTarget.dataset.index);

    const index = e.currentTarget.dataset.index;
    const datalist = this.data.datalist;
          datalist.splice(index, 1);
            that.setData({ 
              datalist: datalist,
              datalistLength: datalist.length
            })
    
  },
  addnameshow(){
    const that=this;
    this.setData({ 
      addName: !this.data.addName
    })
  },
  add_succes(){
    const that = this;
    this.setData({
      addName: !this.data.addName
    })
  },
  add_fail(){
    const that = this;
    this.setData({
      addName: !this.data.addName
    })
  },

   //编辑会员身份
  addidentityis(){
    const that = this;
    this.setData({
      identityis: !this.data.identityis
    })
  },
  add_identity() {
    const that = this;
    this.setData({
      identityis: !this.data.identityis
    })
  },
  fail_identity() {
    const that = this;
    this.setData({
      identityis: !this.data.identityis
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