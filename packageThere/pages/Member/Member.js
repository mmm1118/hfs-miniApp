const {myapi}=require('./../../../server/index.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flng:true,
    icardlist:'',
    pcardlist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sessionId = wx.getStorageSync('sessionId')
    const that=this;

    /* 查询会员卡 */
    that.getclassvipcard(sessionId)

    /*查询纪念卡*/
    that.getsouvenircard(sessionId);

  },
  Refresh(e){
    const that=this;
    
    let pcardlist = that.data.pcardlist;
    let idis = e.currentTarget.dataset.id;
    pcardlist.forEach((val,index)=>{ 
        if (val.id == idis){ 
          val.offset = !val.offset
          }
    })

    that.setData({
      pcardlist: pcardlist
    })

  },
  //查询会员卡
  getclassvipcard(sessionId){
    const that=this;
    myapi.getclassvipcard(sessionId).then(res => {

      if (res.data.status==200){ 
        that.setData({ 
          pcardlist: res.data.data.bussData
        })
      }
      console.log('查询会员卡', res)
      console.log(res.data.data.bussData)
    }).catch(err => {
      console.log(err)
    })
  },
  //查询 纪念卡
  getsouvenircard(sessionId){
    const that = this;
    myapi.getsouvenircard(sessionId).then(res => {
      if (res.data.status == 200) {
        that.setData({ 
          icardlist: res.data.data.bussData
        })
      }

      console.log('查询纪念卡', res)
      console.log(res.data.data.bussData)
    }).catch(err => {
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