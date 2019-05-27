/* 公共的域名和 请求方法 全在这里面*/
const https = function http() {
  const testhttp = 'http://192.168.2.116:60802/api'; //测试域名接口
  const hosthttp = 'https://hfs.luoshuchuanmei.com/api'; //正式接口
  return hosthttp;
}

/**
 * 公共POST请求，
 * URL ：接口
 * data: 数据
 * contentType 请求头的类型
 * resolve 成功返回
 * reject  是被返回
 */
function postData(url, postData, contentType) {
  console.log(url)
  console.log(postData)
  var host = https(); /* 接收的域名 */
  if (url == undefined || postData == undefined) {
    console.log('post请求错误,请检查');
    return false
  }
  return new Promise((resolve, reject) => {
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      method: 'POST',
      url: `${host}${url}`,
      header: {
        'content-type': contentType || 'application/x-www-form-urlencoded'
      },
      data: postData,
      success: resolve
    })
  })
}

function getData(url) {
  var host = https(); /* 接收的域名 */
  console.log(host)
  if (url == undefined) {
    console.log('get请求错误,请检查');
    return false
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${host}${url}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: resolve
    })
  })
}

/**
 * 公用 post和get请求
 */
function postHttp(url, data, sessionId) {
  // 域名
  var homeUrl = https();

  wx.showLoading({
    title: '数据加载中...',
    mask: 'true'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${homeUrl}${url}`,
      data: data ? data : {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: resolve,
      fail: reject
    })
  })
}

function getHttp(url, data, sessionId) {
  // 域名
  const homeUrl = https();
  wx.showLoading({
    title: '数据加载中...',
    mask: 'true'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${homeUrl}${url}?sessionId=${sessionId}`,
      data: data ? data : {},
      success: resolve,
      fail: reject
    })
  })
}



module.exports = {
  https: https(),
  postData: postData,
  getData: getData,
  postHttp: postHttp,
  getHttp: getHttp
}
