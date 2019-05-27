// pages/memorialIndex/memorialIndex.js
const {module1} = require("./../../server/index"); /* 全局域名*/
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // tab切换索引
        currentTab: 0,
        // 轮播图列表
        bannerList: [{
            imgUrl: "/images/index/swiper01.png",
            pages: "/pages/index/index"
        }, {
            imgUrl: "/images/index/swiper01.png",
            pages: "/pages/index/index"
        }],
        // 奏折分类
        allZouzheType: [],
        // 文章列表
        articleList: [{
            title: "花仙子，广州城的美丽 记忆",
            content: "广汉会 · 一周前发布",
            webUrl: "https://mp.weixin.qq.com/",
            lookNum: "208",
            images: "/images/index/meizi01.png"
        }, {
            title: "花仙子，广州城的美丽 记忆",
            content: "广汉会 · 一周前发布",
            webUrl: "https://mp.weixin.qq.com/",
            lookNum: "208",
            images: "/images/index/meizi01.png"
        }, {
            title: "花仙子，广州城的美丽 记忆",
            content: "广汉会 · 一周前发布",
            webUrl: "https://mp.weixin.qq.com/",
            lookNum: "208",
            images: "/images/index/meizi01.png"
        }],
        currentPage: 1,
        hasMore: 1
    },
    /**
     * 点击tab切换
     */
    swichNav: function (e) {

        var that = this;
        that.setData({
            currentTab: e.target.dataset.current,
            currentPage: 1
        })
        this.getZouzheList()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取奏折分类
        module1.getAllZouzheType().then(res => {
            if (res.bussData.length) {
                this.setData({
                    allZouzheType: res.bussData,
                    currentTab: res.bussData[0].id
                })
                this.getZouzheList()
            }
        })

        module1.selectAll().then(res => {
            this.setData({
                bannerList: res.bussData.map(item => {
                    return {
                        imgUrl: item.url,
                        pages: item.pages
                    }
                })
            })
        })
    },

    clickZouzhe(e) { // 用户点击奏折
        let data = e.currentTarget.dataset
        module1.clickZouzhe(data.id, data.zouzheTypeId)
    },

    getZouzheList() { // 获取分类奏折
        module1.getZouzheList({
            "pageIndex": this.data.currentPage,
            "pageSize": 10,
            "zouzheTypeId": this.data.currentTab
        }).then(res => {
            let articleList
            if (this.data.currentPage > 1) {
                articleList = this.data.articleList.concat(res.bussData.list.map(item => {
                    return {
                        title: item.title,
                        content: item.crent,
                        webUrl: item.potic,
                        lookNum: item.view,
                        images: item.img,
                        id: item.id,
                        zouzheTypeId: item.zouzheTypeId
                    }
                }))
            } else {
                articleList = res.bussData.list.map(item => {
                    return {
                        title: item.title,
                        content: item.crent,
                        webUrl: item.potic,
                        lookNum: item.view,
                        images: item.img,
                        id: item.id,
                        zouzheTypeId: item.zouzheTypeId
                    }
                })
            }

            this.setData({
                articleList: articleList,
                hasMore: res.bussData.nextPage
            })
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
        if (this.data.hasMore) {
            console.log('触底了')
            this.data.currentPage++
            this.getZouzheList()
        } else {
            console.log('触底了2')
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
