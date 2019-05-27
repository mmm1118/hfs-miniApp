Page({

  /**
   * 页面的初始数据
   */
  data: {

    list:[
      { name: '达浪达浪~0', imgage: './../../../images/circle_img/bg.png', tim:'2018-12-25加入',chenck:false,id:'0'},
      { name: '静若幽兰~1', imgage: './../../../images/circle_img/bg.png', tim: '2018-12-25加入', chenck: false, id:'1'},
      { name: '静若幽兰~3', imgage: './../../../images/circle_img/bg.png', tim: '2018-12-25加入', chenck: false,id:'2' },
      ],
      arr:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  Selection(e){
    var index = e.currentTarget.dataset.index;
    var listData = this.data.list;

    for(var i=0;i<listData.length;i++){ 
          if(listData[index]==listData[i]){ 
                  console.log(listData[i]);
                   if (listData[i].chenck==false){ 
                         //点击谁获取谁 并获取他的id
                          listData[i].chenck=true;                     
                   }else{ 
                        listData[i].chenck = false;
                          //取消的时候 得吧对应的数组里面的内容删除掉
                   }
          }
    }

    this.setData({ 
      list: listData
    })
  },

  complete(){ 
    var listData = this.data.list;
    var arr=[];
    
    //点击确定 获取选中的id
    for (var i in listData){ 
          if(listData[i].chenck==true){
              arr.push(listData[i].id);
          }
    }

    console.log(arr);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})