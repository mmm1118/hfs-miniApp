// 首页数据接口
const {
  https
} = require("./https.js");
module.exports = class recom {

  /**
   * path:pages/index
   * query 分页参数
   * 获取首页轮播图列表
   */
  swiperData(sessionId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/banner/findBannerByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: {
          "pageIndex": 1,
          "pageSize": 99
        },
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          console.log(res, "请求失败")
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }
  /**
   * path:pages/index
   * query 分页参数
   * 获取首页分类列表
   */
  classfyData(sessionId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/classify/findClassifyByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: {
          "pageIndex": 1,
          "pageSize": 99
        },
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          console.log(res, "请求失败")
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }
  /**
   * path:pages/index
   * 获取首页动态列表
   * 参数:{
      "classId": "根据圈子查动态（仅根据圈子查动态）",
      "pageIndex": "第几页",
      "pageSize": "每页大小",
      "range": "查询附近的动态（仅附近接口使用该参数）",
      "topicId": "根据话题查动态（仅根据话题查动态）"
    } 
   */
  dynamicData(sessionId, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/selectAllByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: data,
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 删除动态
   * dynamicId
   */
  deleteDynamic(sessionId, dynamicId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/delete?sessionId=${sessionId}&dynamicId=${dynamicId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 添加点赞
   * dynamicId
   */
  addLike(sessionId, dynamicId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/addLiketable?sessionId=${sessionId}&dynamicId=${dynamicId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 取消点赞
   * dynamicId
   */
  cancelLike(sessionId, dynamicId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/cancelLiketable?sessionId=${sessionId}&dynamicId=${dynamicId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 取消收藏
   * dynamicId
   */
  cancelCollection(sessionId, dynamicId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/cancelCollection?sessionId=${sessionId}&dynamicId=${dynamicId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }

   /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 添加收藏
   * dynamicId
   */
  addCollection(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/saveCollection?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }
  /**
   * path:pages/index/stateDetail/stateDetail
   * 关注用户
   * {
        "beUserId": "被关注用户userId",
        "followid": "主键ID"
      }
   */
  addFollow(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/follow/saveFollow?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }
  /**
   * path:pages/index/stateDetail/stateDetail
   * 取消关注
   * dynamicId
   */
  deleteFollow(sessionId, followId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/follow/delete?sessionId=${sessionId}&followId=${followId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
          wx.showToast({
            icon: "none",
            title: "请求失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }
  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 小程序用户查询圈子的动态
   * {
        "classId": "根据圈子查动态（仅根据圈子查动态）",
        "pageIndex": "第几页",
        "pageSize": "每页大小",
        "range": "查询附近的动态（仅附近接口使用该参数）",
        "topicId": "根据话题查动态（仅根据话题查动态）"
      }
   */
  selectCircleDynamic(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/selectCircleDynamicByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 小程序用户查询收藏的动态
   * {
      "classId": "根据圈子查动态（仅根据圈子查动态）",
      "pageIndex": "第几页",
      "pageSize": "每页大小",
      "range": "查询附近的动态（仅附近接口使用该参数）",
      "topicId": "根据话题查动态（仅根据话题查动态）"
    }
   */
  selectCollectionDynamic(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/selectCollectionDynamicByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 小程序用户查询自身动态记录
   * {
      "classId": "根据圈子查动态（仅根据圈子查动态）",
      "pageIndex": "第几页",
      "pageSize": "每页大小",
      "range": "查询附近的动态（仅附近接口使用该参数）",
      "topicId": "根据话题查动态（仅根据话题查动态）"
    }
   */
  selectDynamic(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/selectDynamicByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 小程序用户查询已关注用户动态记录
   * {
        "classId": "根据圈子查动态（仅根据圈子查动态）",
        "pageIndex": "第几页",
        "pageSize": "每页大小",
        "range": "查询附近的动态（仅附近接口使用该参数）",
        "topicId": "根据话题查动态（仅根据话题查动态）"
      }
   */
  selectFollowDynamic(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/selectFollowByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 小程序用户查询附近动态记录
   * {
        "classId": "根据圈子查动态（仅根据圈子查动态）",
        "pageIndex": "第几页",
        "pageSize": "每页大小",
        "range": "查询附近的动态（仅附近接口使用该参数）",
        "topicId": "根据话题查动态（仅根据话题查动态）"
      }
   */
  selectNearByDynamic(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/selectNearByByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 小程序用户根据话题查询动态
   * {
        "classId": "根据圈子查动态（仅根据圈子查动态）",
        "pageIndex": "第几页",
        "pageSize": "每页大小",
        "range": "查询附近的动态（仅附近接口使用该参数）",
        "topicId": "根据话题查动态（仅根据话题查动态）"
      }
   */
  selectTopicDynamic(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/selectTopicDynamicByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      })
    })
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 小程序用户发送动态
   * {
      "classid": "圈子Id",
      "content": "内容",
      "imageUrls": "图片的URL地址",
      "isShow": "0不是圈子可见，1是圈子可见",
      "latitude": "纬度",
      "location": "位置",
      "longitude": "经度",
      "page": "分享页面的url",
      "photoType": "1照片，2视频",
      "topicid": "1,2,3,4,",
      "topicnames": "新增话题"
    }
   */
  sendDynamic(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/dynamic/sendDynamic?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject => {
          wx.hideLoading();
          wx.showToast({
            title: '请求超时',
            image: '/images/icon/unhappy.png',
            mask: true,
            duration: 1500
          })
        }
      })
    })
  }
  /**
   * path:pages/send/send
   * 获取阿里云OSS文件上传表单
   * suffix
   */
  getOSSUploadFormData(sessionId, suffix) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/base/sys/mini/getOSSUploadFormData/${suffix}?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: res => {
          resolve(res.data);
        },
        fail: err => {
          wx.showToast({
            title: '请求超时',
            image: '/images/icon/unhappy.png',
            mask: true,
            duration: 1500
          })
          reject(err);
        }
      })
    })
  }
  
  /**
   * 活动相关
   * 
   */

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 分页查询所有的活动
   * {
        "classid": "圈子id",
        "pageIndex": "第几页",
        "pageSize": "每页大小",
        "sdh": "将活动同步到小程序活动栏，0不同步，1同步",
        "titleOrName": "后台进行查询（活动名或社团名）"
      }
   */
  selectAllActivity(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/circle/activity/selectByPageInHome?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      })
    })
  }
  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 查询活动详情
   * {
        "activityId": "活动ID",
      }
   */
  selectActivityDetail(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/circle/activity/selectDetails?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      })
    })
  }

  /**
   * path:pages/index
   * 查询附近的人信息
   * {
        "range": "",
      }
   */
  selectNearbyUser(sessionId, range) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/userinfo/selectNearbyUser?sessionId=${sessionId}&range=${range}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: res => {
          resolve(res.data);
        },
        fail: err => {
          reject(err);
          wx.showToast({
            icon: "none",
            title: "获取附近的人失败",
            image: '/images/icon/unhappy.png'
          })
        }
      })
    })
  }
  /**
   * path:pages/send/send
   * 小程序查找所有话题
   * {
        "pageIndex": "第几页",
        "pageSize": "每页大小",
        "topicname": "话题名字"
      }
   */
  findTopictableByPage(sessionId, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${https}/app/topic/table/findTopictableByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: params,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      })
    })
  }

}