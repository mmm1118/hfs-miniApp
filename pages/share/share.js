var app = getApp();
var ctx = wx.createCanvasContext("canvasId");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 服务器地址
    serverIp: app.globalData.serverIp,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {}
          })
        }
      }
    })

    wx.downloadFile({
      url: 'https://luoshuchuanmei.com/images/userAvatarUrl/' + options.openId + '.png',
      success: function(openId) {
        wx.downloadFile({
          url: options.rqCode,
          success: function(rqCode) {
            if (options.img) {
              wx.downloadFile({
                url: options.img,
                success: function(img) {
                  wx.getImageInfo({
                    src: img.tempFilePath,
                    success: function(res) {
                      var h = 150 * res.height / res.width;
                      if(h > 225){
                        h = 225;
                      }
                      that.setData({
                        imageHeight: h
                      })
                      that.draw(ctx, openId.tempFilePath, options.nickName, rqCode.tempFilePath, options.content, img.tempFilePath);
                    }
                  })
                }
              })
            } else {
              that.draw(ctx, openId.tempFilePath, options.nickName, rqCode.tempFilePath, options.content, options.img);
            }
          }
        })
      }
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
    return {
      path: '/pages/load/load'
    }
  },

  // 画图
  draw: function(ctx, openId, nickName, rqCode, content, img) {
    var that = this;

    // 绘制背景图片
    ctx.save();
    ctx.beginPath();
    ctx.drawImage('/images/index/shareBg.png', 0, 50, 289, 403);
    ctx.closePath();
    ctx.restore();

    // 绘制白色背景图片
    ctx.save();
    ctx.beginPath();
    ctx.drawImage('/images/index/shareImg.png', 20, 0, 250, 420);
    ctx.closePath();
    ctx.restore();

    // 绘制头像
    ctx.save();
    ctx.beginPath();
    ctx.arc(145, 35, 23, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(openId, 122, 12, 46, 46);
    ctx.closePath();
    ctx.restore();

    if (content != 'undefined') {
      // 绘制动态内容
      ctx.save();
      ctx.beginPath();
      ctx.setTextAlign("center");
      ctx.font = 'normal normal 11px Arial';
      if (content.length > 10) {
        content = content.substring(0, 10) + "...";
      }
      ctx.fillText(content, 145, 85);
      ctx.closePath();
      ctx.restore();
    }

    if (img) {

      // 绘制动态图片

      ctx.save();
      ctx.beginPath();
      ctx.drawImage(img, 70, 103, 150, this.data.imageHeight);
      ctx.closePath();
      ctx.restore();


    }

    // 绘制动态内容
    ctx.save();
    ctx.beginPath();
    ctx.setTextAlign("left");
    ctx.font = 'normal bold 12px Arial';
    if (nickName.length > 6) {
      nickName = nickName.substring(0, 6) + '...';
    }
    ctx.fillText('分享者 / ' + nickName, 54, 358);
    ctx.font = 'normal normal 9px Arial';
    ctx.setFillStyle('#939393');
    ctx.fillText('微信扫码观看我的汉唐生活', 54, 380);
    ctx.closePath();
    ctx.restore();

    // 绘制二维码
    ctx.save();
    ctx.beginPath();
    ctx.drawImage(rqCode, 178, 340, 65, 65);
    ctx.closePath();
    ctx.restore();

    ctx.draw();
  },

  // 保存
  catchtapSave: function() {
    var that = this;

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          that.openConfirm();
        } else {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 290,
            height: 453,
            destWidth: 290 * 3,
            destHeight: 453 * 3,
            canvasId: 'canvasId',
            success: function(res1) {
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
  },

  // 打开位置权限
  openConfirm: function() {
    wx.showModal({
      content: '检测到您没打开相册权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {}
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
  catchtapBlack: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})