import Fetch from './circleFetch'

module.exports = class Circle extends Fetch {
  constructor() {
    super()
  }

  /**
   * 小程序用户创建一个圈子
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _addCircleClass(data) {
    const params = {
      url: '/app/circle/class/addCircleClass',
      method: 'POST',
      loadingText: '创建中',
      data
    }
    return this.$http(params)
  }

  /**
   * 小程序分页查询所有认证社团
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _findCircleClassAuthByPage(data) {
    const params = {
      url: '/app/circle/class/findCircleClassAuthByPage',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 小程序分页查询所有认证社团(精彩推荐)
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _findCircleClassNoAuthByPage(data) {
    const params = {
      url: '/app/circle/class/findCircleClassNoAuthByPage',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 查询当前用户关注的社团
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _selectFollowCircleClass(data) {
    const params = {
      url: '/app/circle/class/selectFollowCircleClass',
      data
    }
    return this.$http(params)
  }

  /**
   * 查询社团的详情
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _selectCircleClassDetail(data) {
    const params = {
      url: '/app/circle/class/selectCircleClassDetail',
      data
    }
    return this.$http(params)
  }

  /**
   * 查询所有的公告
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _findByPage(data) {
    const params = {
      url: '/app/circle/notice/history/findByPage',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 查询公告详情
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _selectCircleNoticeDetail(data) {
    const params = {
      url: '/app/circle/notice/history/selectCircleNoticeDetail',
      data
    }
    return this.$http(params)
  }

  /**
   * 添加公告
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _sendNotice(data) {
    const params = {
      url: '/app/circle/notice/history/save',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 申请加入圈子
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _saveCircleJoinapply(data) {
    const params = {
      url: '/app/circle/joinapply/saveCircleJoinapply',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 直接加入圈子
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _addUserCircle(data) {
    const params = {
      url: '/app/user/circle/addUserCircle',
      data
    }
    return this.$http(params)
  }

  /**
   * 分页获取动态记录
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _selectAllByPage(data) {
    const params = {
      url: '/app/dynamic/selectAllByPage',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 用户查询圈子的动态
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _selectCircleDynamicByPage(data) {
    const params = {
      url: '/app/dynamic/selectCircleDynamicByPage',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 添加点赞
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _addLiketable(data) {
    const params = {
      url: '/app/dynamic/addLiketable',
      data,
      isNoLoading: true
    }
    return this.$http(params)
  }

  /**
   * 取消点赞
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _cancelLiketable(data) {
    const params = {
      url: '/app/dynamic/cancelLiketable',
      data,
      isNoLoading: true
    }
    return this.$http(params)
  }

  /**
   * path:pages/index,pages/index/stateDetail/stateDetail
   * 添加收藏
   * dynamicId
   */
  _addCollection(data) {
    const params = {
      url: '/app/dynamic/saveCollection',
      data,
      isNoLoading: true
    }
    return this.$http(params)
  }

  /**
   * 取消收藏
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _cancelCollection(data) {
    const params = {
      url: '/app/dynamic/cancelCollection',
      data,
      isNoLoading: true
    }
    return this.$http(params)
  }

  /**
   * 关注
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _saveFollow(data) {
    const params = {
      url: '/app/follow/saveFollow',
      data,
      method: 'POST',
      isNoLoading: true
    }
    return this.$http(params)
  }

  /**
   * 取消关注
   * @param data -delete
   * @returns {Promise<any>}
   * @private
   */
  _cancelFollow(data) {
    const params = {
      url: '/app/follow/deleteByBeOpenId',
      data,
      method: 'DELETE',
      isNoLoading: true
    }
    return this.$http(params)
  }

  /**
   * 分页查询所有的活动
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _selectByPageInHome(data) {
    const params = {
      url: '/app/circle/activity/selectByPageInHome',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 分页查询所有的留言
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _findByMessagePage(data) {
    const params = {
      url: '/app/circle/message/findByPage',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 添加留言
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _saveCircleMessage(data) {
    const params = {
      url: '/app/circle/message/saveCircleMessage',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 查询社团用户
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _selectCircleClassUser(data) {
    const params = {
      url: '/app/user/circle/selectCircleClassUser',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 查询圈子会员卡
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _findOneVipCard(data) {
    const params = {
      url: '/app/circle/member/card/findOne',
      // url: '/app/card/classvipcard',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 查询纪念卡
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _findsouvenircard(data) {
    const params = {
      url: '/app/card/getsouvenircard',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 小程序查询社团所有组
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _findAllGroup(data) {
    const params = {
      url: '/app/circle/grouping/findAll',
      method: 'POST',
      data
    }
    return this.$http(params)
  }

  /**
   * 新增组
   * @param data
   * @returns {Promise<any>}
   * @private
   */
  _addGroup(data) {
    const params = {
      url: '/app/circle/grouping/add',
      method: 'POST',
      data
    }
    return this.$http(params)
  }
}
