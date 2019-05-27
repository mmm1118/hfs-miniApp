const { myapi } = require('./../../../server/index.js');

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    pageSize:5,
    listbussData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sessionId = wx.getStorageSync('sessionId')
    const that = this;

    that.setData({ 
      sessionId: sessionId
    })


    that.selectCollectionDynamicByPage(sessionId);
  },
  selectCollectionDynamicByPage(sessionId){
      const that=this;

    const data={
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize
    }
    myapi.selectCollectionDynamicByPage(sessionId,data).then(res=>{
        console.log(res)
        if (res.data.status==200){ 
            console.log(res.data.data.bussData)
            that.setData({ 
              listbussData:res.data.data.bussData
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