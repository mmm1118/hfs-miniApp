const { myapi, wxapi } = require('./../../../server/index.js')
const utiltwo = require('./../../../utils/utiltwo.js');
const util = require('./../../../utils/util.js');
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 控制输入框右边的显示
    focusShow: false,
    // 分享是否展示
    dynamicId: false,
    bussData: '',
    timeRecord: '',
    address: '',//地址
    pageIndex: 1,
    pageSize: 5,
    dynamicIdlist: '',
    inpVal: '',
    plaval: '',
    valtwo: '',
    plaval_htree: '说点什么呢2',
    valthree: '',
    addlick: '',
    liketableNum: '',
    beUserid: '',
    isCollection: '',
    dynamicidtwo: ''
  },
  // 输入框聚焦
  inputFocus(e) {
    this.setData({
      focusShow: true
    })
  },
  // 输入框失去焦点
  inputBlur(e) {
    if (this.data.inpVal == '') {

      this.setData({
        focusShow: false
      })
      return false;
    }

    wx.showToast({
      title: '你还存在未发送的内容',
      icon: 'none'
    })

  },
  // 分享
  toShare: function (e) {
    this.setData({
      dynamicId: true
    });
  },
  // 取消分享
  cancelShare: function () {
    this.setData({
      dynamicId: "",
      openId: "",
      nickName: "",
      rqCode: "",
      content: "",
      img: "",

    });
  },
  // 到分享页
  toSharePage: function (e) {
    wx.navigateTo({
      url: '/pages/share/share?openId=' + e.currentTarget.dataset.openid + '&nickName=' + e.currentTarget.dataset.nickname + '&rqCode=' + e.currentTarget.dataset.rqcode + '&content=' + e.currentTarget.dataset.content + '&img=' + e.currentTarget.dataset.img,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const sessionId = wx.getStorageSync('sessionId');
    const userInformation = wx.getStorageSync('userInformation');//获取用户信息
    const openid = userInformation.openid;
    const dynamicid = options.dynamicId || 5399;

    that.setData({
      openid: openid,
      dynamicid: options.dynamicId,
      userInformation: userInformation
    })
    //获取详情
    that.dynamic(sessionId, dynamicid);

    //获取评论列表
    that.selectAllByPage(sessionId, dynamicid)

    //获取用户信息
    that.userInformation(sessionId)
  },

  //点赞
  addLiketable() {
    const that = this;
    const dynamicidtwo = that.data.dynamicidtwo;
    const sessionId = wx.getStorageSync('sessionId');

    const data = {
      dynamicId: dynamicidtwo
    }

    if (that.data.addlick == 0) {
      //请求 添加点赞请求
      myapi.addLiketable(sessionId, data).then(res => {
        console.log(res);
        if (res.statusCode == 200 || res.data.status == 200) {
          that.setData({
            addlick: 1,
            liketableNum: (that.data.liketableNum + 1)
          })
          wx.showToast({
            title: '点赞成功',
            icon: 'none'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }

    if (that.data.addlick == 1) {
      //请求取消点赞请求
      myapi.cancelLiketable(sessionId, data).then(res => {
        if (res.statusCode == 200 || res.data.status == 200) {
          that.setData({
            addlick: 0,
            liketableNum: (that.data.liketableNum - 1)
          })

          wx.showToast({
            title: '取消点赞',
            icon: 'none'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }


  },
  //是否收藏
  Collection() {
    const that = this;
    const dynamicidtwo = that.data.dynamicidtwo;
    const sessionId = wx.getStorageSync('sessionId');
    const data = {
      beUserId: that.data.beUserid,
      classId: '',
      dynamicId: dynamicidtwo
    }

    const datatwo = {
      dynamicId: dynamicidtwo
    }

    if (that.data.isCollection == 0) {
      //点击收藏 请求
      myapi.saveCollection(sessionId, data).then(res => {
        if (res.statusCode == 200 || res.data.status == 200) {
          that.setData({
            isCollection: 1,
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'none'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }

    if (that.data.isCollection == 1) {
      //点击消收藏 请求
      myapi.cancelCollection(sessionId, datatwo).then(res => {
        if (res.statusCode == 200 || res.data.status == 200) {
          that.setData({
            isCollection: 0,
          })

          wx.showToast({
            title: '取消收藏',
            icon: 'none'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }

  },

  //获取用户信息
  userInformation(sessionId) {
    const taht = this;
    myapi.userInformation(sessionId).then(res => {
      console.log(res);
      if (res.statusCode == 200 || res.data.status == 200) {

        taht.setData({
          avatarurl: res.data.data.bussData.avatarurl
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  dynamic(sessionId, dynamicid) {
    const that = this;
    myapi.dynamic(sessionId, dynamicid).then(res => {
      if (res.data.status == 200) {
        console.log(res.data.data.bussData)
        let baselist = res.data.data.bussData;
        that.setData({
          bussData: baselist,
          dynamicidtwo: baselist.dynamicid,
          addlick: baselist.isLike,
          liketableNum: baselist.liketableNum,
          beUserid: baselist.userinfoDTO.userid,
          isCollection: baselist.isCollection
        })
        // 获取发帖时间字段
        if (baselist.createtime !== '') {
          const timeStamp = new Date(baselist.createtime).getTime();
          const timeStr = util.how_long_ago(timeStamp);
          that.setData({
            timeRecord: timeStr
          });
        }
      }

      console.log(that.data.bussData)
      const latitude = res.data.data.bussData.latitude;
      const longitude = res.data.data.bussData.longitude;
      return wxapi.getReverseGeocoder(latitude, longitude)

    }).then(res => {
      if (res.message !== "query ok") {
        return Promise.reject('获取地址失败')
      }
      that.setData({
        address: res.result.address
      })
    }).catch(err => {
      console.log(err)
    })

  },
  //打开内置地图
  chooseLn() {
    const that = this;
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = that.data.bussData.latitude;
        const longitude = that.data.bussData.longitude;
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
    })
  },
  /* 获取动态列表 */
  selectAllByPage(sessionId, dynamicid) {
    const that = this;
    const data = {
      dynamicId: dynamicid,
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize
    }
    myapi.selectAllByPage(sessionId, data).then(res => {
      console.log('获取动态评论列表', res);
      if (res.statusCode == 200 || res.data.data.status == 200) {
        that.setData({
          dynamicIdlist: res.data.data.bussData
        })
      }

    }).catch(err => {
      console.log(err);
    })

  },
  input_val(e) {
    console.log(e.detail.value)
    this.setData({
      inpVal: e.detail.value
    })

  },
  //发送 评论
  formSubmit(e) {
    const that = this;
    const content = e.detail.value.content;
    const sessionId = wx.getStorageSync('sessionId');
    const dynamicid = that.data.dynamicid;
    const openid = that.data.openid;
    if (content == '') {
      return false;
    }

    const data = {
      beopenid: openid,
      classid: that.data.bussData.classid == 0 ? '' : that.data.bussData.classid,
      content: e.detail.value.content,
      dynamicid: that.data.dynamicid
    }

    myapi.saveComment(sessionId, data).then(res => {
      console.log('这是评论的接口' + res);

      if (res.statusCode == 200 || res.data.status == 200) {
        wx.showToast({
          title: '评论成功',
          icon: 'none'
        })
        console.log(that.data.avatarurl)
        const saveCommentData = {
          avatarurl: that.data.avatarurl,
          nickname: that.data.userInformation.nickname,
          content: e.detail.value.content,
          createtime: utiltwo.newDate()
        };

        const saveCommentlist = that.data.dynamicIdlist.unshift(saveCommentData)

        that.setData({
          focusShow: false,
          dynamicIdlist: that.data.dynamicIdlist,
          content: ''
        })

      }

    }).catch(err => {
      console.log(err);
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //预览图片
  previewImg(e) {
    const that = this;
    const imgindex = e.currentTarget.dataset.index;
    const imagesdtos = e.currentTarget.dataset.imagesdtos;
    const imgArr = [];

    imagesdtos.forEach((val, index) => {
      imgArr.push(val.url)
    })

    if (imgArr.length > 0) {
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
    wx.showLoading({
      title: "加载中..."
    });
    const that = this;
    const sessionId = wx.getStorageSync('sessionId');
    const dynamicid = that.data.dynamicidtwo;
    const data = {
      dynamicId: dynamicid,
      pageIndex: 1,
      pageSize: that.data.pageSize
    }

    myapi.selectAllByPage(sessionId, data).then(res => {
      console.log('获取动态评论列表', res);
      if (res.statusCode == 200 || res.data.data.status == 200) {
        wx.hideLoading();
        wx.showToast({
          title: '刷新成功',
          icon: 'none'
        })
        that.setData({
          dynamicIdlist: res.data.data.bussData
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: "加载中..."
    });

    const that = this;
    const sessionId = wx.getStorageSync('sessionId');
    const dynamicid = that.data.dynamicidtwo;
    const data = {
      dynamicId: dynamicid,
      pageIndex: ++that.data.pageIndex,
      pageSize: that.data.pageSize
    }

    myapi.selectAllByPage(sessionId, data).then(res => {
      console.log('获取动态评论列表', res);
      if (res.statusCode == 200 || res.data.data.status == 200) {
        wx.hideLoading();
        if (res.data.data.bussData.length == 0) {
          wx.hideLoading();
          wx.showToast({ title: '没有更多数据了', icon: 'none' })
          return false;
        }
        that.setData({
          dynamicIdlist: that.data.dynamicIdlist.concat(res.data.data.bussData)
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
  /* 内部评论 输入内容事件*/
  input_valtwo(e) {
    this.setData({
      valtwo: e.detail.value
    })
  },
  /* 内部评论 失去焦点事件*/
  inputBlurtwo() {
    const that = this;
    let dynamicIdlist = that.data.dynamicIdlist;
    if (that.data.valtwo !== '') {//评论内部还有内容的话就不隐藏输入框
      wx.showToast({
        title: '你还存在未发送的内容',
        icon: 'none'
      })
      return false;
    }

    dynamicIdlist.forEach((val, index) => {
      val.replyDTOs.forEach((val, index) => {
        val.ofset2 = false;
        plaval: val.userName
      })
    })

    that.setData({
      dynamicIdlist: dynamicIdlist
    })

  },
  //点击显示评论 
  keyboard(e) {
    const that = this;
    let dynamicIdlist = that.data.dynamicIdlist;
    let btncommentid = e.currentTarget.dataset.btncommentid;
    let i = e.currentTarget.dataset.index;
    let replydtos = e.currentTarget.dataset.replydtos;
    let plaval = '';

    dynamicIdlist.forEach((val, index) => {
      if (val.commentid == btncommentid) {
        console.log(val)
        val.replyDTOs.forEach((val, index) => {
          val.ofset2 = false;
          if (index == i) {
            val.ofset2 = true;
            plaval = val.userName
          }
        })
      }
    })
    that.setData({
      dynamicIdlist: dynamicIdlist,
      plaval: '对 ' + plaval + ' 说点什么' || '你想对我说点什么？'
    })
  },
  maopao() {

  },
  //用户和用户之间评论
  SendOut(e) {
    const that = this;
    const sessionId = wx.getStorageSync('sessionId');
    let dynamicIdlist = that.data.dynamicIdlist;
    let openid = e.currentTarget.dataset.openid;//评论用户id
    let commentid = e.currentTarget.dataset.commentid;
    let dynamicid = e.currentTarget.dataset.dynamicid;
    let valtwo = that.data.valtwo;
    let i = e.currentTarget.dataset.index;
    let btncommentid = e.currentTarget.dataset.btncommentid;

    that.setData({
      focusShow: false,
    })

    const data = {
      beopenid: openid,
      commentid: commentid,
      content: valtwo,
      dynamicid: dynamicid
    }

    myapi.saveReply(sessionId, data).then(res => {
      console.log(res);
      if (res.statusCode == 200 || res.data.data.status == 200) {

        dynamicIdlist.forEach((valnav, index) => {
          if (valnav.commentid == btncommentid) {
            let replyDTOslist = valnav.replyDTOs;
            valnav.replyDTOs.forEach((val, index) => {
              val.ofset2 = false;
              if (index == i) {
                let vallist = { userName: val.userName, ofset2: false, beUserName: val.beUserName, content: valtwo };
                valnav.replyDTOs.push(vallist)
              }
            })
          }
        })

        that.setData({
          dynamicIdlist: dynamicIdlist,
          valtwo: ''
        })

        wx.showToast({
          title: '用户回复成功',
          icon: 'none'
        })

      }
    }).catch(err => {
      console.log(err);
    })
  },
  /* 点击弹窗 输入框*/
  content_reply(e) {
    const that = this;
    const sessionId = wx.getStorageSync('sessionId');
    let dynamicIdlist = that.data.dynamicIdlist;
    let btncommentid = e.currentTarget.dataset.commentid;
    let i = e.currentTarget.dataset.index;
    let plaval = "";
    dynamicIdlist.forEach((val, index) => {
      if (val.commentid == btncommentid) {
        console.log(val)
        val.ofset1 = true
        plaval = val.nickname

      }
    })

    that.setData({
      dynamicIdlist: dynamicIdlist,
      plaval_htree: '对 ' + plaval + ' 说点什么' || '你想对我说点什么？'
    })

  },
  /*回复评论用户 失去焦点*/
  inputBlurthree() {
    const that = this;
    let dynamicIdlist = that.data.dynamicIdlist;
    if (that.data.valthree !== '') {//评论内部还有内容的话就不隐藏输入框
      return false;
    }

    dynamicIdlist.forEach((val, index) => {
      val.ofset1 = false;


    })

    that.setData({
      dynamicIdlist: dynamicIdlist,

    })

  },
  /*回复评论用户 获取内容*/
  valthree(e) {
    console.log(e.detail.value);
    const that = this;
    that.setData({
      valthree: e.detail.value
    })
  },
  /*回复评论用户*/
  commentSendOut(e) {
    const that = this;
    console.log(e.currentTarget.dataset.beopenid);
    console.log(e.currentTarget.dataset.commentid)
    console.log(e.currentTarget.dataset.dynamicid)
    const sessionId = wx.getStorageSync('sessionId');
    let dynamicIdlist = that.data.dynamicIdlist;

    const data = {
      beopenid: e.currentTarget.dataset.beopenid,
      commentid: e.currentTarget.dataset.commentid,
      content: that.data.valthree,
      dynamicid: e.currentTarget.dataset.dynamicid
    }

    myapi.saveReply(sessionId, data).then(res => {
      if (res.statusCode == 200 || res.data.data.status == 200) {

        dynamicIdlist.forEach((val, index) => {
          val.ofset1 = false;
          if (val.commentid == e.currentTarget.dataset.commentid) {
            let vallist = { userName: val.nickname, ofset1: false, beUserName: val.nickname, content: that.data.valthree };
            val.replyDTOs.push(vallist)


            console.log(vallist)
            console.log(val.replyDTOs)

          }
        })
        wx.showToast({
          title: '评论成功',
          icon: 'none'
        })
        console.log(dynamicIdlist);
        that.setData({
          dynamicIdlist: dynamicIdlist
        })

      }
    }).catch(err => {
      console.log(err)
    })




  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    return {
      title: `${that.bussData.location}帖子详情`, //转发的标题,
      path: `packageThere/pages/stateDetail/stateDetail?dynamicid=${that.data.dynamicid}`,
    }

  }
})