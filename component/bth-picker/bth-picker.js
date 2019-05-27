
Component({ 
  properties:{
    show:{
      type: Boolean,
      value: false
    },
    arraydata:{ //接收传进来的自定义属性 
      type:'Array',
      value:''
    }
  },
  data:{ 
  },
  methods:{ 
    Bubbling(val){ 
    
      //自定义传递 方法名称  `topone${index}` 改变这里就可以了
      console.log(val.currentTarget.dataset.index);
      const index = val.currentTarget.dataset.index;
      this.triggerEvent(`topone${index}`, val.currentTarget.dataset.index);
    },
    payNow(val){
      console.log(val)
      console.log(val.currentTarget.dataset.showoffset) 
      //第一个参数是传递的事件 ，第二个参数是传递的值
      this.triggerEvent('onSort', val.currentTarget.dataset.showoffset);
    },
    ismack(val){
      console.log(val.currentTarget.dataset.mack)
      this.triggerEvent('onmack', val.currentTarget.dataset.mack);
    }
  },
  pageLifetimes:{
    show() { 
      console.log('组件生命周，进来就执行')
    }
  }
})