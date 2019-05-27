// packageTwo/pages/MemberManagement/MemberManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    show:false,
    list: [
      { name: '达浪达浪~0', imgage: './../../../images/circle_img/bg.png', tim: '2018-12-25加入', chenck: false, id: '0' },
      { name: '静若幽兰~1', imgage: './../../../images/circle_img/bg.png', tim: '2018-12-25加入', chenck: false, id: '1' },
      { name: '静若幽兰~3', imgage: './../../../images/circle_img/bg.png', tim: '2018-12-25加入', chenck: false, id: '2' },
    ],
    showSet:false,
    items: [
      { name: 'USA', value: '一级会员' },
      { name: 'CHN', value: '二级会员', checked: 'true' },
      { name: 'BRA', value: '三级会员' },
      { name: 'JPN', value: '四级会员' }
    ],
    items2:[
      { name: 'USA', value: '身份' },
      { name: 'CHN', value: '身份', checked: 'true' },
      { name: 'BRA', value: '身份' },
      { name: 'JPN', value: '身份' }
    ]
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  radioChangetwo(e){
    console.log('radio发生change222事件，携带value值为：', e.detail.value)
  },
  rank_tap(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  onSort(e){
    console.log(e)
    this.setData({ 
      show:!e.detail,
      showSet:!e.detail
    })
  },
  input_val(val) {
    console.log(val.detail.value)
    const that = this;
    that.setData({
      text_val: val.detail.value
    })
  },
  cancel(){
    const that = this;
    //点击蒙版取消
    that.setData({
      show: !that.data.show,
    })
  },
  NextStep(){
    //弹窗下一步的操作
    const that = this;
    that.setData({
      show: !that.data.show,
    })
  },
  refuse(){
    const that = this;
    that.setData({
      show: !that.data.show
    }) 
  },
  mk(){},

  //踢出圈子
  pickOut(){
    const that = this;
    that.setData({
      show: !that.data.show
    })
  },
  Selection(e) {
    var index = e.currentTarget.dataset.index;
    var listData = this.data.list;

    for (var i = 0; i < listData.length; i++) {
      if (listData[index] == listData[i]) {
        console.log(listData[i]);
        if (listData[i].chenck == false) {
          //点击谁获取谁 并获取他的id
          listData[i].chenck = true;
        } else {
          listData[i].chenck = false;
          //取消的时候 得吧对应的数组里面的内容删除掉
        }
      }
    }

    this.setData({
      list: listData
    })
  },
  FixedMoney(){
    const that = this;
    const listData = this.data.list;
    const arr = [];

    //点击确定 获取选中的id
    for (var i in listData) {
      if (listData[i].chenck == true) {
        arr.push(listData[i].id);
      }
    }
    that.setData({
      show: !that.data.show
    })

    console.log(arr);   
  },
  // 会员设置等级/身份
  protsRightBtn(){
    const that = this;
    that.setData({
      showSet:!that.data.showSet
    })
  },
  cancelMember(){
    const that = this;    
    that.setData({
      showSet: !that.data.showSet
    })
  },
  DetermineMember(){
    const that = this;
    that.setData({
      showSet: !that.data.showSet
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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