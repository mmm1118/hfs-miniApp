const {https} = require("./https.js"); /* 全局域名*/
module.exports=class myapi{
  /* 对象全局默认产生函数 一定要通过 new 才能实现的*/
  constructor(){
    
  }
  /*
    小程序登录接口 
    type:      post
    avatarurl: 用户头像 *
    code:      小程序code *
    inviteUid: 邀请人的用户ID 
    nickname: 用户昵称 *
    openid: 用户openId  
  */
  api_loin(data){
    return new Promise((reslove,reject)=>{
      wx.request({
        url:`${https}/app/userinfo/login`,
        header:{
          'content-type':'application/json'
        },
        method: 'POST',
        data: data,
        success:reslove,
        fail:reject
      })
    })
   }

  /* 
  查询当前用户信息
   type:      post
   sessionId  sessionId
  */
  userInformation(sessionId){
    return new Promise((reslove, reject)=>{ 
      wx.request({
        url: `${https}/app/userinfo/selectUserinfo?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        data:{},
        success: reslove,
        fail: reject
      })  
    })
  }
/*
用户首页查看@，点赞，评论等信息 我的信息列表那一块
type      :post 
sessionId :标识id
pageIndex :第几页
pageSize  :每叶大小
*/
  getuserhomeL(sessionId,data){ 
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/userhome/getuserhome?sessionId=${sessionId}`,
        header: {
          'content-type':'application/json'
        },
        method:'GET',
        data:data,
        success: reslove,
        fail: reject
      })
    })
  }
   
/* 删除 动态 
type:      post
dynamicId: 动态id
*/   
  dynamicIddelete(sessionId,data){ 
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/dynamic/delete?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method:'GET',
        data:data,
        success: reslove,
        fail: reject
      })
    })
  }


  /* 
  删除 @ 艾特 接口 
  type  post 
  atid  ：atid
  */
  deleteUserAt(sessionId,data) {
    return new Promise((reslove, reject) => {
      console.log(sessionId +'----',data)
      wx.request({
        url: `${https}/app/userhome/deleteUserAt?sessionId=${sessionId}`,
        header: {
          'content-type':'application/x-www-form-urlencoded'
        },
        method:'POST',
        data:data,
        success: reslove,
        fail: reject
      })
    })
  }

/* 
查询粉丝数量
type post
sessionId {string} 唯一标识id
openId    {string} openid
*/
  selectCountAllByBeOpenId(sessionId,data){
    return new Promise((reslove, reject) => {
      console.log(sessionId + '----', data)
      wx.request({
        url: `${https}/admin/user/selectCountAllByBeOpenId?sessionId=${sessionId}`,
        header: {
          'content-type':'application/x-www-form-urlencoded'
        },
        method:'POST',
        data: data,
        success: reslove,
        fail: reject
      })
    }) 
  }


  /* 
  查询关注数量
  type post
  sessionId {string} 唯一标识id
  openId    {string} openid
  */
  selectCountAllByOpenId(sessionId, data) {
    return new Promise((reslove, reject) => {
      console.log(sessionId + '----', data)
      wx.request({
        url: `${https}/admin/user/selectCountAllByOpenId?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        data: data,
        success: reslove,
        fail: reject
      })
    })
  }

/*
小程序用户查询自身动态记录
classId    {number}  根据圈子查动态（仅根据圈子查动态
pageIndex  {number}  第几页
pageSize:  {number}  每页大小
range:     {number}  查询附近的动态（仅附近接口使用该参数）
topicId    {number}  根据话题查动态（仅根据话题查动态）
*/
  selectDynamicByPage(sessionId,data){
    return new Promise((reslove, reject) => {
      console.log(sessionId + '----', data)
      wx.request({
        url: `${https}/app/dynamic/selectDynamicByPage?sessionId=${sessionId}`,
        header: {
          'content-type':'application/json'
        },
        method: 'POST',
        data: data,
        success: reslove,
        fail: reject
      })
    })
  }

  /* 
      查询用户详情
      type  get
      sessionId {string} 用户唯一标识
  */
  dynamic(sessionId,dynamicid){
    return new Promise((reslove, reject) => {
      wx.request({
        url:`${https}/app/dynamic/${dynamicid}?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: reslove,
        fail: reject
      })
    })
  }

/*
小程序用户分页获取动态的评论
type post
dynamicId {number} 动态id
pageIndex {number} 第几页
pageSize  {number} 每页多少内容
*/
  selectAllByPage(sessionId, data) {
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/comment/selectAllByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data:data,
        success: reslove,
        fail: reject
      })
    })
  }


  /*
  小程序用户评论的回复
  type post
  "beopenid" : {number}  "被回复用户openId",
  "commentid": {number}  "评论Id",
  "content"  : {string}  "回复内容",
  "dynamicid": {number}  "动态id"
  */
  saveReply(sessionId, data) {
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/comment/saveReply?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: data,
        success: reslove,
        fail: reject
      })
    })
  }


