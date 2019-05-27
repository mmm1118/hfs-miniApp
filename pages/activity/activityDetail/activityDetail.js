//获取应用实例
const app = getApp();
const util = require('../../../utils/util.js');
const {recom} = require('./../../../server/index.js');
var ctx = wx.createCanvasContext("canvasId");
const {module1} = require("./../../../server/index");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        sessionId: '',
        activityId: '',
        itemIds: '', // 投票id
        checkActivity: false, // 是否投票
        // 自定义组件所需的参数
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '活动详情', //导航栏 中间的标题
        },
        // 此页面 页面内容距最顶部的距离
        height: app.globalData.height * 2 + 20,
        // 音频所需数据
        playing: false,
        formatedPlayTime: '00:00:00',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        // 当前视频的播放位置
        currentTime: "00:00:00",
        // 当前录音的时长
        duration: "00:00:00",
        // 是否显示选座弹框
        seatShows: false,
        // 座位列表
        seatList: [],
        // 支付成功弹出图片
        paymentBill: false,
        // 投票数据
        radioList: [{
            name: 'one',
            value: '1号花神小姐姐',
            checked: 'true'
        },
            {
                name: 'two',
                value: '2号花神小姐姐'
            },
            {
                name: 'there',
                value: '3号花神小姐姐'
            },
            {
                name: 'four',
                value: '4号花神小姐姐'
            }
        ],
        activityInfo: {}
    },
    initRender: function () {
        recom.selectActivityDetail(this.data.sessionId, {
            activityId: this.data.activityId
        }).then(res => {
            console.log(res);
        })
    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        this.setData({
            itemIds: e.detail.value
        })
    },
    // 点击座位
    clickSeat(e) {
        // 选中座位

        // 取消选中

    },
    // 播放
    playRecord: function () {
        var that = this;
        var src = this.data.src;
        if (src == '') {
            this.tip("请先录音！")
            return;
        } else {
            that.setData({
                playing: true
            })
        }
        this.innerAudioContext.src = this.data.src;
        this.innerAudioContext.play()
    },
    // 停止
    stopRecord: function () {
        var that = this;
        that.setData({
            playing: false
        })
        this.innerAudioContext.stop()
    },
    // 提示框
    tip: function (msg) {
        wx.showModal({
            title: '提示',
            content: msg,
            showCancel: false
        })
    },
    // 打开地图导航
    toLocation(e) {
        console.log(e)
        wx.openLocation({
            name: e.currentTarget.dataset.name,
            latitude: Number(e.currentTarget.dataset.latitude),
            longitude: Number(e.currentTarget.dataset.longitude),
            scale: 18
        })
    },
    // 到分享页
    toSharePage: function (e) {
        wx.navigateTo({
            url: '/pages/share/share?openId=' + e.currentTarget.dataset.openid + '&nickName=' + e.currentTarget.dataset.nickname + '&rqCode=' + e.currentTarget.dataset.rqcode + '&content=' + e.currentTarget.dataset.content + '&img=' + e.currentTarget.dataset.img,
        })
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
    // 去报名人员列表页面
    toApplyList(e) {
        wx.navigateTo({
            url: '/pages/activity/peopleList/peopleList',
        })
    },
    // 点击报名按钮
    applyButton(e) {
        var that = this;
        wx.showModal({
            title: `活动费用${this.data.activityInfo.totalPrice}元`,
            content: '此活动不可取消报名、退费，确定报名吗？',
            confirmText: '确定',
            cancelColor: "#939393",
            confirmColor: "#D71000",
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.setData({
                        seatShows: true
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    // 取消支付
    canclePayment(e) {
        var that = this;
        that.setData({
            seatShows: false
        });
    },
    // 确定支付
    confirmPayment(e) {
        var that = this;
        that.setData({
            seatShows: false,
            // 假装支付成功
            paymentBill: true
        });
        // 假装支付成功
        // 调用绘图看结果
        this.draw(ctx, ["召集 | 号外！《花朝节》2.0", "2019/3/18  15：20 ~ 2019/3/18  18：00", "广东省深圳市大鹏古城", "116.00元", "45、46号", "123456"])
        // 调用支付接口
        wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: 'MD5',
            paySign: '',
            success(res) {
                console.log("支付成功")
                that.setData({
                    paymentBill: true
                })
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                        }
                    })
                }
            },
            fail(res) {
                console.log("支付失败")
            }
        })
    },
    // 取消保存门票
    cancelSave: function () {
        this.setData({
            paymentBill: false
        });
    },
    // 绘制门票
    draw: function (ctx, content) {
        var that = this;
        var windowWidth = that.data.windowWidth / 375;
        // 绘制背景图片
        ctx.save();
        ctx.beginPath();
        ctx.drawImage('/images/index/ticketsImg.png', 0, 0, windowWidth * 375, 450);
        ctx.closePath();
        ctx.restore();

        if (content != 'undefined') {
            // 绘制动态内容
            ctx.save();
            ctx.beginPath();
            ctx.setTextAlign("center");
            ctx.setFillStyle('#964E0C');
            ctx.setFontSize(18)
            ctx.font = 'normal bold 18 normal';
            if (content[0].length > 14) {
                content[0] = content[0].substring(0, 14) + "...";
            }
            ctx.fillText(content[0], 190 * windowWidth, 110);
            ctx.setFontSize(14)
            ctx.fillText(content[1], 190 * windowWidth, 150);
            ctx.fillText(content[2], 190 * windowWidth, 180);
            ctx.fillText('总金额：' + content[3], 190 * windowWidth, 210);
            ctx.fillText('座位：' + content[4], 190 * windowWidth, 240);
            ctx.fillText('ID号：' + content[5], 190 * windowWidth, 270);
            ctx.closePath();
            ctx.restore();
        }

        // 绘制二维码
        ctx.save();
        ctx.beginPath();
        ctx.drawImage('/images/index/activityEwm.png', 140 * windowWidth, 295, 100, 100);
        ctx.closePath();
        ctx.restore();

        ctx.draw();
    },

    // 保存图片
    catchtapSave: function () {
        console.log(111)
        var that = this;
        var windowWidth = that.data.windowWidth;
        wx.getSetting({
            success(res) {
                wx.getSetting({
                    success(res) {
                        if (!res.authSetting['scope.writePhotosAlbum']) {
                            that.openConfirm();
                        } else {
                            wx.canvasToTempFilePath({
                                x: 0,
                                y: 0,
                                width: windowWidth,
                                height: 453,
                                destWidth: windowWidth * 3,
                                destHeight: 453 * 3,
                                canvasId: 'canvasId',
                                success: function (res1) {
                                    wx.saveImageToPhotosAlbum({
                                        filePath: res1.tempFilePath,
                                        success(res1) {
                                            wx.showToast({
                                                title: '保存成功',
                                                icon: "success",
                                                duration: 1500
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    },

    // 打开位置权限
    openConfirm: function () {
        wx.showModal({
            content: '检测到您没打开相册权限，是否去设置打开？',
            confirmText: "确认",
            cancelText: "取消",
            success: function (res) {
                if (res.confirm) {
                    wx.openSetting({
                        success: (res) => {
                        }
                    })
                } else if (res.cancel) {
                    wx.navigateBack({
                        delta: 1
                    })
                }
            }
        });
    },
    // 返回
    catchtapBlack: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 获取手机屏幕高度
        that.setData({
            windowWidth: wx.getStorageSync('windowWidth'),
            sessionId: wx.getStorageSync('sessionId'),
            activityId: +options.activityId || 62 // 测试id
        });
        // 创建内部 audio 上下文 InnerAudioContext 对象
        this.innerAudioContext = wx.createInnerAudioContext();
        this.innerAudioContext.onError((res) => {
            that.tip("播放录音失败！")
        })
        // this.initRender();
        this.initRender2();
        console.log(this.innerAudioContext)
        that.setData({
            duration: this.innerAudioContext.duration,
            currentTime: this.innerAudioContext.currentTime
        })
        // 处理轮播图数据分页
        var catList = [],
            temCount = Math.ceil([...Array(160)].length / 100);
        for (var i = 0; i < temCount; i++) {
            catList.push([...Array(100 * temCount)].slice(i * 100, (i + 1) * 100))
        }
        that.setData({
            seatList: catList
        })
    },

    initRender2() {
        module1.selectDetails(this.data.activityId).then(res => {
            this.setData({
                activityInfo: res.bussData
            })

            module1.activityCheck(res.bussData.circleActivityVoteDTO.id).then(res2 => {
                this.setData({
                    checkActivity: res2.bussData
                })

                if (res2.bussData) {
                    module1.selectAllVoteUserByUserId(res.bussData.circleActivityVoteDTO.id).then(res => {

                    })
                }
            })
        })
    },

    activityAddVoteUser() {
        console.log('投票', this.data.itemIds)
        module1.activityAddVoteUser(this.data.itemIds).then(res => {
            wx.showToast({
                title: '投票成功',
                icon: "success",
                duration: 1500
            })
            /*this.setData({
                checkActivity: true
            })*/
            this.initRender2()
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
        clearInterval(this.updateInterval)
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            path: '/pages/load/load'
        }
    }
})
