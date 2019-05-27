const {circleFetch} = require("./../../../server/index"); /* 全局域名*/
// packageTwo/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    detailData: null,
    userCircleDTOs: null,
    userCircleDTOsLen: null,
    addCircleText: '',
    classid: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setNavigationBarTitle(options.name);
    this.setData({
      classid: options.classid
    })
    this._selectCircleClassDetail(options.classid)
  },

  _selectCircleClassDetail(classid) {
    const params = {classid}
    circleFetch._selectCircleClassDetail(params).then(res => {
      const data = res.bussData.userCircleDTOs
      this.setData({
        detailData: res.bussData,
        userCircleDTOs: data.splice(0, 3),
        userCircleDTOsLen: res.bussData.userCircleDTOs.length
      })
    })
  },

  setNavigationBarTitle(title) {
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  _addCircle() {
    if (this.data.detailData.limits) {
      const params = {
        classid: this.data.classid
      }
      circleFetch._addUserCircle(params).then(res => {
        console.log(res)
        // wx.navigateTo({
        //   url: '/packageTwo/pages/ThirdPartyCircle/ThirdPartyCircle',
        // })
      })
      wx.navigateTo({
        url: '/packageTwo/pages/ThirdPartyCircle/ThirdPartyCircle',
      })
    } else {
      this.setData({
        show: true
      })
    }
  },
  _setAddCircleText(val) {
    const {value} = val.detail
    console.log(value)
    this.setData({addCircleText: value})
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
    const params = {
      applyMessage: this.data.addCircleText,
      classid: this.data.classid,
      id: '',
    }
    circleFetch._saveCircleJoinapply(params).then(res => {
      console.log(res)
      wx.navigateTo({
        url: '/packageTwo/pages/ThirdPartyCircle/ThirdPartyCircle',
      })
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
