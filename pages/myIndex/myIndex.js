const {myapi,wxapi}=require('./../../server/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    txVal:false,
    listVal:false,
    sessionId:'',
    bussData:'',
    bussDataList:[],
    indexs:1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     const that=this;
  },
  onTouchGesture(e) {
    console.log(e);
    if (e.detail.txVal > 0) {
      this.setData({
        txVal: false
      })
      console.log('我是向右滑动的')
    } else if (e.detail.txVal < 0) {
      this.setData({
        txVal: true
      })
      console.log('我是向左滑动的')
    }
  },
  cat_remove(e){
    console.log(e)
    console.log('删除按钮')
  },
  sideslip(e){

    const listData = this.data.bussDataList;
    /* 侧滑出下一个 关闭上一个*/
    listData.forEach((val, index)=>{
      if (val.listVal==true){ 
        val.listVal = false
      }
    })

    this.setData({
      bussDataList: listData
    })

    /* 思路 通过改变数据的 listVal true 和false 来判断是否显示删除  后台返回了一个默认的参数listVal=false 删除按钮是不显示 
      我滑动谁获取谁的索引，用请求的数据循环for for循环的中的索引等于滑动的索引，就获取那一条数据，然后，滑动大于0就是listVal=fale 不显示滑动listVal=true 显示按钮
      反之小于0 
      */
    const that=this;
    const i = e.detail.i;//滑动组件内部返回的索引
    wx.stopPullDownRefresh()//上拉的时候禁止界面刷新
    listData.forEach((val,index)=>{ 
        if(i==index){
          if (e.detail.txVal > 0){
              val.listVal=false;
            console.log('我是向右滑动的')
          } else if (e.detail.txVal < 0) {
              val.listVal = true;
            console.log('我是向左滑动的')
          } 
        }
    })
    console.log(listData);
    that.setData({
      bussDataList:listData
    })
    console.log(this.data.bussDataList)

  },
  /* 拉人黑名单 */
  blacklist(){
    const that=this;
    wx.showModal({
      title: '加人黑名单',
      content: '加入黑名单后，对方无法向你发送私信,也无法评论你的帖子',
      confirmColor: '#32CD32',
      success(res){
        if (res.confirm) {
            console.log('用户点击确定')
        }if(res.cancel){
          const listData = that.data.bussDataList;
          /* 点击取消隐藏 删除*/
          listData.forEach((val, index) => {
            if (val.listVal == true) {
              val.listVal = false
            }
          })
          that.setData({
            bussDataList: listData
          })
        }
      } 
    })
  },
//侧滑删除按钮
  listRemove(e){ 
    console.log(e)
    const that=this;
    const listData =that.data.bussDataList;
    const sessionId = that.data.sessionId;
    const dynamicId = e.currentTarget.dataset.dynamicId;
    const id = e.currentTarget.dataset.id;
    const indexRemove =e.currentTarget.dataset.remove;
    const at = e.currentTarget.dataset.at;//type 类型
    const data_dynamicId = { dynamicId: dynamicId}; //删除动态 data 集合 
    const data_id = { atid:id};//删除@ data 集合
   
    wx.showModal({
      title: '删除消息',
      content: '确定删该除消息吗?',
      confirmColor:'#32CD32',
      success(res) {
        if (res.confirm) {
           if(at==2){
              console.log('@ 艾特 2')
              myapi.deleteUserAt(sessionId,data_id).then(res => {
                console.log(res);
              }).catch(err => {
                console.log(err);
              })
            }else if(at == 3){
             console.log('动态消息 3')
             myapi.dynamicIddelete(sessionId, data_dynamicId).then(res => {
               console.log(res)
               if (res.data.status == 200) {
                 console.log('请求成功删除界面上的帖子')
                 //请求成功删除界面上的帖子
                 listData.forEach((val, index) => {
                   console.log(index)
                   if (index == indexRemove) {
                     that.data.bussDataList.splice(listData[index], 1);
                     val.listVal = false;
                   }
                 })
                 that.setData({
                   bussDataList: listData
                 })
               } 
               return Promise.reject(res)
             }).catch(err => {
               console.log(err)
               if (err.status==500){ 
                 wx.showToast({
                   title:res.msg,
                   icon:'none'
                 })
               }
             })
          }
        } else if (res.cancel) {
          const listData = that.data.bussDataList;
          /* 点击取消隐藏*/
          listData.forEach((val, index) => {
            if (val.listVal == true) {
              val.listVal = false
            }
          })
          that.setData({
            bussDataList: listData
          })
        }
      }
    })
  },
  
//删除at用户
  deleteUserAt(sessionId, data){
    console.log(sessionId + '---' + data);
    const that=this;
    myapi.deleteUserAt(sessionId,data).then(res=>{ 
      console.log(res);
    }).then(err=>{ 
      console.log(err);
    })
  },  
  //删除有类型，没有内容的接口 
  dynamicIddelete(){

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
    const that=this;
    const sessionId = wx.getStorageSync('sessionId');
    const userInformation = wx.getStorageSync('userInformation')
    that.setData({
      sessionId: sessionId,
      bussData: userInformation
    })
    that.getData(sessionId);
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
  /*获取数据*/
  getData(sessionId){
    const that=this;
    var data={
      pageIndex:that.data.indexs,
      pageSize: 5
    };

    myapi.getuserhomeL(sessionId, data).then(res => {
      console.log(res)
      // wx.stopPullDownRefresh() //上拉的时候禁止界面刷新
      if (res.statusCode == 200 || res.data.status == 200){
              /*concat 数组拼接 */
              that.setData({
                bussDataList:that.data.bussDataList.concat(res.data.data.bussData.list)
              })  
        }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
      wx.showLoading({
        title: "加载中..."
      });
      const that = this;
    var sessionId = that.data.sessionId;
    const data = {
            pageIndex: 1,
            pageSize: 4
      }
      
      myapi.getuserhomeL(sessionId, data).then(res => {
        console.log(res.data.data.bussData.list);
        if (res.statusCode == 200 || res.data.status==200){
            wx.hideLoading();
            that.setData({ 
              bussDataList: res.data.data.bussData.list,
              indexs:1
            })
        }  
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that=this;
    wx.showLoading({
      title:'加载中',
      mask:true
    })

    const sessionId = this.data.sessionId;
    var data = {
      pageIndex: ++that.data.indexs,
      pageSize: 5
    };
    myapi.getuserhomeL(sessionId, data).then(res => {
      wx.stopPullDownRefresh() //上拉的时候禁止下拉动作
      console.log(res.data.data.bussData.list);
      if (res.statusCode == 200 ) {
        if (res.data.data.bussData.list.length == 0) {
          wx.hideLoading(); wx.showToast({ title: '没有更多数据了', icon: 'none' })
          return false;
        }
        wx.hideLoading()
        /*concat 数组拼接 */
        that.setData({
          bussDataList: that.data.bussDataList.concat(res.data.data.bussData.list)
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