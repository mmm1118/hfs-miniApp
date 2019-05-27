const { myapi, wxapi } = require('./../../../server/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flug:1,
    ismack:false,
    pageIndex:1,
    pageSize:2,
    condition:'D',
    listData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const sessionId = wx.getStorageSync('sessionId');
    that.setData({ 
      sessionId:sessionId
    })

    that.getgiftdatelist(sessionId, 'D');

  },

//初始日数据 和 月数据 
  getgiftdatelist(sessionId, condition){
    const that = this;
    const data = {
      condition:condition,
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize,
    }
    myapi.getgiftdatelist(sessionId, data).then(res => {
      console.log(res.data.data.bussData.list[0]);
      if (res.data.status==200){ 
        that.setData({ 
          listData:res.data.data.bussData.list[0]
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },

  tap_active(e){
    const that=this;
    const sessionId = that.data.sessionId;

    if (e.currentTarget.dataset.index==0){
      console.log('0');
      that.getgiftdatelist(sessionId, 'D');
      that.setData({
        flug: e.currentTarget.dataset.index,
        pageIndex: 1
      })
    


    } else if (e.currentTarget.dataset.index == 1){ 

      that.getgiftdatelist(sessionId, 'M');
      that.setData({
        flug: e.currentTarget.dataset.index,
        pageIndex: 1
      })
    }


  },
  isMack(e){ 
    const that=this;
    let listData = that.data.listData;
    let index = e.currentTarget.dataset.index;
    let sessionId = that.data.sessionId;
    let presenterId = e.currentTarget.dataset.presenterid;
    console.log(presenterId)

  //获取当前月
    var date = new Date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    console.log(month)


    const data={
      pageIndex:1,
      pageSize:100,
      presenterId: presenterId,
      theMonth: month
    }

    myapi.getgiftmonthinfopage(sessionId,data).then(res=>{
      if (res.data.status==200){ 
        console.log(res.data.data.bussData);
        that.setData({ 
          listZs: res.data.data.bussData.list
        })
      }
    }).catch(err=>{ 
      console.log(err)
    })


    listData.forEach((val,index)=>{ 
      if (index == e.currentTarget.dataset.index){
          val.offset = !val.offset;
      }
    }) 

    that.setData({ 
      listData: listData,
     
    })

    console.log(that.data.ismack)

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

    wx.showLoading({
      title: '加载中',
      mask: true
    })

    const that = this;
    const sessionId = that.data.sessionId;
    const data = {
      condition: condition,
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize,
    }

    myapi.getgiftdatelist(sessionId, data).then(res => {
      console.log(res.data.data.bussData.list[0]);
      if (res.data.status == 200) {

          if (res.data.data.bussData.list[0].length == 0) {
            wx.hideLoading(); wx.showToast({ title: '没有更多数据了', icon: 'none' })
            return false;
          }

          that.setData({
            listData: that.data.bussData.concat(res.data.data.bussData.list[0])
          })
      }
    }).catch(err => {
      console.log(err);
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})