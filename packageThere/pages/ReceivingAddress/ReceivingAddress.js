const { myapi, wxapi } = require('./../../../server/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bussData:''
  },
  //选择地址
  tabChoice(e){
    const that=this;
    const listData = this.data.bussData;
    console.log(e.currentTarget.dataset.index)
    listData.forEach((val,index)=>{ 
      if (index == e.currentTarget.dataset.index){ 
            wx.setStorageSync('adderlist', val);
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var active = options.active;
    
    this.setData({ 
      active:active
    })
  
  },
  selectAlladder(sessionId){ 
    const that=this;
    myapi.selectAlladder(sessionId).then(res=>{
      if (res.statusCode == 200 || res.data.data.status==200){
            that.setData({ 
              bussData: res.data.data.bussData
            })
      }
    }).catch(err=>{
        console.log(err)
    })
  },
  sideslip(e) {
    const listData = this.data.bussData;
    console.log(listData)
    /* 侧滑出下一个 关闭上一个*/
    listData.forEach((val, index) => {
      if (val.offset == true) {
        val.offset = false
      }
    })

    this.setData({
      bussData: listData
    })

    /* 思路 通过改变数据的 listVal true 和false 来判断是否显示删除  后台返回了一个默认的参数listVal=false 删除按钮是不显示 
      我滑动谁获取谁的索引，用请求的数据循环for for循环的中的索引等于滑动的索引，就获取那一条数据，然后，滑动大于0就是listVal=fale 不显示滑动listVal=true 显示按钮
      反之小于0 
      */
    const that = this;
    const i = e.detail.i;//滑动组件内部返回的索引
    wx.stopPullDownRefresh()//上拉的时候禁止界面刷新
    listData.forEach((val, index) => {
      if (i == index) {
        if (e.detail.txVal > 0) {
          val.offset = false;
          console.log('我是向右滑动的')
        } else if (e.detail.txVal < 0) {
          val.offset = true;
          console.log('我是向左滑动的')
        }
      }
    })
    console.log(listData);
    that.setData({
      bussData: listData
    })

  },
/* 地址删除 */
adder_btn(e){
  console.log(e.currentTarget.dataset.id);
  const that=this;
  const listData = this.data.bussData;
  const sessionId = that.data.sessionId;
  const id = e.currentTarget.dataset.id;
  const index = e.currentTarget.dataset.index;
  myapi.addressDelete(sessionId,id).then(res=>{
    let data=res.data;
    wx.showModal({
      title: '删除地址',
      content: '确定要删除地址吗？',
      success(res) {

        if (res.confirm) {
            wx.showLoading({
              title: '删除中', 


              mask: true
            })
          if (data.status == 200) {
            listData.splice(index,1)
            that.setData({
              bussData: listData
            })

            wx.hideLoading()
            wx.showToast({
              title: '删除成功',
              icon: 'none'
            })
          }else{ 
            wx.hideLoading();
            wx.showToast({
              title: '删除地址失败,请稍后再试',
              icon:'none'
            })
          }

        } else if (res.cancel) {

          wx.hideLoading()

        }
      }
    })

  }).catch(err=>{
    wx.hideLoading()
    wx.showToast({
      title: '删除失败,请稍后再试',
      icon:'none'
    })
    console.log(err);
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
    const sessionId = wx.getStorageSync('sessionId');
    const that = this;
    that.setData({
      sessionId: sessionId
    })

    //查询用户所有的地址 
    that.selectAlladder(sessionId)
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