/*
小程序用户评论动态
type post
  beopenid  {number} 被评论用户openId
  classid   {number} 圈子id
  content   {string} 评论内容
  dynamicid {number} 动态Id
*/ 
saveComment(sessionId, data){
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${https}/app/comment/saveComment?sessionId=${sessionId}`,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: data,
      success: reslove,
      fail: reject
    })
  })
}


/* 小程序点赞 
type  post
dynamicId {unmber}  动态id
*/

  addLiketable(sessionId,data){
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${https}/app/dynamic/addLiketable?sessionId=${sessionId}`,
      header: {
        'content-type':'application/x-www-form-urlencoded'
      },
      method: 'GET',
      data: data,
      success: reslove,
      fail: reject
    })
  })
}

/*
取消点赞
type get
dynamicId {number} 动态标识
*/

cancelLiketable(sessionId, data){
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${https}/app/dynamic/cancelLiketable?sessionId=${sessionId}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      data: data,
      success: reslove,
      fail: reject
    })
  })
}

/* 用户添加收藏 
type post
beUserId  {number} 被收集ID
classId   {number} 社团ID
dynamicId {number} 动态ID

*/
  saveCollection(sessionId,data){ 
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${https}/app/dynamic/saveCollection?sessionId=${sessionId}`,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: data,
      success: reslove,
      fail: reject
    })
  })
}

/* 取消收藏 
  type get
  dynamicId {number} 动态标识
*/
  cancelCollection(sessionId,data){
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/dynamic/cancelCollection?sessionId=${sessionId}`,
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        data: data,
        success: reslove,
        fail: reject
      })
    }) 
}


/* 查询会员卡 
type number
sessionId {number} 标识id
*/
  getclassvipcard(sessionId){
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${https}/app/card/getclassvipcard?sessionId=${sessionId}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: reslove,
      fail: reject
    })
  })
}


  /* 查询纪念卡
  type number
  sessionId {number} 标识id
  */
  getsouvenircard(sessionId) {
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/card/getsouvenircard?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: reslove,
        fail: reject
      })
    })
  }


/* 
  查询签到 
  type get
  sessionId {number} 用户的唯一标识 
*/
  selectSigninQd(sessionId){
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/userinfo/selectSignin?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: reslove,
        fail: reject
      })
    }) 
  }


/*
type get
sessionId {number} 用户的唯一标识
*/
selectUserTask(sessionId) {
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/userinfo/selectUserTask?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: reslove,
        fail: reject
      })
    })
  } 


/*
用户分享按钮
*/
addShareNum(sessionId) {
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${https}/app/userinfo/addShareNum?sessionId=${sessionId}`,
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: reslove,
      fail: reject
    })
  })
} 

/*
  用户点击完成任务
  type get 
  sessionId {number} 用户的唯一标识
*/
  finishTask(sessionId, taskid){
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${https}/app/userinfo/finishTask?sessionId=${sessionId}&taskId=${taskid}`,
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:'GET',
      success:reslove,
      fail:reject
    })
  })
}

/*
小程序分页查询所有的商品
  type post
  sessionId : {number} 用户的唯一标识
  goodsname : {number} 商品名称
  pageIndex : {number} 第几页
  pageSize  : {number} 每页大小
*/
findGoodsByPage(sessionId,data){
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${https}/app/goods/findGoodsByPage?sessionId=${sessionId}`,
      header:{
        'content-type': 'application/json'
      },
      method:'POST',
      data:data,
      success:reslove,
      fail:reject
    })
  })
}

/*
小程序查询商品详情
type get
sessionId {number}  用户的唯一标识
goodsId   {number}  商品id
*/
  selectGoodsDetail(sessionId,goodsId){
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/goods/selectGoodsDetail?sessionId=${sessionId}&goodsId=${goodsId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: reslove,
        fail: reject
      })
    })    
  }

/*
小程序查询兑换记录
type post
sessionId : {number} 用户的唯一标识
ordersQuery : {number} 非必传
pageSize    : {number} 每页大小
pageIndex   : {number} 第几页
topicname   : {string} 话题名字 非必传
*/
  findOrdersByPage(sessionId,data){ 
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/order/findOrdersByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: data,
        success: reslove,
        fail: reject
      })
    })      
  }

/*删除商品订单
type get
sessionId : {number} 用户的唯一标识
ordersId  : {unmber} 订单id
*/
  updateShow(sessionId, ordersId){
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/order/updateShow?sessionId=${sessionId}&ordersId=${ordersId}`,
        header: {
          'content-type': 'application/json'
        },
        method:'GET',
        success: reslove,
        fail: reject
      })
    })    
}
/*
微信兑换礼品支付接口
type get
sessionId : {number} 用户的唯一标识
addressId : {number} 用户地址id
goodsid   : {number} 商品id
*/
giftExchange(sessionId,data){
  return new Promise((reslove, reject) => {
    wx.request({
      url:`${https}/orders/pay/giftExchange?sessionId=${sessionId}`,
      header:{
        'content-type': 'application/json'
      },
      method: 'POST',
      data: data,
      success: reslove,
      fail: reject
    })
  }) 
}



