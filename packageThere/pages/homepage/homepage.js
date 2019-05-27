const {myapi,wxapi} = require('./../../../server/index.js')
const {postData} = require('./../../../server/https.js')
const utiltwo = require('./../../../utils/utiltwo.js')
// packageThere/pages/homepage/homepage.js
Page({
  /**
   * 页面的初始数据
   */
  data:{
      offset:false,
      bussData:'',
      offsetinp:true,
      focus:false,
      cursor:true,
      sessionId :'',
      opendID:'',
      fans:0,
      follow:0,
      label:'请编辑的你个性签名',
      val:'',
      pageIndex:1,
      pageSize:5,
      prt_listdata:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const sessionId = wx.getStorageSync('sessionId');
    const userInformation = wx.getStorageSync('userInformation');//获取用户信息
    that.setData({
      opendID: userInformation.openid,
      sessionId: sessionId,

    })
    that.userInformation()//查询当前用户信息
    that.selectCountAllByBeOpenId();//获取粉丝数量
    that.selectCountAllByOpenId() //查询关注数量
    that.selectDynamicByPage()//查询我自己的动态
  },
  share(e){//点击谁展开谁
    const that=this;
    console.log(e.currentTarget.dataset.index)
    const list_index = e.currentTarget.dataset.index
    let prt_listdata = that.data.prt_listdata;
    prt_listdata.forEach((val,index)=>{ 
      val.offset = false;
      if(list_index==index){ 
        val.offset=true
      }
    })

    that.setData({ 
      prt_listdata:prt_listdata,
    })
  },
  //点击蒙版取消
  cal_qx(){
    const that = this;
    let prt_listdata = that.data.prt_listdata;
    prt_listdata.forEach((val, index) => {
      val.offset = false;
    })

    that.setData({
      prt_listdata: prt_listdata,
    })

  },
  //预览图片
  previewImg(e){
    const that=this;
    const imgindex = e.currentTarget.dataset.index;
    const imagesdtos = e.currentTarget.dataset.imagesdtos;
    const imgArr=[];

    imagesdtos.forEach((val, index) => {
      imgArr.push(val.url)
    })

    if (imgArr.length>0){ 
      wx.previewImage({
        current: imgArr[imgindex],     //当前图片地址
        urls: imgArr, //所有要预览的图片的地址集合 数组形式
        success: function (res) {
        },
        fail: function (res) {
        },
      })
    }
  },
  //
  stop_cal(e){ 
    const that=this;
    const sessionId = that.data.sessionId;
    let index = e.currentTarget.dataset.index;
    let prt_listdata = that.data.prt_listdata;

    if (e.currentTarget.dataset.opti == 1){
      console.log(e.currentTarget.dataset.dynamicid)
      that.cal_qx()
      that.onShareAppMessage(e.currentTarget.dataset.dynamicid)

    }


    if (e.currentTarget.dataset.opti == 2){ 
        wx.navigateTo({
          url: '/pages/share/share',
        })
      that.cal_qx()
        
    }

    /* 删除动态 */
    if (e.currentTarget.dataset.opti==3){  
        console.log(e.currentTarget.dataset.opti);
        const data = { dynamicId: e.currentTarget.dataset.dynamicid}
        myapi.dynamicIddelete(sessionId,data).then(res=>{
          wx.showLoading({
            title:'删除中',
            mask:true
          })

          console.log(res.data.status)
          console.log(res.statusCode)
          if (res.statusCode == 200 && res.data.status==200){ 
              wx.hideLoading();
              wx.showToast({
                title: '删除帖子成功',
                icon:'none'
              })
                console.log(prt_listdata)
                prt_listdata.splice(index, 1); //点击谁删除谁
                that.setData({
                  prt_listdata: prt_listdata
                })
          }
        }).catch(err=>{
          console.log(err);
        })
    }
  },

/**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(){

  },
  //点击然个性签名 input 可以编辑
  active(){
    console.log('123')
      const that=this;
      that.setData({ 
        offsetinp:false,
        focus: true
      })
      console.log(this.data.focus)
  },
  iputval(e){
    console.log(e)
    const that=this;
    that.setData({ 
      val:e.detail.value
    })
  },
  //失去焦点事件
  bindblur(){
    const that=this;
    console.log(this.data.label);
    console.log(this.data.val);
    if (this.data.val){ 
        wx.showModal({
          title: '修改个性签名',
          content: '是否修改个签名',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.saveUserinfo()
            } else if (res.cancel) {
              that.setData({ 
                label:that.data.label
              })
              console.log('用户点击取消')
            }
          }
        })
    }
  },
  //点击键盘完成去修改个性签名
  Determine(){
  },
  //修改个性签名
  saveUserinfo(){
    const that=this;
    wx.showLoading({
      title:'修改中',
      mask:true
    })

    const data = {
      label:that.data.val,
      sex: that.data.bussData.sex,
      nickname: that.data.bussData.nickname
    }

    //提交用修改信息
    postData(`/app/userinfo/saveUserinfo?sessionId=${that.data.sessionId}`, data, 'application/json').then(res => {
      console.log(res.data);
      if (res.data.status == 200) {
        wx.hideLoading();
        wx.showToast({
          title: "修改信息成功！",
          icon: 'noen'
        })
        this.setData({
          setoff: true
        })
      }else{ 
        return Promise.reject(res)
      }
    }).catch(err => {
      if (res.status==500){ 
          wx.showToast({
            title:'服务器忙，请稍后再试',
            icon:none
          })
      }
      wx.hideLoading();
      console.log(err);
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //获取粉丝数量
  selectCountAllByBeOpenId(){ 
    const that=this;
    const sessionId = that.data.sessionId;
    const data = { openId:that.data.opendID}
    myapi.selectCountAllByBeOpenId(sessionId, data).then(res=>{
      if (res.data.status==200){ 
        // console.log(res.data)
          that.setData({ 
            fans: res.data.data.bussData
          })  
      }
    }).catch(err=>{ 
      console.log('获取粉丝失败',err)
    })

  },
  //查询关注数量
  selectCountAllByOpenId(){
    const that = this;
    const sessionId = that.data.sessionId;
    const data = { openId: that.data.opendID }
    myapi.selectCountAllByOpenId(sessionId, data).then(res => {
      if (res.data.status == 200) {
        // console.log(res.data)
        that.setData({
          follow: res.data.data.bussData
        })
      }
    }).catch(err => {
      console.log('获取关注数量', err)
    })
  },
  //查询当前用户信用
  userInformation(){
    const that = this;
    const sessionId = that.data.sessionId;
    myapi.userInformation(sessionId).then(res => {
      if (res.data.status == 200) {
        that.setData({
          bussData: res.data.data.bussData,
          label: res.data.data.bussData.label
        })
      }
    }).catch(err => {
      console.log('获取关注数量', err)
    })
  },
  //查询我自己的动态 列表
  selectDynamicByPage(){
    console.log('查询我自己的动态')
    const sessionId = wx.getStorageSync('sessionId');
    const that=this;
    const data={
        classId:"",
        pageIndex:that.data.pageIndex,
        pageSize:that.data.pageSize,
        range: "",
        topicId:""
    }
    
    myapi.selectDynamicByPage(sessionId, data).then(res=>{ 
        console.log(res)
        if (res.statusCode == 200 || res.data.data.status==200){ 
            console.log('200',res.data.data)
          var prt_listdata = res.data.data.bussData;
          prt_listdata.forEach((val,index)=>{
                  console.log(val.createtime)
                  //测试自动添加的时间
                  // if (val.createtime =='2019-04-03 18:56:28'){
                  //   val.createtime = '2019-05-13 14:16:00'
                  // }

                  //  if (val.createtime =='2019-04-03 18:06:57'){ 
                  //   val.createtime ='2019-05-13 10:16:00'
                  // }

                  // if (val.createtime=='2019-04-03 17:27:52'){
                  //     val.createtime = '2018-01-13 10:16:00'
                  // }

                  var timeatc = utiltwo.funtime(val.createtime);

                  if (timeatc.dw == '分') {
                    val.timeMin = timeatc.time + '分钟前';
                    val.week = '今天'
                  } else if (timeatc.dw == '时') {
                    val.timeMin = timeatc.time + '小时前';
                    val.week = '今天'
                  } else {
                    console.log(val.createtime.split(' '))
                    const timespliceLength = val.createtime.split(' ')
                    const hf = timespliceLength[1].split(':')
                    console.log(hf)
                    val.timeMin = hf[0] + ':' + hf[1];
                    val.week = utiltwo.Annualconversion(timespliceLength[0]);
                  }

                  val.offset=false;
          })

          console.log('改变后的时间戳',prt_listdata)
          // star tim
          // prt_listdata.forEach((val, index) => {
          //   console.log(utiltwo.funtime(val.createtime))
          //   var timeatc = utiltwo.funtime(val.createtime);
            
          //   if (timeatc.dw=='分'){ 
          //     val.timeMin =timeatc.time +'分钟前';
          //     val.week='今天'
          //   }else if(timeatc.dw == '时'){ 
          //       val.timeMin = timeatc.time + '小时前';
          //       val.week = '今天'
          //   }else{  
          //       console.log(val.createtime.split(' '))
          //       const  timespliceLength = val.createtime.split(' ')
          //       const hf = timespliceLength[1].split(':')
          //       console.log(hf)
          //       val.timeMin = hf[0] +':'+hf[1];
          //       val.week = utiltwo.Annualconversion(timespliceLength[0]); 
          //   } 
          // })

          //end time
          // console.log(prt_listdata);
          that.setData({ 
            prt_listdata: prt_listdata
          })

        }
    }).catch(err=>{
        console.log(err)
    })

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
    wx.showLoading({
      title: "加载中..."
    });
    const that = this;
    var sessionId = that.data.sessionId;
    const data = {
      classId: "",
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize,
      range: "",
      topicId: ""
    }

    myapi.selectDynamicByPage(sessionId, data).then(res => {
      console.log(res)
      var bussData=res.data.data.bussData
      if (res.statusCode == 200 || res.data.status==200){
        wx.hideLoading();
        bussData.forEach((val, index) => {
          var timeatc = utiltwo.funtime(val.createtime);
          if (timeatc.dw == '分') {
            val.timeMin = timeatc.time + '分钟前';
            val.week = '今天'
          } else if (timeatc.dw == '时') {
            val.timeMin = timeatc.time + '小时前';
            val.week = '今天'
          } else {
            console.log(val.createtime.split(' '))
            const timespliceLength = val.createtime.split(' ')
            const hf = timespliceLength[1].split(':')
            console.log(hf)
            val.timeMin = hf[0] + ':' + hf[1];
            val.week = utiltwo.Annualconversion(timespliceLength[0]);
          }
          val.offset = false;       
        })

        that.setData({
          prt_listdata:bussData
        })

        wx.showToast({
          title: '刷新成功',
          icon: 'none'
        })

      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    const sessionId = this.data.sessionId;
    const data = {
      classId: "",
      pageIndex: ++that.data.pageIndex,
      pageSize: that.data.pageSize,
      range: "",
      topicId: ""
    }
    myapi.selectDynamicByPage(sessionId, data).then(res => {
      wx.stopPullDownRefresh() //上拉的时候禁止下拉动作
      console.log(res.data.data.bussData);
      if (res.statusCode == 200) {
        var bussData = res.data.data.bussData;
        if (res.data.data.bussData.length == 0) {
          wx.hideLoading();
          wx.showToast({ title: '没有更多数据了', icon: 'none' })
          return false;
        }

        bussData.forEach((val, index) => {
          var timeatc = utiltwo.funtime(val.createtime);
          if (timeatc.dw == '分') {
            val.timeMin = timeatc.time + '分钟前';
            val.week = '今天'
          } else if (timeatc.dw == '时') {
            val.timeMin = timeatc.time + '小时前';
            val.week = '今天'
          } else {
            console.log(val.createtime.split(' '))
            const timespliceLength = val.createtime.split(' ')
            const hf = timespliceLength[1].split(':')
            console.log(hf)
            val.timeMin = hf[0] + ':' + hf[1];
            val.week = utiltwo.Annualconversion(timespliceLength[0]);
          }
          val.offset = false;
        })        

        wx.hideLoading()
        console.log('我的数据'+that.data.prt_listdata)
        
        /*concat 数组拼接 */
        that.setData({
          prt_listdata: that.data.prt_listdata.concat(bussData)
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (dynamicid) {
    const that = this;
    const sessionId = wx.getStorageSync('sessionId');

    return {
      title: `帖子详情`, //转发的标题,
      path: `packageThere/pages/stateDetail/stateDetail?dynamicid=${dynamicid}`
    }
    myapi.addShareNum(sessionId).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    }) 
  }
})