const {https} = require("./https.js");
const QQMapWX = require('../libs/qqmap-wx-jssdk.js');

/*这是加载微信内部请求的方法*/
module.exports = class wxapi {
  
/* 对象全局默认产生函数 一定要通过 new 才能实现的*/
  constructor(){
    this.qqmapsdk = new QQMapWX({
      key:'2ACBZ-LDA6O-MFKWZ-S42WA-6LMF2-3TBGL'
    });
  }

  /**
     * 获取用户当前的授权状态。
     * 说明：如果授权成功则调用 resolve() 授权失败则 reject()
     */
  getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: resolve,
        fail: reject
      });
    });
  }



/*
  小程序获取 code 
  res {string} code
 说明 小程序调用 wx.login() 获取凭证 并传给服务器
       开发者服务器以code 换取用户唯一标识 openid 和 会话密钥session_key
*/
login(){
  return new Promise((resolve,reject)=>{ 
    wx.login({
        success:resolve,
        fail:reject
    })
  })
}

/* 
  获取当前用户信息
  这个接口注意事项------------必须是在用户已经授权的情况下调用
*/
  userInfo(){ 
      return new Promise((resolve,reject)=>{ 
        wx.getUserInfo({ 
          success: resolve,
          fail: reject
        })
      })

  }

  /**
 * 获取授权位置
 * @param {String} type 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
 */
  getLocation(type) {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: type || 'wgs84',
        success: resolve,
        fail: reject
      });
    })
  }

  /**
 * 根据 经纬度 获取详细位置
 * @param {Number} lat 经度
 * @param {Number} lon 纬度
 */
  getReverseGeocoder(lat,lon){
    return new Promise((resolve, reject) => {
      this.qqmapsdk.reverseGeocoder({
        location: {
          latitude: lat,
          longitude: lon
        },
        success: resolve,
        fail: reject,
      });
    });
  }


  /**
  * 调起微信支付
  * @param {Object} obj 参数文档：https://developers.weixin.qq.com/miniprogram/dev/api/api-pay.html?search-key=requestPayment
  */
  requestPayment(obj) {
    return new Promise((reslove, reject) => {
      wx.requestPayment({
        timeStamp: obj.timeStamp,
        nonceStr: obj.nonceStr,
        package: obj.packageValue,
        signType: obj.signType,
        paySign: obj.paySign,
        success: reslove,
        fail: reject
      })
    })
  }




}