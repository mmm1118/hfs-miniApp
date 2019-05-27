const {myapi} = require('./../../../server/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:'',
    sessionId:''
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sessionId = wx.getStorageSync('sessionId')
    const userInformation = wx.getStorageSync('userInformation')

    const that = this;
    that.setData({
      sessionId: sessionId,
      openid: userInformation.openid
    })

    //将用户移除黑名单列表
    that.findBlackByPage(sessionId)

  },

  findBlackByPage(sessionId){
    const that=this;
    const data={ 
      openId: that.data.openid,
      pageIndex:1,
      pageSize:1000
    }
    myapi.findBlackByPage(sessionId,data).then(res=>{
      if (res.data.status==200){ 
        that.setData({
          listdata:res.data.data.bussData
        })
      } 

    
      console.log(res.data.data.bussData)

    }).catch(err=>{ 
      console.log(err)
    })
  },
  
  removename(e){
    const that=this;
    const sessionId = that.data.sessionId;
    const openid = e.currentTarget.dataset.openid;
    console.log(e.currentTarget.dataset.openid)
    wx.showModal({
      title: '移出黑名单',
      content: '移出黑名单，对方可以向你发送私信，可以评论你的贴子',
      success(res) {
        
          wx.showLoading({
            title:'移除中',
            mask:true
          })

        if (res.confirm) {
          myapi.removeBlackList(sessionId, openid).then(res=>{
            if (res.data.status==200){ 
              console.log(res)
              wx.hideLoading()
        
              that.findBlackByPage(that.data.sessionId)
              wx.showToast({
                title: '移除成功',
                icon: 'none'
              })
            }

           
          }).catch(err=>{
            wx.hideLoading()
            wx.showToast({
              title: '移除失败,请稍后再试',
              icon:'none'
            })   
            console.log(err)
          })

          console.log('用户点击确定')
        } else if (res.cancel) {
          wx.hideLoading()
          console.log('用户点击取消')
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})