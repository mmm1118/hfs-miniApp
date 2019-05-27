const {circleFetch} = require("./../../server/index"); /* 全局域名*/
// const yellow = require('./../../images/circle_img/brgihtyellow.png')

// pages/circleIndex/circleIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circledata: [],
    flng: false,
    is_flng: false,
    text_val: '输入圈子名称，15个汉字以内',
    circleClassAuth: [],
    circleClassNoAuth: [],
    authIcon: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._findCircleClassAuthByPage()
    this._findCircleClassNoAuthByPage()
    this._selectFollowCircleClass()
  },


  _selectFollowCircleClass() {
    circleFetch._selectFollowCircleClass({}).then(res => {
      console.log(res)
      this.setData({
        circledata: res.bussData
      })
    })
  },
  _findCircleClassAuthByPage() {
    const params = {
      circleName: '',
      pageIndex: 1,
      pageSize: 3
    }
    circleFetch._findCircleClassAuthByPage(params).then(res => {
      console.log(res)
      this.setData({
        circleClassAuth: res.bussData
      })
    })
  },

  _findCircleClassNoAuthByPage() {
    const params = {
      circleName: '',
      pageIndex: 1,
      pageSize: 3
    }
    circleFetch._findCircleClassNoAuthByPage(params).then(res => {
      console.log(res)
      this.setData({
        circleClassNoAuth: res.bussData
      })
    })

  },

  _handleMore(e) {
    const fetch = e.currentTarget.dataset.fetch
    wx.navigateTo({
      url: `./../../packageTwo/pages/Search/Search?fetch=${fetch}`
    })
  },

  input_val(val) {
    console.log(val.detail.value)
    const that = this;
    that.setData({
      text_val: val.detail.value
    })
  },
  Eject() {
    const that = this;
    that.setData({
      is_flng: !that.data.is_flng
    })
  },
  cancel() {
    const that = this;
    //点击蒙版取消
    that.setData({
      is_flng: !that.data.is_flng
    })
  },
  NextStep() {
    //弹窗下一步的操作
    const that = this;
    console.log(that.data.text_val)

    if (that.data.text_val == "") {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none'
      })
      return false;
    }
    const page = `/packageTwo/pages/Threecircles/Threecircles?text_val=${that.data.text_val}`
    const params = {
      circleName: that.data.text_val,
      page
    }
    circleFetch._addCircleClass(params).then(res => {
      that.setData({
        is_flng: !that.data.is_flng
      })
      wx.navigateTo({
        url: `/packageTwo/pages/Threecircles/Threecircles?text_val=${that.data.text_val}`,
      })
    })

  },
  tocircleDetail(e) {
    const {circlename,classid} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/packageTwo/pages/Threecircles/Threecircles?text_val=${circlename}&classid=${classid}`
    })
  },
  mk() {
    //阻止默认冒泡事件
  },
  onSort(val) {
    console.log(val);
    const that = this;
    that.setData({
      is_flng: !val
    })
  },
  focus() {
    wx.navigateTo({
      url: './../../packageTwo/pages/Search/Search',
    })
  },
  ismack() {
    const that = this;
    that.setData({
      flng: !this.data.flng
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
    // this.onLoad()
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
