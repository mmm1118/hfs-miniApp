const {circleFetch} = require("./../../../server/index");


// packageTwo/pages/Threecircles/Threecircles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskShows: true,
    circles_bg: './../../../images/my_img/bg.png',
    likeIcon: ['./../../../images/index/dianzan.png', './../../../images/index/dianzan_s.png'],
    collectIcon: ['./../../../images/index/collect.png', './../../../images/index/collect_s.png'],
    BackgroundImg: '',
    list_nav: [
      {name: '动态'},
      {name: '活动'},
      {name: '留言'},
      {name: '成员'},
      {name: '会员卡'},
      {name: '小组'}
    ],
    dynamicList: [],
    list_index: 5,
    show: false,
    item: ['微信好友', '朋友圈', '删除'],
    flng: true,
    ismask: false,
    txVal: false,
    noticeData: null,
    detailData: null,
    userCircleDTOsLen: null,
    classid: null,
    pageIndex: 1,
    msgpageIndex: 1,
    userpageIndex: 1,
    hasMore: true,
    msghasMore: true,
    userhasMore: true,
    activityData: [],
    activitystatus: ['未报名开启', '报名中', '已截止', '已结束', '草稿'],
    messageData: [],
    messageVal: null,
    classUserData: [],
    pathway: ['首页加入', '好友邀请', '圈主'],
    groupData: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    //替换标题
    var optionstitle = options.text_val || '圈子'
    this.setNavigationBarTitle(optionstitle);
    this.setData({
      classid: options.classid
    })
    this._findByPage()
    this._selectCircleClassDetail()
    // this._selectCircleDynamicByPage()
    // this._selectByPageInHome()
    // this._findByMessagePage()
    // this._selectCircleClassUser()
    // this._findOneVipCard()
    this._findAllGroup()
  },

  /**
   * 切换tab
   * @param e
   */
  active_click(e) {
    const {index} = e.currentTarget.dataset
    this.setData({
      list_index: index,
      pageIndex: 1,
      msgpageIndex: 1,
      userpageIndex: 1,
    })
    switch (index) {
      case 0:
        this.setData({
          dynamicList: []
        })
        this._selectCircleDynamicByPage()
        break;
      case 1:
        this._selectByPageInHome()
        break;
      case 2:
        this._findByMessagePage('noMore')
        break;
      case 3:
        this._selectCircleClassUser('noMore')
        break;
      case 4:
        this._findOneVipCard()
        break;
      case 5:
        this._findAllGroup()
        break;
    }
  },


  /**
   * 小程序查询社团所有组
   * @param e
   * @private
   */
  _findAllGroup() {
    const {classid} = this.data
    const params = {
      circleId: classid,
    }
    circleFetch._findAllGroup(params).then(res => {
      console.log(res)
      let data = res.bussData
      data.forEach((item, index) => {
        data[index].txVal = false
      })
      this.setData({
        groupData: data
      })
      console.log(this.data.groupData)
    })
  },

  /**
   * 查询圈子会员卡
   * @param e
   * @private
   */
  _findOneVipCard() {
    const {classid} = this.data
    const params = {
      circleId: classid,
    }
    circleFetch._findOneVipCard(params).then(res => {
      console.log(res.bussData)
    })
  },

  /**
   * input 输出查询社团成员
   * @param e
   * @private
   */
  _inputSerchUser(e) {
    const {value} = e.detail
    this.setData({
      classUserData: []
    })
    if (value) {
      this._selectCircleClassUser('noMore', value)
    } else {
      this._selectCircleClassUser('noMore')
    }
  },

  /**
   * 查询社团用户
   * @param e
   * @private
   */
  _selectCircleClassUser(noMore, vulue) {
    const {classid, userpageIndex, userhasMore} = this.data
    let params = {
      circleid: classid,
      pageIndex: userpageIndex,
      pageSize: 15,
    }
    if (vulue) params.info = vulue
    circleFetch._selectCircleClassUser(params).then(res => {
      const data = res.bussData
      console.log(data)
      if (res.pageCount < userpageIndex) {
        this.setData({
          userhasMore: false
        })
      } else {
        this.setData({
          classUserData: noMore ? data : [...this.data.classUserData, ...data]
        })
      }
      console.log(this.data.classUserData)
    })
  },


  /**
   * 发送留言
   * @param e
   * @private
   */
  _handelSendMessage(e, url) {
    const {msgtype} = e.currentTarget.dataset
    const {messageVal, classid} = this.data
    if (!messageVal) {
      wx.showToast({
        title: '请输入留言',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    const content = msgtype ? messageVal : ''
    const params = {
      classId: classid,
      content,
      type: msgtype
    }
    circleFetch._saveCircleMessage(params).then(res => {
      this._findByMessagePage('noMore')
    })
  },

  /**
   * 输入留言
   * @param val
   */
  message_val(val) {
    console.log(val.detail.value)
    this.setData({
      messageVal: val.detail.value
    })
  },

  /**
   * 分页查询所有的留言
   * @param e
   * @private
   */
  _findByMessagePage(noMore) {
    const {classid, msgpageIndex} = this.data
    const params = {
      classid,
      pageIndex: msgpageIndex,
      pageSize: 15
    }
    circleFetch._findByMessagePage(params).then(res => {
      const data = res.bussData
      if (res.pageCount < msgpageIndex) {
        this.setData({
          msghasMore: false
        })
      } else {
        this.setData({
          messageData: noMore ? data : [...this.data.messageData, ...data]
        })
      }
    })

  },


  /**
   * 活动
   * @param e
   * @private
   */
  _selectByPageInHome() {
    const {classid, pageIndex} = this.data
    const params = {
      classid,
      pageIndex,
      pageSize: 2
    }
    circleFetch._selectByPageInHome(params).then(res => {
      console.log()
      const activityData = res.bussData
      this.setData({
        activityData
      })
      console.log(this.data.activityData)
    })

  },


  /**
   * 喜欢 or 不喜欢
   * @param e
   * @private
   */
  _handleLike(e) {
    // console.log(e.currentTarget.dataset)
    const {dynamicid, islike} = e.currentTarget.dataset
    const params = {
      dynamicId: dynamicid,
    }
    const {dynamicList} = this.data
    if (islike) {
      circleFetch._cancelLiketable(params).then(res => {
        dynamicList.forEach((item, index) => {
          item.dynamicid == dynamicid ? dynamicList[index].isLike = 0 : null
        })
        this.setData({dynamicList})
      })
    } else {
      circleFetch._addLiketable(params).then(res => {
        dynamicList.forEach((item, index) => {
          item.dynamicid == dynamicid ? dynamicList[index].isLike = 1 : null
        })
        this.setData({dynamicList})
      })
    }

  },

  /**
   * 收藏 or 取消
   * @param e
   * @private
   */
  _handleCollect(e) {
    // console.log(e.currentTarget.dataset)
    const {dynamicid, iscollect} = e.currentTarget.dataset
    const params = {
      dynamicId: dynamicid,
    }
    const {dynamicList} = this.data
    if (iscollect) {
      circleFetch._cancelCollection(params).then(res => {
        dynamicList.forEach((item, index) => {
          item.dynamicid == dynamicid ? dynamicList[index].isCollection = 0 : null
        })
        this.setData({dynamicList})
      })
    } else {
      circleFetch._addCollection(params).then(res => {
        dynamicList.forEach((item, index) => {
          item.dynamicid == dynamicid ? dynamicList[index].isCollection = 1 : null
        })
        this.setData({dynamicList})
      })
    }
  },
  /**
   * TODO 关注
   * @param e
   * @private
   */
  _handleFollow(e) {
    // console.log(e.currentTarget.dataset)
    const {userid, followid} = e.currentTarget.dataset
    const params = {
      beUserId: userid,
      followid
    }
    const {dynamicList} = this.data

    circleFetch._saveFollow(params).then(res => {
      dynamicList.forEach((item, index) => {
        item.dynamicid == dynamicid ? dynamicList[index].isFollow = 1 : null
      })
      this.setData({dynamicList})
    })

  },


  /**
   * 查询公告
   * @private
   */
  _findByPage() {
    const params = {
      "pageIndex": 1,
      "pageSize": 1
    }
    circleFetch._findByPage(params).then(res => {
      this.setData({
        noticeData: res.bussData[0]
      })
    })
  },

  /**
   * 查询当前圈子的详情
   * @param classid
   * @private
   */
  _selectCircleClassDetail() {
    const params = {classid: this.data.classid}
    circleFetch._selectCircleClassDetail(params).then(res => {
      const data = res.bussData.userCircleDTOs
      this.setData({
        detailData: res.bussData,
        userCircleDTOsLen: res.bussData.userCircleDTOs.length,
        BackgroundImg: res.bussData.imageUrl
      })
    })
  },

  _selectCircleDynamicByPage() {
    const params = {
      classid: this.data.classid,
      pageIndex: this.data.pageIndex,
      pageSize: 5
    }
    circleFetch._selectCircleDynamicByPage(params).then(res => {
      // console.log(res)
      const data = res.bussData
      if (res.pageCount < this.data.pageIndex) {
        this.setData({
          hasMore: false
        })
      } else {
        this.setData({
          dynamicList: [...this.data.dynamicList, ...data]
        })
      }

    })
  },


  onSort(val) {
    //接受自定义取消事件
    console.log(val.detail);
    this.setData({
      show: !val.detail
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
  cancelMask() {
    const that = this;
    that.setData({
      maskShows: !that.data.maskShows
    })

  },
  setNavigationBarTitle(title) {
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
  popup_show() {
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
    const {index} = e.currentTarget.dataset
    let {groupData} = this.data
    if (e.detail.txVal > 0) {
      groupData[index].txVal = false
      console.log('我是向右滑动的')
    } else if (e.detail.txVal < 0) {
      groupData[index].txVal = true
      console.log('我是向左滑动的')
    }
    this.setData({
      groupData
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
    const {list_index} = this.data

    if (list_index == 0) {
      if (this.data.hasMore) {
        this.data.pageIndex++
        this._selectCircleDynamicByPage()
      } else {
        console.log('no more')
      }
    } else if (list_index == 2) {

    }
    switch (list_index) {
      case 0:
        if (this.data.hasMore) {
          this.data.pageIndex++
          this._selectCircleDynamicByPage()
        } else {
          console.log('no more')
        }
        break;
      case 2:
        //TODO 留言要下拉加载 or 上拉加载 ？
        // this._findByMessagePage('noMore')
        break;
      case 3:
        if (this.data.userhasMore) {
          this.data.userpageIndex++
          this._selectCircleClassUser()
        } else {
          console.log('no more')
        }
        break;
      case 4:
        // this._selectByPageInHome()
        break;
      case 5:
        // this._selectByPageInHome()
        break;
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //点击按钮直接出发分享事件
    console.log('123---------------1')
  }
})
