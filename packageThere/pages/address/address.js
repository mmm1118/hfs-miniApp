
const city = require('../../../utils/citys.js')
const { myapi, wxapi } = require('./../../../server/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    state: false,
    name: '',
    phone: '',
    adder: '',
    region: ['请选择省市区'],
    isDefault: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const sessionId = wx.getStorageSync('sessionId');
    const that = this;

    this.setData({
      sessionId: sessionId
    })


  },
  name(e) {
    // console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  phone(e) {
    // console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },
  adder(e) {
    // console.log(e);
    this.setData({
      adder: e.detail.value
    })

  },
  switch2Change(e) {
    const that = this;
    if (e.detail.value == true) {
      console.log('1')
      that.setData({
        isDefault: 1
      })
    } else if (e.detail.value == false) {
      console.log('0')
      that.setData({
        isDefault: 0
      })
    }
  //  console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: `${e.detail.value[0]}${e.detail.value[1]}${e.detail.value[2]}`
    })
  },
  subtiy() {
    wx.showLoading({
      title:'保存中',
      mask:true
    })
    const taht=this;
    const name = this.data.name;
    const phone = this.data.phone;
    const adder = this.data.adder;
    const region = this.data.region;
    const isDefault = this.data.isDefault;
    const sessionId = this.data.sessionId;

    if (name == '') {
      wx.showToast({
        title: '请输入收货人',
        icon: 'none'
      })
      return false;
    }

    if (phone == '') {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return false;
    } else {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(phone)) {
        wx.showToast({
          title: '手机号码错误',
          icon: 'none'
        })
        return false;
      }
    }

    if (region[0] == '请选择省市区') {
      wx.showToast({
        title: '请选择省市区',
        icon: 'none'
      })
      return false;
    }

    if (adder == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return false;
    }

const data={ 
  details: adder,
  id:'',
  isDefault:isDefault,
  location: region,
  phone: phone,
  userName: name
}
    myapi.saveUserAddress(sessionId,data).then(res=>{
      console.log(res);
    console.log(res.data.status)
      if (res.data.status==200){
           wx.hideLoading();
            wx.showToast({
              title:'添加成功',
              icon:'none'
            })

          wx.setStorageSync('adderlist',data)

          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },1500)

      }
    }).catch(err=>{
      wx.showToast({
        title: '服务器错误,请稍后再试',
        icon: 'none'
      })

    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})