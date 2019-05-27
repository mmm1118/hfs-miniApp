// 单个图片上传组件
Component({
  properties: {
    
  },
  data: {
    imgnum: 1,
    image: ['./../../images/circle_img/upload.png'],
    imgSize: 2000,
    progress:0
  },
  methods: {
     _addImage(){
       const that=this;

       this.chooseImage({ count: this.data.imgnum }).then(res => {
         // if判断chooseImage:ok 
         if (res.errMsg !== 'chooseImage:ok') return false;

         const filterLimitSizeImg = this._filterLimitSizeImg(res.tempFiles)//图片压缩

         //图片压缩完成 开始上传
         this.setData({
           image: filterLimitSizeImg[0].path
         })
         this._uploadImg(filterLimitSizeImg)
       }).catch(err => {
         console.log(err);
       })
    },
    //单个图片开始上传
    _uploadImg(array) {
      console.log('上传图片', array[0].path)
      this.uploadImage(array[0].path, res => {

        this.setData({
          progress: (100 - res.progress)
        })
        
        if (res.progress==100){  //图片进度下载完成 就导出图片
          console.log(this.data.image)
          this.triggerEvent('onSuccess', this.data.image);
        }
        console.log('下载进度', res.progress)
      })
    },
    /**图片上传到服务器请看微信端的方法
     * https://developers.weixin.qq.com/miniprogram/dev/api/network-file.html#wxuploadfileobject
    */
    uploadImage(path, callblack) {
      console.log('开始上传图片' + path)
      const uploadTask = wx.uploadFile({
        url: 'https://img.lion-mall.com/upimgs/img-up',
        filePath: path,
        name: 'goods_imgs',
        formData: {
          dirimg: 'comment'
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log('图片上传成功', res);
        },
        fail: err => {
          console.log('图片上传失败', err)
        }
      });
      //监听上传进度变化事件 callblack 回调函数  
      // progress  上传进度百分比 0-100 最长时间60秒，，超过60秒删除失败
      uploadTask.onProgressUpdate(callblack)//
    },
    // 微信上传文件
/**
     * 从本地相册选择图片或使用相机拍照。
     * @param {object} opi 具体参数请打开： https://developers.weixin.qq.com/miniprogram/dev/api/media-picture.html#wxchooseimageobject
*/
    chooseImage(opi){   
      return new Promise((resolve, reject) => {
        wx.chooseImage(Object.assign(opi || {}, {
          success: resolve,
          fail: reject
        }))
      })
    },
        /**
 * 过滤 限制图片大小 的图片 
 */
    _filterLimitSizeImg(tempFiles) {
      console.log(tempFiles);
      let imgArr = [];
      for (const index in tempFiles) {
        const tempImg = tempFiles[index];
        const size = parseInt(tempImg.size / 1024);

        if (size > this.data.imgSize) {
          wx.showToast({
            title: `图片大小不能超过 ${this.data.imgSize / 1000}M`,
            icon: 'none',
            duration: 2000
          });
          continue;
        };
        imgArr.push(tempFiles[index]);
      };
      return imgArr;
    }


    // disappear(val) {
    //   console.log(val)
    //   console.log(val.currentTarget.dataset.showoffset)
    //   //第一个参数是传递的事件 ，第二个参数是传递的值 传递事件让父级执行
    //   this.triggerEvent('onSort', val.currentTarget.dataset.showoffset)
    // }

  },
  pageLifetimes: {
    show() {
      console.log('组件生命周，进来就执行')
    }
  }
})