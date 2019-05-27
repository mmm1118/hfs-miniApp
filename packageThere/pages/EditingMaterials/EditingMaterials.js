// packageThere/pages/EditingMaterials/EditingMaterials.js
const { myapi, wxapi } = require('./../../../server/index.js')
const { postData} = require('./../../../server/https.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bussData: '',
    sex:'',
    name:'',
    autograph:'',
    setoff:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /* 获取用户信息 */
  userInformation() {
    const that = this;
    const sessionId = this.data.sessionId;
    myapi.userInformation(sessionId).then(res => {
      console.log(res.data.data.bussData);
      that.setData({
        bussData: res.data.data.bussData,
        sex: res.data.data.bussData.sex,
        name: res.data.data.bussData.nickname,
        autograph: res.data.data.bussData.label
      })
    }).catch(res=>{
        console.log(res);
    })
  },
  sex_tap(e){
    console.log(e.currentTarget.dataset.sex);
      const that=this;
      const sexI= e.currentTarget.dataset.sex
      if (sexI==1){ 
        that.setData({
          sex:2
        })
      } else if (sexI==2){
        that.setData({
          sex: 1
        })
      }
  },
  //名字
  bind_name(e){
    console.log(e);
    this.setData({ 
      name:e.detail.value
    })
    this.btn_bg()

  },
  //个型签名
  bind_autograph(e){
    this.setData({ 
      autograph:e.detail.value
    })
    this.btn_bg()
    console.log(e.detail.value);
  },
  //按钮可用性
  btn_bg() {
    let setoff;
    if (this.data.name.length || this.data.autograph.length  > 0) {
      setoff = false
    } else {
      setoff = true
    }
    this.setData({
      setoff:setoff
    })
    console.log(this.data.setoff)
  },
  //提交
  Submission(){
    const that = this;
    
    wx.showLoading({
      title: '修改中',
      mask:true
    })
    if (this.data.name==""){
      wx.showToast({
        title: '请输入呢称',
        icon:'none'
      })
      return false;
    }
    if (this.data.name == ""){
    wx.showToast({
      title: '请输入呢称',
      icon: 'none'
    })
    return false;
  }

   const data={ 
     label: that.data.autograph || that.data.bussData.label,
     sex:that.data.sex,
     nickname: that.data.name || that.data.bussData.nickname
   }
    //提交用黄金信息
    postData(`/app/userinfo/saveUserinfo?sessionId=${that.data.sessionId}`, data,'application/json').then(res=>{
         console.log(res.data);
        if(res.data.status==200){
           wx.hideLoading(); 
            wx.showToast({
              title:"修改信息成功！",
              icon:'noen'
            })
            this.setData({
              setoff: true
            })
        }
      }).catch(err=>{   
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
    const that = this;
    const sessionId = wx.getStorageSync('sessionId');
    console.log(sessionId)
    that.setData({
      sessionId: sessionId
    })

    /* 获取个人信息 */
    this.userInformation();

   
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