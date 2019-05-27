// 转化时间戳
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  const hour = parseInt(time / 3600, 10)
  time %= 3600
  const minute = parseInt(time / 60, 10)
  time = parseInt(time % 60, 10)
  const second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

// 获取多久前
const how_long_ago = date => {
  var oldTime = date / 1000;
  var nowTime = new Date().getTime() / 1000;
  var difference = nowTime - oldTime;
  if (difference <= 10) {
    return '10秒钟前';
  } else if (difference <= 20) {
    return '20秒钟前';
  } else if (difference <= 20) {
    return '20秒钟前';
  } else if (difference <= 30) {
    return '30秒钟前';
  } else if (difference <= 40) {
    return '40秒钟前';
  } else if (difference <= 50) {
    return '50秒钟前';
  } else if (difference <= 60) {
    return '1分钟前';
  } else if (difference <= 120) {
    return '2分钟前';
  } else if (difference <= 180) {
    return '3分钟前';
  } else if (difference <= 240) {
    return '4分钟前';
  } else if (difference <= 300) {
    return '5分钟前';
  } else if (difference <= 360) {
    return '6分钟前';
  } else if (difference <= 420) {
    return '7分钟前';
  } else if (difference <= 480) {
    return '8分钟前';
  } else if (difference <= 540) {
    return '9分钟前';
  } else if (difference <= 600) {
    return '10分钟前';
  } else if (difference <= 1200) {
    return '20分钟前';
  } else if (difference <= 1800) {
    return '30分钟前';
  } else if (difference <= 2400) {
    return '40分钟前';
  } else if (difference <= 3000) {
    return '50分钟前';
  } else if (difference <= 3600) {
    return '1小时前';
  } else if (difference <= 7200) {
    return '2小时前';
  } else if (difference <= 10800) {
    return '3小时前';
  } else if (difference <= 14400) {
    return '4小时前';
  } else if (difference <= 18000) {
    return '5小时前';
  } else if (difference <= 21600) {
    return '6小时前';
  } else if (difference <= 25200) {
    return '7小时前';
  } else if (difference <= 28800) {
    return '8小时前';
  } else if (difference <= 32400) {
    return '9小时前';
  } else if (difference <= 36000) {
    return '10小时前';
  } else if (difference <= 39600) {
    return '11小时前';
  } else if (difference <= 43200) {
    return '12小时前';
  } else if (difference <= 46800) {
    return '13小时前';
  } else if (difference <= 50400) {
    return '14小时前';
  } else if (difference <= 54000) {
    return '15小时前';
  } else if (difference <= 57600) {
    return '16小时前';
  } else if (difference <= 61200) {
    return '17小时前';
  } else if (difference <= 64800) {
    return '18小时前';
  } else if (difference <= 68400) {
    return '19小时前';
  } else if (difference <= 72000) {
    return '20小时前';
  } else if (difference <= 75600) {
    return '21小时前';
  } else if (difference <= 79200) {
    return '22小时前';
  } else if (difference <= 82800) {
    return '23小时前';
  } else if (difference <= 86400) {
    return '1天前';
  } else {
    var time = new Date(date);
    var Y = time.getFullYear();
    var M = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    var D = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    return Y + '-' + M + '-' + D;
  }
}

