var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址列表
    locationList: [],

    // 地点关键字
    keyword: "",

    // 结果条数
    count: 0,

    // 当前页数
    pageIndex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'M6SBZ-KPGHJ-RDKF6-FP4OK-JIQ32-6HB4S'
    });

    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (e) {
            that.getLocationList(e.result.address);
          }
        });
      },
      fail: function (res) {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              that.openConfirm();
            }
          }
        })
      }
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
    var that = this;

    var allPageIndex = that.data.count % 10 == 0 ? that.data.count / 10 : that.data.count / 10 + 1;
    if (that.data.pageIndex < allPageIndex) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      that.setData({
        pageIndex: that.data.pageIndex + 1
      });
      that.getLocationList(that.data.keyword, that.data.pageIndex);
    }
  },

  // 输入位置
  searchLocation: function (e) {
    var that = this;

    that.setData({
      keyword: e.detail.value,
      locationList: [],
      count: 0,
      pageIndex: 1
    });
    that.getLocationList(that.data.keyword);
  },

  // 获取位置列表
  getLocationList: function (keyword, pageIndex) {
    var that = this;
    console.log(111)
    qqmapsdk.search({
      keyword: keyword,
      page_index: pageIndex,
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          var newLocationList = that.data.locationList.concat(res.data);
          that.setData({
            locationList: newLocationList,
            count: res.count
          });

          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.message,
            image: '/images/icon/unhappy.png',
            mask: true,
            duration: 2500
          })
        }
      }
    });
  },

  // 选择位置
  addLocation: function (e) {
    var location = {
      title: "",
      latitude: -1,
      longitude: -1
    };
    location.title = e.currentTarget.dataset.title;
    location.latitude = e.currentTarget.dataset.latitude;
    location.longitude = e.currentTarget.dataset.longitude;
    app.globalData.location = location;

    wx.navigateBack({
      delta: 1
    })
  },

  // 打开位置权限
  openConfirm: function () {
    wx.showModal({
      content: '检测到您没打开汉服司的定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => { }
          })
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
        }
      },

    });
  }
})