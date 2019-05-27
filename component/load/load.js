
Component({
  properties: {
    tostvalue:{
      type:'string',
      value:'暂无更多'
    }
  },
  data: {

  },
  methods: {
  },
  pageLifetimes: {
    show() {
      wx.hideTabBar({})
    }
  }
})