// 获取动态列表
function getDynamicList(that, beOpenId, dynamicId) {
  wx.request({
    url: that.data.serverIp + 'dynamic/getDynamicList',
    data: {
      openId: wx.getStorageSync('userInfo').openId,
      beOpenId: beOpenId,
      dynamicId: dynamicId
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    success: function (res) {
      console.log(res);
      if (res.data.code == 0) {
        var list = res.data.data;
        for (var i = 0; i < list.length; i++) {
          list[i].createTime = how_long_ago(list[i].times);
          if (list[i].commentNum > 0) {
            list[i].open = true;
          }
        }
        if (dynamicId != 0) {
          list = that.data.dynamicList.concat(list);
        }
        that.setData({
          dynamicList: list
        });
      }

      // 停止当前页面下拉刷新
      wx.stopPullDownRefresh();

      wx.hideLoading();
    },
    fail: function () {
      // 停止当前页面下拉刷新
      wx.stopPullDownRefresh();

      wx.hideLoading();

      wx.showToast({
        title: '请求超时',
        image: '/images/index/unhappy.png',
        mask: true,
        duration: 1500
      })
    }
  })
}

// 删除动态
function delDynamic(that, dynamicid) {
  wx.showModal({
    content: '确认删除该动态？',
    confirmText: "确认",
    cancelText: "取消",
    success: function (res) {
      if (res.confirm) {
        wx.request({
          url: that.data.serverIp + 'dynamic/delDynamic',
          data: {
            openId: wx.getStorageSync('userInfo').openId,
            dynamicId: dynamicid
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          success: function (res) {
            if (res.data.code == 0) {
              wx.showToast({
                title: '删除成功',
                mask: true,
                duration: 1500
              })

              var newDynamicList = [];
              for (var i = 0; i < that.data.dynamicList.length; i++) {
                if (dynamicid != that.data.dynamicList[i].dynamicId) {
                  newDynamicList.push(that.data.dynamicList[i]);
                }
              }

              that.setData({
                dynamicList: newDynamicList
              });
            } else {
              wx.showToast({
                title: res.data.message,
                image: '/images/index/unhappy.png',
                mask: true,
                duration: 1500
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: '请求超时',
              image: '/images/index/unhappy.png',
              mask: true,
              duration: 1500
            })
          }
        })
      }
    }
  });
}

// 点赞和取消点赞
function toLike(that, openId, dynamicId, index) {
  wx.request({
    url: that.data.serverIp + 'news/like',
    data: {
      openId: wx.getStorageSync('userInfo').openId,
      beOpenId: openId,
      dynamicId: dynamicId
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    success: function (res) {
      if (res.data.code == 0) {
        if (that.data.dynamicList[index].isLike) {
          that.data.dynamicList[index].isLike = false;
          that.data.dynamicList[index].likeNum = that.data.dynamicList[index].likeNum - 1;
          that.setData({
            dynamicList: that.data.dynamicList
          });
        } else {
          that.data.dynamicList[index].isLike = true;
          that.data.dynamicList[index].likeNum = that.data.dynamicList[index].likeNum + 1;
          that.setData({
            dynamicList: that.data.dynamicList
          });
        }
      } else {
        wx.showToast({
          title: res.data.message,
          image: '/images/index/unhappy.png',
          mask: true,
          duration: 1500
        })
      }
    },
    fail: function () {
      wx.showToast({
        title: '请求超时',
        image: '/images/index/unhappy.png',
        mask: true,
        duration: 1500
      })
    }
  })
}

// 展开或者收起评论
function openOrTakeUp(that, index) {
  if (that.data.dynamicList[index].open) {
    that.data.dynamicList[index].open = false;
    that.setData({
      dynamicList: that.data.dynamicList
    });
  } else {
    that.data.dynamicList[index].open = true;
    that.setData({
      dynamicList: that.data.dynamicList
    });
  }
}

// 分享获取奖励
function share(that, openId) {
  wx.request({
    url: that.data.serverIp + 'currency/share',
    data: {
      openId: openId
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    success: function (res) {

    },
    fail: function () {
      wx.showToast({
        title: '请求超时',
        image: '/images/index/unhappy.png',
        mask: true,
        duration: 1500
      })
    }
  })
}

//计算两地之间的距离
function getDistance(lat1, lng1, lat2, lng2) {

  var EARTH_RADIUS = 6378137.0; //单位M
  var PI = Math.PI;

  function getRad(d) {
    return d * PI / 180.0;
  }

  var radLat1 = getRad(lat1);
  var radLat2 = getRad(lat2);

  var a = radLat1 - radLat2;
  var b = getRad(lng1) - getRad(lng2);

  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000.0;

  return s;
}

// 进入话题页
function toTopic(topicName) {
  wx.navigateTo({
    url: '/pages/topic/topic?topicName=' + topicName,
  })
}

/* 去掉表情*/
function fliter(str) {
  return str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
}

/**
 * input 搜索防抖
 * @param fn
 * @param delay
 * @returns {Function}
 */
function debounce(fn, delay) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}


module.exports = {
  formatTime: formatTime,
  how_long_ago: how_long_ago,
  getDynamicList: getDynamicList,
  delDynamic: delDynamic,
  toLike: toLike,
  openOrTakeUp: openOrTakeUp,
  share: share,
  getDistance: getDistance,
  toTopic: toTopic,
  fliter: fliter,
  debounce:debounce
}
