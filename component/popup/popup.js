// 弹出蒙版组建
Component({
  properties: {
    ismask: {
      type: Boolean,
      value: false
    }
  },
  data: {
  },
  methods: {
    disappear(val) {
      console.log(val)
      console.log(val.currentTarget.dataset.showoffset)
      //第一个参数是传递的事件 ，第二个参数是传递的值 传递事件让父级执行
      this.triggerEvent('onSort', val.currentTarget.dataset.showoffset)
    }

  },
  pageLifetimes: {
    show() {
      console.log('组件生命周，进来就执行')
    }
  }
})