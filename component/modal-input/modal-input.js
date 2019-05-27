
Component({
  properties: {
    rewardBl:{
      type: Boolean,
      value:'123'
    },
    blarray:{
      type:Array,
      value:''
    }
  },
  data: {
    val:''

  },
  methods: {
    text(e){
      this.setData({ 
        val: e.detail.value
      })
      console.log(e.detail.value);
    },
    cancel(){
      this.setData({ 
        rewardBl:false
      })
    },
    dataamine(){
      console.log(this.data.val)
      this.triggerEvent('onval', this.data.val)
    },

  },
  pageLifetimes: {
    show(){
      console.log(this.data.rewardBl)
      console.log('组件生命周，进来就执行')
    }
  }
})