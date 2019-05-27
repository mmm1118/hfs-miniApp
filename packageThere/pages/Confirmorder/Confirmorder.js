const { myapi, wxapi } = require('./../../../server/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    adderlist:'',
    isNoAddress:false
  },
  //点击去选择地址
  address(){
    const that=this;
    wx.navigateTo({
     // url:'/packageThere/pages/ReceivingAddress/ReceivingAddress'
       url:'/packageThere/pages/address/address',
    })
  },
  //地址选择
  addresstwo(){
    wx.navigateTo({
       url:'/packageThere/pages/ReceivingAddress/ReceivingAddress?active=1'
    })
  },
//点击兑换
  wxApply(){
    wx.showLoading({
      title:'加载中支付中',
      mask:true
    })
    const that=this;
    const sessionId = that.data.sessionId;
    const goodsid=32;
    const data={ 
      addressId:2,
      goodsid:goodsid
    }

//调起支付
myapi.giftExchange(sessionId,data).then(res=>{
        console.log(res.data)
      if (res.data.status==200){ 
        console.log(res.data.data.bussData)
        const obj = res.data.data.bussData
        wx.hideLoading();
        return wxapi.requestPayment(obj)
      }else{ 
        return Promise.reject(res) 
      }
    }).then(res=>{

      console.log(res);
    }).catch(err=>{ 
      wx.hideLoading();
      console.log(err)
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sessionId = wx.getStorageSync('sessionId');
    const that = this;
    const goodsid = options.goodsid || 31;

    this.setData({
      sessionId: sessionId
    })

    //商品详情
    that.selectGoodsDetail(sessionId,goodsid);
  
  },
  //商品详情 
  selectGoodsDetail(sessionId, goodsid){
    const that=this;
    myapi.selectGoodsDetail(sessionId, goodsid).then(res=>{
        console.log(res.data)
      if (res.data.status==200){
        that.setData({
          bussData: res.data.data.bussData
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
    const adderlist = wx.getStorageSync('adderlist');
    const that=this;
    if (adderlist){
        console.log('1');
        
        that.setData({ 
          isNoAddress:true,
          adderlist: adderlist
        })

    }else{ 
        console.log('2');
        
        that.setData({
          isNoAddress: false
        })
    }
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