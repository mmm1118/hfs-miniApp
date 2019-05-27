// components/touch-gesture/touch-gesture.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
      show: {
        type: null,
        value: ''
      },
    },
  /**
   * 组件的初始数据
   */
  data:{

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 滑动开始事件
     */
    _handletouchtart: function (event) {
      console.log(`滑动的时候获取index`, event.currentTarget.dataset.index);
      this.setData({
        i: event.currentTarget.dataset.index
      })
      this.data.lastX = event.touches[0].pageX;
      this.data.lastY = event.touches[0].clientY;
    },
    /**
     * 滑动事件
     */
    _handletouchmove(event) {
      this.setData({
        currentGesture: this._touchmoveDirectionCount(event)
      });
    },
    /**
     * 滑动结束事件
     */
    _handletouchend(event) {


      if (this.data.currentGesture === undefined) return;
      this.triggerEvent('currentGesture', this.data.currentGesture);
    },
    /**
     * 滑动方向计算
     */
    _touchmoveDirectionCount(event) {
      let currentX = event.touches[0].pageX
      let currentY = event.touches[0].clientY
      let tx = currentX - this.data.lastX
      let ty = currentY - this.data.lastY
      let param = { tx: '', txVal: 0, ty: '', tyVal: 0 ,i:this.data.i};
      //左右方向滑动
      if (Math.abs(tx) > Math.abs(ty)) {
        if (tx < 0) {
          param.tx = 'left'; // 左 滑动
          param.txVal = tx;
        } else if (tx > 0) {
          param.tx = 'right'; // 右 滑动
          param.txVal = tx;
        }

      } else { //上下方向滑动
        if (ty < 0) {
          param.ty = 'up'; // 上 滑动
          param.tyVal = ty;
        } else if (ty > 0) {
          param.ty = 'down'; // 下 滑动
          param.tyVal = ty;
        }
      }
      // //将当前坐标进行保存以进行下一次计算
      this.data.lastX = currentX;
      this.data.lastY = currentY;
      return param;
    }
  }
})
