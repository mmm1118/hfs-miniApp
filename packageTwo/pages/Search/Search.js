const {circleFetch} = require("./../../../server/index");

// packageTwo/pages/Search/Search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleData: [],
    pageIndex: 1,
    hasMore: true,
    text_val: ''
  },
  secrch_font() {
    console.log('1')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {fetch} = options
    fetch ? this._renderCircleData(fetch) : null
  },

  input_val(val) {
    const {value} = val.detail
    if (!value) return
    this.setData({
      circleData: []
    })
    // let timer = null;
    // if (timer) clearTimeout(timer)
    // timer = setTimeout(() => {
    this._renderCircleData('_findCircleClassAuthByPage', value)
    // }, 1000)
  },
  _renderCircleData(fetchUrl, name) {
    const params = {
      circleName: name || '',
      pageIndex: this.data.pageIndex,
      pageSize: 15
    }
    circleFetch[fetchUrl](params).then(res => {
      if (res.pageCount === this.data.pageIndex) {
        this.setData({
          hasMore: false
        })
      } else {
        this.setData({
          circleData: [...this.data.circleData, ...res.bussData]
        })
      }

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
    if (this.data.hasMore) {
      this.data.pageIndex++
      this._renderCircleData()
    } else {
      console.log('no more')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
