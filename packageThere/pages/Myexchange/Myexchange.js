const { myapi, wxapi } = require('./../../../server/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    pageSize:5,
    txVal:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sessionId = wx.getStorageSync('sessionId');
    const that = this;
    this.setData({
      sessionId: sessionId
    })

      //查询兑换
      that.findOrdersByPage()
  },
  findOrdersByPage(){
    const that=this;
    const sessionId = that.data.sessionId;
    let data={
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize,
      topicname: ""
    };

    myapi.findOrdersByPage(sessionId,data).then(res=>{
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
  sideslip(e) {

    let bussData = this.data.bussData;
    /* 侧滑出下一个 关闭上一个*/
    bussData.forEach((val, index) => {
      if (val.offset == true) {
        val.offset = false
      }
    })

    this.setData({
      bussDataList: bussData
    })

    /* 思路 通过改变数据的 listVal true 和false 来判断是否显示删除  后台返回了一个默认的参数listVal=false 删除按钮是不显示 
      我滑动谁获取谁的索引，用请求的数据循环for for循环的中的索引等于滑动的索引，就获取那一条数据，然后，滑动大于0就是listVal=fale 不显示滑动listVal=true 显示按钮
      反之小于0 
      */
    const that = this;
    const i = e.detail.i;//滑动组件内部返回的索引
      console.log('------',i)
    wx.stopPullDownRefresh()//上拉的时候禁止界面刷新
    bussData.forEach((val, index) => {
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
    console.log(bussData);
    that.setData({
      bussData: bussData
    })
  },
  tab_remove(e){
    const that=this;
    let ordersid = e.currentTarget.dataset.ordersid;
    let bussData = this.data.bussData;
    let indexRemove = e.currentTarget.dataset.remove;
    const sessionId = that.data.sessionId;

    wx.showModal({
      title: '删除订单',
      content: '确定删除该订单吗?',
      confirmColor: '#32CD32',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title:'删除中',
            mask:true
          })
            myapi.updateShow(sessionId, ordersid).then(res => {
              console.log(res)
              if (res.statusCode == 200 || res.data.status == 200) {

                //请求成功删除界面上的帖子
                bussData.forEach((val, index) => {
                  console.log(index)
                  if (index == indexRemove) {
                    that.data.bussData.splice(bussData[index], 1);
                    val.listVal = false;
                  }
                })

                that.setData({
                  bussData: bussData
                })
            wx.hideLoading()
              wx.showToast({
                title: '删除成功',
                icon:'none'
              })
            
              }
            }).catch(err => {
              wx.hideLoading()
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              })
            })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  


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
    const that = this;
   
    wx.showLoading({
      title: '刷新中',
      mask: true
    })
   
    const sessionId = that.data.sessionId;
   
    let data = {
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize,
      topicname: ""
    };

    myapi.findOrdersByPage(sessionId, data).then(res => {
      console.log(res.data)
      if (res.data.status == 200) {
        that.setData({
          bussData: res.data.data.bussData
        })
        setTimeout(()=>{
          wx.hideLoading()
        },3000)
      }
    }).catch(err => {
      console.log(err)
    })
  },

  onReachBottom: function () {
    const that=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    const sessionId = this.data.sessionId;
    let data = {
      pageIndex: ++that.data.pageIndex,
      pageSize: that.data.pageSize,
      topicname: ""
    };

    myapi.findOrdersByPage(sessionId,data).then(res => {
      wx.stopPullDownRefresh() //上拉的时候禁止下拉动作
      if (res.data.status == 200) {
        if (res.data.data.bussData.length == 0) {
          wx.hideLoading(); 
          wx.showToast({ title: '没有更多数据了', icon: 'none' })
          return false;
        }

        wx.hideLoading()
        /*concat 数组拼接 */
        that.setData({
          bussData:that.data.bussData.concat(res.data.data.bussData)
        })

      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})