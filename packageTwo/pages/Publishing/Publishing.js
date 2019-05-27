var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 服务器地址
    serverIp: app.globalData.serverIp,

    // 输入框内容
    textareaValue: "",

    // 是否输入话题
    isAddTopic: false,

    // 热门话题列表
    topicList: [],

    // 要发布的图片
    photoList: [],

    // 发送的位置
    location: app.globalData.location,

    // 当前第几张图片
    photoIndex: 0,

    // 固定话题名字
    topicName: "",

    // 选择图片还是视频
    typeShow: false,

    // 添加类型，0都不是，1照片，2视频
    photoType: 0,

    // 单选按钮
    radioCheckd: false,

    // 圈子列表
    index: null,
    array: ['美国', '中国', '巴西', '日本'],
  },
  // 圈子选择事件
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    if (options.topicName === undefined) {

    } else {
      that.setData({
        topicName: options.topicName,
        textareaValue: '#' + options.topicName + '#'
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 往输入框添加@的好友昵称
   */
  onShow: function (e) {
    var that = this;

    if (app.globalData.isAtFriends && app.globalData.atFriendsNickName.length > 0) {
      app.globalData.isAtFriends = false;

      var newTextareaValue = that.data.textareaValue + '@' + app.globalData.atFriendsNickName[app.globalData.atFriendsNickName.length - 1] + " "

      that.setData({
        textareaValue: newTextareaValue
      });
    }

    that.setData({
      location: app.globalData.location
    });
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
    app.globalData.atFriendsOpenId = [];
    app.globalData.atFriendsNickName = [];
    var location = {
      title: "",
      latitude: -1,
      longitude: -1
    };
    app.globalData.location = location;
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

  // 文本框输入
  textInput: function (e) {
    var that = this;

    if (that.data.topicName) {
      var list = e.detail.value.split('#');
      if (list[1] != that.data.topicName || list.length < 3 || list[0]) {
        that.setData({
          textareaValue: '#' + that.data.topicName + '#'
        });

        return;
      }
    }

    var n = (e.detail.value.split('#')).length - 1;
    if (n % 2 == 0) {
      that.setData({
        isAddTopic: false
      });
    } else {
      that.setData({
        isAddTopic: true
      });

      var index = e.detail.value.lastIndexOf("#");
      var str = e.detail.value.substring(index + 1, e.detail.value.length);
      that.getTopicList(str);
    }

    that.setData({
      textareaValue: e.detail.value
    });
  },

  // 点击完成
  textConfirm: function (e) {
    var that = this;

    that.setData({
      textareaValue: that.data.textareaValue + '#',
      isAddTopic: false
    });
  },

  // 添加话题
  addTopic: function () {
    var that = this;

    if (!that.data.isAddTopic) {
      var newTextareaValue = that.data.textareaValue + "#"
      that.setData({
        textareaValue: newTextareaValue,
        isAddTopic: true
      });

      that.getTopicList("");
    }
  },

  // 选择话题
  choiceTopic: function (e) {
    var that = this;

    var newTextareaValue = that.data.textareaValue + e.currentTarget.dataset.topicname + "#"
    that.setData({
      textareaValue: newTextareaValue,
      isAddTopic: false
    });
  },

  // 跳转到@好友页面
  toAtFriends: function () {
    wx.navigateTo({
      url: '/pages/atFriends/atFriends',
    })
  },

  // 添加图片
  addPhoto: function () {
    var that = this;

    if (that.data.photoType == 0) {
      that.setData({
        typeShow: true
      });
    } else if (that.data.photoType == 1) {
      var count = 9 - that.data.photoList.length;
      wx.chooseImage({
        count: count,
        sizeType: ['compressed'],
        success: function (res) {
          var newPhotoList = that.data.photoList.concat(res.tempFilePaths);
          that.setData({
            photoList: newPhotoList
          });
        },
      })
    } else if (that.data.photoType == 2) {
      if (that.data.photoList.length < 3) {
        wx.chooseVideo({
          maxDuration: 30,
          success: function (res) {
            if (res.size <= 9437184) {
              that.data.photoList.push(res.tempFilePath);
              that.setData({
                photoList: that.data.photoList
              });
            } else {
              wx.showToast({
                title: '选择的视频过大',
                image: '/images/icon/unhappy.png',
                mask: true,
                duration: 1500
              })
            }
          }
        })
      }
    }
  },

  // 选择添加图片
  choicePhoto: function () {
    var that = this;

    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      success: function (res) {
        var newPhotoList = that.data.photoList.concat(res.tempFilePaths);
        that.setData({
          photoList: newPhotoList,
          photoType: 1,
          typeShow: false
        });
      },
    })
  },

  // 选择添加视频
  choiceVideo: function () {
    var that = this;

    wx.chooseVideo({
      maxDuration: 30,
      success: function (res) {
        if (res.size <= 9437184) {
          that.data.photoList.push(res.tempFilePath);
          that.setData({
            photoList: that.data.photoList,
            photoType: 2,
            typeShow: false
          });
        } else {
          wx.showToast({
            title: '选择的视频过大',
            image: '/images/icon/unhappy.png',
            mask: true,
            duration: 1500
          })
        }
      }
    })
  },

  // 取消选择
  cancalShare: function () {
    var that = this;

    that.setData({
      typeShow: false
    });
  },

  // 删除添加的图片
  delPhoto: function (e) {
    var that = this;

    var newPhotoList = [];
    for (var i = 0; i < that.data.photoList.length; i++) {
      if (i != e.currentTarget.dataset.index) {
        newPhotoList.push(that.data.photoList[i]);
      }
    }
    if (newPhotoList.length <= 0) {
      that.setData({
        photoType: 0
      });
    }
    that.setData({
      photoList: newPhotoList
    });
  },

  // 获取热门话题
  getTopicList: function (topicName) {
    var that = this;

    wx.request({
      url: that.data.serverIp + "common/getTopic",
      data: {
        topicName: topicName
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            topicList: res.data.data
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求超时',
          image: '/images/icon/unhappy.png',
          mask: true,
          duration: 1500
        })
      }
    })
  },

  // 添加位置
  toAddLocation: function () {
    wx.navigateTo({
      url: '/pages/addLocation/addLocation',
    })
  },

  // 删除位置
  delLocation: function () {
    var that = this;

    var location = {
      title: "",
      latitude: -1,
      longitude: -1
    };
    that.setData({
      location: location
    });
    app.globalData.location = location;
  },

  // 发布动态
  formSubmit: function (e) {
    var that = this;

    var content = e.detail.value.textareaValue.trim();
    if (!content && that.data.photoList.length <= 0) {
      wx.showToast({
        title: '内容不能为空',
        image: '/images/index/unhappy.png',
        mask: true,
        duration: 1500
      })
    } else {
      wx.showLoading({
        title: '发布中...',
        mask: true
      })

      wx.request({
        url: that.data.serverIp + 'dynamic/send',
        data: {
          openId: wx.getStorageSync('userInfo').openId,
          content: e.detail.value.textareaValue,
          location: e.detail.value.title,
          latitude: e.detail.value.latitude,
          longitude: e.detail.value.longitude,
          atFriendsOpenId: app.globalData.atFriendsOpenId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        success: function (res) {
          if (res.data.code == 0) {
            // 发送图片
            that.sendPhoto(wx.getStorageSync('userInfo').openId, res.data.data.dynamicId);
          } else {
            wx.hideLoading();
            wx.showToast({
              title: res.data.message,
              image: '/images/icon/unhappy.png',
              mask: true,
              duration: 1500
            })
          }
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({
            title: '请求超时',
            image: '/images/icon/unhappy.png',
            mask: true,
            duration: 1500
          })
        }
      })
    }
  },

  // 发送图片
  sendPhoto: function (openId, dynamicId) {
    var that = this;

    if (that.data.photoIndex < that.data.photoList.length) {
      wx.uploadFile({
        url: that.data.serverIp + 'dynamic/uploadPhoto',
        filePath: that.data.photoList[that.data.photoIndex],
        name: 'file',
        formData: {
          openId: openId,
          dynamicId: dynamicId,
          photoType: that.data.photoType
        },
        success: function (res) {
          console.log(res);
          if (res.data == "success") {
            that.setData({
              photoIndex: that.data.photoIndex + 1
            });

            that.sendPhoto(openId, dynamicId);
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '图片发送失败',
              image: '/images/icon/unhappy.png',
              mask: true,
              duration: 1500
            })
          }
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({
            title: '请求超时',
            image: '/images/icon/unhappy.png',
            mask: true,
            duration: 1500
          })
          that.setData({
            photoIndex: 0
          });
        }
      })
    } else {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
        mask: true,
        duration: 1500
      })
      app.globalData.refresh = true;
      wx.navigateBack({
        delta: 1
      })
    }
  }
})