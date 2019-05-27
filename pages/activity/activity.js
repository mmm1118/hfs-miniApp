const {recom} = require('./../../server/index.js');
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sessionId: '',
        activityList: [],
        pageIndex: 1, // 动态的第几页
        pageCount: 1
    },
    // 去活动详情
    toDetail: function (e) {
        wx.navigateTo({
            url: `/pages/activity/activityDetail/activityDetail?activityId=${e.currentTarget.dataset.id}`,
        })
    },
    selectAllActivity: function (pageIndex) {
        var that = this;
        const params = {
            pageIndex: pageIndex,
            pageSize: 10,
            sdh: 1
        }
        recom.selectAllActivity(that.data.sessionId, params).then(res => {
            wx.hideLoading()
            console.log('活动列表数据----');
            console.log(res);
            let activityList
            if (this.data.pageIndex > 1) {
                activityList = that.data.activityList.concat(res.data.bussData)
            } else {
                activityList = res.data.bussData
            }
            that.setData({
                activityList: activityList
            })
            // 停止当前页面下拉刷新
            wx.stopPullDownRefresh();
        }).catch(rej => {
            // 停止当前页面下拉刷新
            wx.stopPullDownRefresh();
            rej
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        const sessionId = wx.getStorageSync('sessionId');
        if (typeof sessionId == 'string' && sessionId.length >= 1) {
            that.setData({
                sessionId: sessionId
            })
            that.selectAllActivity(1);
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
        let that = this;
        wx.showLoading({
            title: '正在刷新...',
        })
        that.selectAllActivity(that.data.pageIndex);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        let pageIndex = that.data.pageIndex;
        // 下拉加载
        if (that.data.activityList.length < this.data.pageCount) {
            that.selectAllActivity(++pageIndex)
        } else {
            that.setData({
                pageIndex: pageIndex
            })
            wx.showToast({
                title: '已加载全部...',
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
