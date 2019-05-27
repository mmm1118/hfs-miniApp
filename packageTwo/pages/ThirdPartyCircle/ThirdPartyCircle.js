Page({
  /**
   * 页面的初始数据
   */
  data: {
    maskShows:false,
    circles_bg:'./../../../images/my_img/bg.png',
    BackgroundImg:'',
    list_nav: [
      { name: '动态' }, 
      { name: '服务' }, 
      { name: '留言' }, 
      { name: '小组' },
      { name: '会员'},
      { name: '成员'},
      { name: '设置' }
      ],
      dynamicList: [1, 2],
      list_index:1,
      show: false,
      item: ['微信好友', '朋友圈', '评分', '删除'],
      flng: true,
      ismask:false,
      txVal:false,
      rewarditem:['打赏圈子','打赏汉服币','打赏现金'],
      reward:false,
      rewardBl:false,
      content:['打赏现金','元'],
      rewardHfb:false,
      contentHfb: ['打赏汉服币', '个']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    //替换标题
    var optionstitle = options.text_val || '圈子'
    this.setNavigationBarTitle(optionstitle);
  },
  //打赏模块
  reward(){},
  onSort(val) {
    //接受自定义取消事件
    console.log(val.detail);
    this.setData({
      show:!val.detail,
    })
  },
  show_hidemack() {
    console.log('123')
    this.setData({
      show: !this.data.show
    })
  },
  onmack(val) {
    //接受点击模板消失事件
    this.setData({
      show: !val.detail
    })
  },
  active_click(e){
    //console.log(e.currentTarget.dataset.index)
    this.setData({ 
      list_index: e.currentTarget.dataset.index
    })
  },
  cancelMask(){
    const that=this;
    that.setData({
      maskShows:!that.data.maskShows
    })
    
  },
  setNavigationBarTitle(title){
    wx.setNavigationBarTitle({
      title: title,
    }) 
  },
  //会员快
  Refresh() {
    this.setData({
      flng: !this.data.flng
    })
  },
  bindChooiceProduct() {
    const that = this;
    wx.chooseImage({
      count: 3,  //最多可以选择的图片总数
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {

        wx.showLoading({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })

        if (res.errMsg == 'chooseImage:ok') {
          wx.hideLoading()
          console.log(res);
          const tempFilePaths = res.tempFilePaths[0];    
          console.log(tempFilePaths)
          that.setData({
            BackgroundImg: tempFilePaths
          })
        }

      }
    })
  },
  popup_show(){
    const that = this;
    //点击蒙版取消
    that.setData({
      ismask: !that.data.ismask
    })
  },
  cancel() {
    const that = this;
    //点击蒙版取消
    that.setData({
      ismask: !that.data.ismask
    })
  },
  NextStep() {
    //弹窗下一步的操作
    const that = this;
    that.setData({
      ismask: !that.data.ismask,
    })

    wx.navigateTo({
      url: './../../../packageTwo/pages/addMember/addMember',
    })

  },
  mk() {
    //小自快 阻止默认冒泡事件
  },
  onSort(val) {
    console.log('123')
    console.log(val);
    const that = this;
    that.setData({
      ismask: !val
    })
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
  //圈子打赏功能
  reward(e){
    this.setData({
      reward:!this.data.reward
    })
  },
  reward1(e){
    console.log(e)
    console.log('打赏汉服币');
    this.setData({
      reward:!this.data.reward,
      rewardHfb:true
    })
  },
  reward2(e){
    console.log(e);
    console.log('打赏现金');
    this.setData({
      reward: !this.data.reward,
      rewardBl: true
    })
  },
  onSortget(e){ 
    console.log(e);
    const that=this;
    this.setData({ 
      reward:!e.detail,
    })
  }, 
  on_mack(e){
    console.log(e)
    const that=this;
    this.setData({
      reward: !e.detail
    })
  }, 
  //打赏现金
  onval(e){
    const that=this;
    console.log('----'+e.detail);
    if (e.detail==''){
      wx.showToast({
        title:'请输入现金'
      })
      return false;
    }
    that.setData({ 
      rewardBl:false
    })

    console.log(this.data.rewardBl)
  },
  //打赏汉服币
  onvalHfb(e){
    if (e.detail==''){
      wx.showToast({
        title:'请输入汉服币'
      })
      return false;
    }
    that.setData({ 
      rewardBl:false
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
    //点击按钮直接出发分享事件
    console.log('123---------------1')
  }
})