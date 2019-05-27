const {https} = require("./https.js"); /* 全局域名*/
module.exports = class MODULE1 {
    /* 对象全局默认产生函数 一定要通过 new 才能实现的*/
    constructor() {
        this.host = https;
    }

    /**
     * 请求公共方法
     *
     * */
    $http(params) {
        let sessionId = wx.getStorageSync('sessionId')

        return new Promise((resolve, reject) => {
            wx.request({
                method: params.method || 'POST',
                url: `${this.host}${params.url}?sessionId=${sessionId}`,
                header: {
                    'content-type': params.contentType || 'application/json' || 'application/x-www-form-urlencoded' // application/json
                },
                data: params.data || {},
                success: (res) => {
                    if (res.data.status === 200) {
                        resolve(res.data.data)
                    } else {
                        reject(res.data.msg)
                    }
                },
                fail: reject
            })
        })
    }

    /**
     * 获取奏折分类
     *
     * */
    getAllZouzheType() {
        return this.$http({
            url: '/user/zouzhe/getAllZouzheType',
            method: 'GET'
        })
    }

    /**
     * 获取分类奏折
     * "pageIndex": "第几页",
     * "pageSize": "每页大小",
     * "zouzheTypeId": "奏折分类id"
     * */
    getZouzheList(params) {
        return this.$http({
            url: '/user/zouzhe/getZouzheList',
            method: 'POST',
            data: params
        })
    }

    /**
     * 用户点击奏折
     * "id": "奏折Id",
     * "zouzheTypeId": "奏折分类id"
     * */
    clickZouzhe(id, zouzheTypeId) {
        return this.$http({
            url: '/user/zouzhe/clickZouzhe',
            method: 'POST',
            data: {
                "id": id,
                "zouzheTypeId": zouzheTypeId
            }
        })
    }

    /**
     * 小程序奏折轮播图的接口
     *
     * */
    findBannerByPage() {
        return this.$http({
            url: '/app/banner/findBannerByPage',
            method: 'POST',
            data: {
                "pageIndex": 1,
                "pageSize": 99
            }
        })
    }

    /**
     * 小程序奏折轮播图的接口2
     *
     * */
    selectAll() {
        return this.$http({
            url: '/app/banner/selectAll',
            method: 'GET'
        })
    }

    /**
     * 小程序用户查询已关注用户动态记录
     *
     * */
    selectFollowByPage(pageIndex) {
        return this.$http({
            url: '/app/dynamic/selectFollowByPage',
            data: {
                "pageIndex": pageIndex,
                "pageSize": 10,
            }
        })
    }

    /**
     * 查询活动的详情
     *
     * */
    selectDetails(activityId) {
        return this.$http({
            url: '/app/circle/activity/selectDetails',
            method: 'GET',
            data: {
                "activityId": activityId,
            }
        })
    }

    /**
     * 查询用户是否已经投过票
     *
     * */
    activityCheck(voteId) {
        return this.$http({
            url: '/app/circle/activity/check',
            method: 'GET',
            data: {
                "voteId": voteId,
            }
        })
    }

    /**
     * 用户进行投票
     *
     * */
    activityAddVoteUser(itemIds) {
        return this.$http({
            url: '/app/circle/activity/addVoteUser',
            method: 'GET',
            data: {
                "itemIds": itemIds,
            }
        })
    }

    /**
     * 查询用户投票情况
     *
     * */
    selectAllVoteUserByUserId(voteId) {
        return this.$http({
            url: '/app/circle/activity/selectAllVoteUserByUserId',
            method: 'GET',
            data: {
                "voteId": voteId,
            }
        })
    }

    /**
     * 小程序用户取消席位（发起支付之后，需要调用该接口）
     * seatSaveParam
     *   {
     *    "activityId": "活动ID",
     *    "seatNumbers": "座位号"
     *   }
     * */
    cancelSeats(seatSaveParam) {
        return this.$http({
            url: '/app/circle/activity/cancelSeats',
            data: {
                "seatSaveParam": seatSaveParam,
            }
        })
    }

    /**
     * 小程序用户选择席位（选座支付前，调用此方法）
     * seatSaveParam
     *   {
     *    "activityId": "活动ID",
     *    "seatNumbers": "座位号"
     *   }
     * */
    selectSeats(seatSaveParam) {
        return this.$http({
            url: '/app/circle/activity/selectSeats',
            data: {
                "seatSaveParam": seatSaveParam,
            }
        })
    }

    /**
     * 小程序分页查询所有认证社团，按照人数降序（认证社团
     * seatSaveParam
     *   {
     *    "activityId": "活动ID",
     *    "seatNumbers": "座位号"
     *   }
     * */
    /*findCircleClassAuthByPage(seatSaveParam) {
        return this.$http({
            url: '/app/circle/class/findCircleClassAuthByPage',
            method: 'POST',
            data: {
                "seatSaveParam": seatSaveParam,
            }
        })
    }*/
}
