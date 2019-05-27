//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '召唤好友', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    // 服务器地址
    serverIp: app.globalData.serverIp,
    // 好友列表
    friendsList: [],
    // 是否是输入名字搜索
    isSearch: false,

    // 总页数
    totalCount: 1,

    // 当前页数
    pageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getMutualFriends(1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    if (!isSearch) {
      if (that.data.pageIndex < that.data.totalCount) {
        that.setData({
          pageIndex: that.data.pageIndex + 1
        });
        that.getMutualFriends(that.data.pageIndex);
      }
    }
  },

  // 获取相互关注的好友
  getMutualFriends: function(pageIndex) {
    var that = this;
    wx.request({
      url: that.data.serverIp + 'user/getMutualFriends',
      data: {
        openId: wx.getStorageSync('userInfo').openId,
        pageIndex: pageIndex
      },
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            friendsList: res.data.data.friendsList,
            totalCount: res.data.data.totalCount,
            isSearch: false
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '请求超时',
          image: '/images/icon/unhappy.png',
          mask: true,
          duration: 1500
        })
      }
    })
  },

  // 输入要@的昵称
  searchFriends: function(e) {
    var that = this;

    if (e.detail.value != "") {
      wx.request({
        url: that.data.serverIp + "user/searchFriends",
        data: {
          nickName: e.detail.value,
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        success: function(res) {
          if (res.data.code == 0) {
            that.setData({
              friendsList: res.data.data,
              isSearch: true
            });
          }
        },
        fail: function() {
          wx.showToast({
            title: '请求超时',
            image: '/images/icon/unhappy.png',
            mask: true,
            duration: 1500
          })
        }
      })
    } else {
      that.getMutualFriends(1);
    }
  },

  // 选择要@的好友
  atFriends: function(e) {
    var flag = false;
    for (var i = 0; i < app.globalData.atFriendsOpenId.length; i++) {
      if (app.globalData.atFriendsOpenId[i] == e.currentTarget.dataset.openid) {
        flag = true;
      }
    }
    if (!flag) {
      app.globalData.atFriendsOpenId.push(e.currentTarget.dataset.openid);
    }
    app.globalData.atFriendsNickName.push(e.currentTarget.dataset.nickname);
    app.globalData.isAtFriends = true;

    wx.navigateBack({
      delta: 1
    })
  }
})