/*
用户查询所有地址
type  post 
sessionId {number} sessionId
*/
  selectAlladder(sessionId){
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${https}/app/user/address/selectAll?sessionId=${sessionId}`,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: reslove,
      fail: reject
    })
  })
}


/*
  添加地址  修改地址 
  sessionId {number} sessionId
  detail : "详细地址
  id       : 1
  isDefault: "0
  location : "所在地区
  phone    : 123456
  userName : 收货人姓名
*/

  saveUserAddress(sessionId, data){
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/user/address/saveUserAddress?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        data:data,
        method: 'POST',
        success:reslove,
        fail:reject
      })
    })
  }

  /*
  查询地址详情
  type post
  sessionId {number} sessionId
  Id        {number} Id
  */
  selectById(sessionId,data){
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/user/address/selectById?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        data:data,
        success: reslove,
        fail: reject
      })
    })
  }

  /*
删除地址
  type post
  sessionId {number} sessionId
  id        {number} id
  */
  addressDelete(sessionId,id){ 
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/user/address/delete?sessionId=${sessionId}&id=${id}`,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',

        success: reslove,
        fail: reject
      })
    })   
  }


/*
分页查询用户礼物列表(日月排行榜)
 type post
 sessionId {number} sessionId
 condition: {number} 查询条件（按天查：D，按月查：M） 
 pageIndex: {number} 第几页
 pageSize : {number} 每页大小
*/
  getgiftdatelist(sessionId,data){ 
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/gift/getgiftdatelist?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        data:data,
        method:'POST',
        success:reslove,
        fail: reject
      })
    }) 
  }


/* 

礼物排行月榜赠送礼物详情
sessionId     {number} sessionId
pageIndex   : {number}  第几页
pageSize    : {number}  每页大小
presenterId : {number}  赠送者id
theMonth    : {number}  几月
*/
  getgiftmonthinfopage(sessionId,data){ 
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/gift/getgiftmonthinfopage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        data: data,
        method: 'POST',
        success: reslove,
        fail: reject
      })
    }) 
  }



/* 
小程序用户查询收藏的动态
  sessionId  {number} sessionId
  classId  :{number}  根据圈子查动态（仅根据圈子查动态）",
  pageIndex:{number} "第几页",
  pageSize :{number} "每页大小",
  range    :{number} 查询附近的动态（仅附近接口使用该参数）",
  topicId  :{number} 根据话题查动态（仅根据话题查动态）"

*/
  selectCollectionDynamicByPage(sessionId, data) {
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/dynamic/selectCollectionDynamicByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        data: data,
        method: 'POST',
        success: reslove,
        fail: reject
      })
    })
  }

/* 
将用户移除黑名单列表
 type post 
 sessionId  {number}  sessionId
*/ 

  findBlackByPage(sessionId,data){ 
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/black/list/findBlackByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        data:data,
        method: 'POST',
        success: reslove,
        fail: reject
      })
    })     
  }


  /* 
  将用户移除黑名单
  /app/black/list/removeBlackList
    sessionId  {number}  sessionId
    openid     {number}  openid
  */
  removeBlackList(sessionId, openid){ 
    return new Promise((reslove, reject) => {
      wx.request({
        url:`${https}/app/black/list/removeBlackList?sessionId=${sessionId}&openId=${openid}`,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: reslove,
        fail: reject
      })
    }) 
  }

  /*
  用户提交反馈
    sessionId  {number}  sessionId
   channel : {string} "用户渠道（H5 , Pc）",
   content : {string} "反馈内容",
   linkman : {string} "联系人",
   linkman : {number} "联系人",
   title   : {string}  "标题"
  */
  insertback(sessionId,data) {
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/user/back/insertback?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        data:data,
        method: 'POST',
        success: reslove,
        fail: reject
      })
    })
  }

  /* 
  小程序用户查询粉丝
  sessionId  {number}  sessionId
  pageIndex: {number} 第几页
  pageSiz  : {number} 每页大小
  userId   : {number} 用户Id
  */
  selectFansByPage(sessionId,data){
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/follow/selectFansByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        data: data,
        method: 'POST',
        success: reslove,
        fail: reject
      })
    })
  }
/*
  小程序用户查询关注的人
  sessionId  {number}  sessionId
  pageIndex: {number} 第几页
  pageSiz  : {number} 每页大小
  userId   : {number} 用户Id
*/
  selectFollowByPage(sessionId, data) {
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/app/follow/selectFollowByPage?sessionId=${sessionId}`,
        header: {
          'content-type': 'application/json'
        },
        data:data,
        method:'POST',
        success: reslove,
        fail: reject
      })
    })
  }

/*
/admin/user/selectFollowEachOther
查询两个用户是否互相关注
openId {unmber} openId
*/
  selectFollowEachOther(sessionId,openId){ 
    return new Promise((reslove, reject) => {
      wx.request({
        url: `${https}/admin/user/selectFollowEachOther?sessionId=${sessionId}&openId=${openId}`,
        header: {
          'content-type': 'application/json'
        },
        method:'GET',
        success: reslove,
        fail: reject
      })
    })
}


}