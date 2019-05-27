const {myapi,wxapi} = require('./../../../server/index.js')
const { Monthyue } = require('./../../../utils/utiltwo.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionId:'',
    signInList: [
      { index: 0, num: "10", offset: false,time:''}, 
      { index: 0, num: "20", offset: false,time:''}, 
      { index: 0, num: "30", offset: false,time:''},  
      { index: 0, num: "40", offset: false,time:''}, 
      { index: 0, num: "50", offset: false,time:''},
      { index: 0, num: "60", offset: false,time: '',},
      { index: 0, num: "100",offset: false,time: ''},
      ],
    selectUserTask:'',
    numerical:0,
    comment:0,
    dynamic:0,
    sharenum:0,
    pageIndex:1,
    pageSize:6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(Monthyue)
      const sessionId = wx.getStorageSync('sessionId');
      const that=this;
      this.setData({ 
        sessionId: sessionId
      })

      //用户信息 
      that.userInformation();
      //查询签到
      that.selectSigninQd();
      //查询任务
      that.selectUserTask()
      //查询商品
      that.findGoodsByPage()

  },
 //用户信息 
  userInformation(){
    const that=this;
    myapi.userInformation(that.data.sessionId).then(res=>{
      if (res.statusCode == 200 || res.data.data.status==200){
        let baselist = res.data.data.bussData;
        that.setData({ 
          bussData: baselist
        })
      }
     }).catch(err=>{ 
        console.log(err)
    })
  },
//查询签到 
selectSigninQd(){
  const that=this;
  myapi.selectSigninQd(that.data.sessionId).then(res => {
    if (res.statusCode == 200){
      let datenum = res.data.data.bussData.datenum;
      let signInList = that.data.signInList;
      let dateslength = res.data.data.bussData.dates;

      for (let i = 0; i<datenum;i++){
        signInList[i].offset=true; 
        signInList[i].index=i;
        signInList[i].time = Monthyue(dateslength[i]); 
        if ((i+1) == datenum){
            signInList[i].time="今天"
        }
      } 

      that.setData({
        signInList: signInList
      })

    }
  }).catch(err => {
    console.log(err)
  })
},
//查询任务
selectUserTask(){
  const that=this;
  myapi.selectUserTask(that.data.sessionId).then(res=>{
      if (res.statusCode == 200 || res.data.status==200){   
            that.setData({ 
              selectUserTask: res.data.data.bussData
            })   
        that.Speed()    
      }
    
  }).catch(err=>{   
      console.log(err);
  })
},
//进度条
  Speed(){
    const that=this;
  //查询评论
    if (that.data.selectUserTask.comment == 1 || that.data.selectUserTask.comment == -1) {
      that.setData({
        comment: 100
      })
    }

  //查询分享
    if (that.data.selectUserTask.share==1){
      that.setData({
        sharenum:100
      }) 
    }

  //查询点赞 
    if (that.data.selectUserTask.likenum == 1 ){
        that.setData({ 
          numerical:50
        })
    } else if (that.data.selectUserTask.likenum >= 2){
        that.setData({
          numerical:100
        })
    }

    //发动态
    if (that.data.selectUserTask.dynamic == 1 || that.data.selectUserTask.dynamic == -1 ){ 
        that.setData({
          dynamic: 100
        })
    }



  },
  //点击完成任务
  tapTask(e){
    wx.showLoading({
      title:'领取中',
      mask:true
    })
    const that=this;
    const sessionId=that.data.sessionId;
    const taskid=e.currentTarget.dataset.taskid;
    
    myapi.finishTask(sessionId, taskid).then(res=>{
      if (res.data.status == 200){ 
          wx.hideLoading()
          //用户信息 
          that.userInformation();
          //查询签到
          that.selectSigninQd();
      }
    }).catch(err=>{
      console.log(err)
    })
  
  },
  //查询商品
  findGoodsByPage(){
    const that=this;
    const sessionId = that.data.sessionId;
    const data={
      goodsname: '',
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize
    }
    console.log(data);
    myapi.findGoodsByPage(sessionId,data).then(res=>{
      if (res.data.status==200){
        console.log(res.data.data.bussData)
        that.setData({ 
          pirceList: res.data.data.bussData
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
    const that=this;
    //查询如常任务
    that.selectUserTask()
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