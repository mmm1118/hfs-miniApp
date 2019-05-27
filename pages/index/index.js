var util = require("../../utils/util.js");
const {
    recom
} = require('./../../server/index.js')

const {module1} = require("./../../server/index");

var fetch = require('./../../server/circle.js')
// import ('./../../server/circle.js')
var app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        sessionId: '',
        latitude: '', //经纬
        longitude: '', //维度
        // tab切换索引
        currentTab: '0',
        // 轮播图列表
        bannerList: [{
            url: "/images/index/swiper01.png",
            pages: "/pages/index/index"
        }, {
            url: "/images/index/swiper01.png",
            pages: "/pages/index/index"
        }],
        classifyList: [{
            url: "/images/index/classify01.png",
            title: "社团"
        }, {
            url: "/images/index/classify02.png",
            title: "活动"
        }, {
            url: "/images/index/classify03.png",
            title: "话题"
        }],
        // 是否弹窗
        maskShows: false,
        // 分享是否展示
        dynamicId: false,
        // 附近气泡展示
        bubbleShows: false,
        // 动态列表
        dynamicList: [],
        // 关注列表
        attentionList: [1, 2],
        followPageIndex: 1,
        followPageCount: 1,
        // 地图
        markers: [],
        // 动态的第几页
        pageIndex: 1,
        // 附近范围
        range: 1
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // that.getLocation() //进入该界面就获取经纬度
        const sessionId = wx.getStorageSync('sessionId');
        if (typeof sessionId == 'string' && sessionId.length >= 1) {
            that.setData({
                sessionId: sessionId
            });
            this.swiperData();
            this.classfyData();
            this.dynamicData(1);
            this.selectFollowByPage()
        } else {
            wx.showToast({
                title: '您还未登陆',
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.mapCtx = wx.createMapContext('map');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },
    // 获取轮播图数据
    swiperData() {
        var that = this;
        recom.swiperData(that.data.sessionId).then(res => {
            console.log('轮播数据-----')
            console.log(res)
            that.setData({
                bannerList: res.data.bussData
            })
        })
    },
    // 获取首页分类数据
    classfyData() {
        var that = this;
        recom.classfyData(that.data.sessionId).then(res => {
            console.log('分类数据----')
            console.log(res)
            that.setData({
                classifyList: res.data.bussData
            })
        })
    },
    // 获取首页动态数据
    dynamicData(pageIndex) {
        var that = this;
        recom.dynamicData(that.data.sessionId, {
            "pageIndex": pageIndex,
            "pageSize": 10 * pageIndex
        }).then(res => {
            wx.hideLoading()
            console.log('动态数据----')
            console.log(res)
            that.setData({
                dynamicList: res.data.bussData
            })
            // 停止当前页面下拉刷新
            wx.stopPullDownRefresh();
        }).catch(rej => {
            // 停止当前页面下拉刷新
            wx.stopPullDownRefresh();
            rej()
        })
    },
    // 跳转到发布页
    toSend: function (e) {
        wx.navigateTo({
            url: '/pages/send/send',
        })
    },
    // 点击轮播图跳转
    toPage: function (e) {
        if (e.currentTarget.dataset.pages) {
            wx.navigateTo({
                url: e.currentTarget.dataset.pages,
            })
        }
    },
    // 跳转到动态详情页
    toStateDetail: function (e) {
        var that = this;
        const dynamicId = e.currentTarget.dataset.url;
        if (e.currentTarget.dataset.openid != 'hanfusi' || e.currentTarget.dataset.openid != 'sichuanhanfu') {
            wx.navigateTo({
                url: '/pages/index/stateDetail/stateDetail?dynamicId=' + dynamicId,
            })
        }
    },
    // 点击分类
    catClassify: function (e) {
        if (e.currentTarget.dataset.index == 1) {
            wx.navigateTo({
                url: '/pages/organization/organization',
            })
        } else if (e.currentTarget.dataset.index == 2) {
            wx.navigateTo({
                url: '/pages/activity/activity',
            })
        } else if (e.currentTarget.dataset.index == 3) {
            wx.navigateTo({
                url: '/pages/topic/topic',
            })
        }
    },

    /*
      地图返回经纬度 获取地址经纬度 一定要使用gcj02 类型，不然小程序返回经纬度对不上
    */
    getLocation() {
        const that = this;
        wx.getLocation({
            type: "gcj02",
            success: function (res) {
                console.log(res)
                if (res.errMsg == 'getLocation:ok') {
                    that.getNearbyUser(res.latitude, res.longitude);
                    that.setData({
                        latitude: res.latitude,
                        longitude: res.longitude
                    })
                } else {
                    wx.showToast({
                        title: '微信内置地图出错了',
                        icon: none
                    })
                }
            }
        })
    },

    /**
     * 点击tab切换
     */
    swichNav: function (e) {
        console.log(e)
        var that = this;
        if (that.data.currentTab === e.target.dataset.current) {
            return false;
        } else if (e.target.dataset.current == 2) {
            wx.getLocation({
                type: "gcj02",
                success: function (res) {
                    that.setData({
                        currentTab: e.target.dataset.current,
                        latitude: res.latitude,
                        longitude: res.longitude
                    });

                    // 获取附近用户
                    that.getNearbyUser();
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
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },

    // 打开位置权限
    openConfirm: function (e) {
        var that = this;
        wx.showModal({
            content: '检测到您没打开汉服司的定位权限，是否去设置打开？',
            confirmText: "确认",
            cancelText: "取消",
            success: function (res) {
                if (res.confirm) {
                    wx.openSetting({
                        success: (res) => {
                        }
                    })
                } else if (res.cancel) {
                    that.setData({
                        currentTab: e
                    });
                }
            }
        });
    },
    // 查看用户详情
    openUserDateil: function (e) {
        wx.navigateTo({
            url: './../../packageTwo/pages/thirdpartyIndex/thirdpartyIndex?openId=' + e.markerId,
        })
        // var that = this;
        // if (e.currentTarget.dataset.openid == e.markerId) {
        //   wx.switchTab({
        //     url: '/pages/my/my?openId=' + e.markerId,
        //   })
        // } else {
        //   wx.navigateTo({
        //     url: '/pages/userDetail/userDetail?openId=' + e.markerId,
        //   })
        // }
    },

    // 获取附近用户
    getNearbyUser: function () {
        var that = this;
        //暂时做阻止执行
        recom.selectNearbyUser(that.data.sessionId, that.data.range).then(res => {
            // console.log(res);
            const resArr = res.data.bussData;
            const resArrLength = resArr.length;
            let arrToShow = [];
            let originRandomArr = [];
            let randomIndexArr = [];
            if (resArrLength > 0) {
                if (resArrLength > 20) {
                    for (let i = 0; i < 20; i++) {
                        let randomIndex = Math.floor(Math.random() * resArrLength);
                        originRandomArr.push(randomIndex);
                    }
                    randomIndexArr = new Array(...new Set(originRandomArr));
                    randomIndexArr.forEach(element => {
                        arrToShow.push(resArr[element]);
                    });
                } else {
                    arrToShow = resArr;
                }
                let markersArr = arrToShow.map((value, index) => {
                    return {
                        iconPath: value.avatarurl,
                        id: value.openid,
                        latitude: value.latitude,
                        longitude: value.longitude,
                        width: '40',
                        height: '40',
                        callout: {
                            content: "哈哈哈哈哈哈哈",
                            color: "#ff0000",
                            fontSize: "16",
                            borderRadius: "20",
                            bgColor: "#ffffff",
                            padding: "10",
                            display: "ALWAYS",
                            borderColor: '2px solid #ff0000',
                        }
                    }
                })
                // console.log(markersArr);
                that.setData({
                    markers: markersArr,
                });
            }
        });
    },

    // 地图滑动触发
    onTapToRegion: function (e) {
        // console.log(e);
        var that = this;
        that.setData({
            controlsShow: false
        })

        if (e.type == "end") {
            that.setData({
                controlsShow: true
            })

            // this.mapCtx.getCenterLocation({
            //   success: function(res) {
            //     var distance = util.getDistance(that.data.latitude, that.data.longitude, res.latitude, res.longitude);
            //     if (parseInt(distance) > 100000) {
            //       // 获取附近用户
            //       that.getNearbyUser();
            //     }
            //   }
            // });
        }
    },
    // 邀请取消弹窗
    cancelMask: function () {
        this.setData({
            maskShows: false
        });
    },
    // 分享
    toShare: function (e) {
        this.setData({
            dynamicId: true
        });
    },
    // 取消分享
    cancelShare: function () {
        this.setData({
            dynamicId: "",
            openId: "",
            nickName: "",
            rqCode: "",
            content: "",
            img: ""
        });
    },
    // 气泡弹框
    bubble(e) {
        this.setData({
            bubbleShows: true
        });
    },
    // 取消气泡
    cancleBubble(e) {
        this.setData({
            bubbleShows: false
        });
    },
    // 气泡输入框输入事件
    bindKeyInput(e) {
        this.setData({
            bubbleValue: e.detail.value
        })

    },
    // 气泡确定
    affirmBubble(e) {
        console.log(this.data.bubbleValue)
    },
    // 到分享页
    toSharePage: function (e) {
        wx.navigateTo({
            url: '/pages/share/share?openId=' + e.currentTarget.dataset.openid + '&nickName=' + e.currentTarget.dataset.nickname + '&rqCode=' + e.currentTarget.dataset.rqcode + '&content=' + e.currentTarget.dataset.content + '&img=' + e.currentTarget.dataset.img,
        })
    },
    // 跳第三方主页
    toThirdHome: function (e) {
        wx.navigateTo({
            url: './../../packageTwo/pages/thirdpartyIndex/thirdpartyIndex?openId=' + e.currentTarget.dataset.openid,
        })
    },
    // 地图开定位
    openLocation: function (e) {
        wx.openLocation({
            latitude: e.currentTarget.dataset.latitude,
            longitude: e.currentTarget.dataset.longitude,
            scale: 18
        })
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
        var that = this;
        wx.showLoading({
            title: '正在刷新...',
        })
        if (that.data.currentTab == 0) {
            // 获取动态列表
            that.dynamicData(that.data.pageIndex);
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var that = this;
        if (that.data.currentTab == '0') {
            console.log(that.data.dynamicList.length)
            var pageIndex = that.data.pageIndex;
            // 下拉加载
            if (that.data.dynamicList.length <= pageIndex * 10) {
                that.setData({
                    pageIndex: ++pageIndex,
                    dynamicList: that.data.dynamicList.concat(that.dynamicData(pageIndex))
                })
            } else {
                that.setData({
                    pageIndex: pageIndex
                })
                wx.showToast({
                    title: '已加载全部...',
                })
                console.log("已加载全部")
            }
        } else if (this.data.currentTab == '1') {
            if (this.data.followPageIndex < this.data.followPageCount) {
                this.data.followPageIndex++
                this.selectFollowByPage()
            }
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 查询已关注用户动态记录
    selectFollowByPage() {
        module1.selectFollowByPage(this.data.followPageIndex).then(res => {
            let attentionList
            if (this.data.followPageIndex > 1) {
                attentionList = this.data.attentionList.concat(res.bussData)
            } else {
                attentionList = res.bussData
            }
            this.setData({
                attentionList: attentionList,
                followPageCount: res.pageCount
            })
        })
    }
})
