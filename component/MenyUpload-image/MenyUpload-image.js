// 多个图片上传组件
Component({
  properties: {
    
  },
  data: {
    imgnum: 9,
    images: [],
    imgSize: 2000,
    progress:0,
    imgDir:'comment'
  },
  methods: {
    /**
     * 上传图片
    */
    uploadpic(){
      const that=this;
      this.chooseImage({ count: this.data.imgnum-this.data.images.length}).then(res=>{
        if (res.errMsg !== "chooseImage:ok") return false; //如何api 上传异常的，就阻止向下执行

        const imagesLengtn = this.data.images.length;
        const filterLimitSizeImg=that._filterLimitSizeImg(res.tempFiles);//接收压缩的图片
        
        that.setData({ 
          images: filterLimitSizeImg,
          imagesLengtn: imagesLengtn
        })

        that._uploadImg(this.data.images,res=>{ 
              /*这一块就图片上传成功 并且图片已经下载完成 
                将图片导入外部
              */
                 console.log(this.data.images)
                 this.triggerEvent('imgSucces',this.data.images)
        })


      }).catch(err=>{
            console.log(err)
      })
    },
      /**
     * 逐个上传图片
    */
    _uploadImg(imgArr,callback){
      const that=this;

      console.log('这是压缩后的图片',imgArr) //imgArr 这是压缩后的图片
      console.log(this.data.imagesLengtn)
    
      for (let index = this.data.imagesLengtn; index<imgArr.length;index++){ 
              const item=imgArr[index];
              console.log(item)
              //执行一次，调用一次图片上传的函数
              that.uploadImage(item.path, this.data.imgDir ||'comment',res=>{ 
              //接受上传成功的图片并下载成功的回调,把下载同步 到自定义属性上面去
                  that.setData({ 
                    [`images[${index}].progress`]: (100 - res.progress)
                  })

              }).then(res=>{ 
                console.log('上传到服务器成果的回调', res) 
                if (res.statusCode!==200) return false; //根据接口来做调整
                //上传到服务器成果的回调
                console.log('上传到服务器成果的回调',res) 
                if (res.data instanceof Object) { //如果检测到是对象的话，那么就直接callback
                        console.log('1')
                        callback(res.data)
                }else{
                    console.log('2')
                    const jsonData=JSON.parse(res.data)//字符串转对象
                    callback(jsonData);
                }   

              }).catch(err=>{ 
                //上传到服务失败的回调
                console.log('上传到服务失败的回调',err)
              })   
      }
    },
    /**
     * 上传图片到服务器上面去
    */
    uploadImage(path, dir, callback) {
      return new Promise((resolve, reject) => {
        const uploadTask = wx.uploadFile({
          url: 'https://img.lion-mall.com/upimgs/img-up',
          filePath: path,
          name: 'goods_imgs',
          formData: {
            dirimg: dir || 'comment'
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: resolve,
          fail: reject
        });

        /***可监听上传进度变化事件 详情https://developers.weixin.qq.com/miniprogram/dev/api/UploadTask.onProgressUpdate.html?search-key=UploadTask.onProgressUpdate
         * */
        uploadTask.onProgressUpdate(callback);
      });
    },
    /*
    chooseImage 上传图片的方法  opi方法能够
https://developers.weixin.qq.com/miniprogram/dev/api/wx.chooseImage.html 关于 .assign,opi怎么对应传参 
    */
    chooseImage(opi){
      return new Promise((relosve,reject)=>{
        wx.chooseImage(Object.assign(opi || {}, {
          success: relosve,
          fail:reject
        }))
      })
      
    },
  /**
   * 图片压缩
  */
    _filterLimitSizeImg(tempFiles){
      //console.log(tempFiles)
      var imgArr = this.data.images;

      for (const index in tempFiles){ 
        const tempflistindex = tempFiles[index]; 
        const size = tempflistindex.size / 1024;
        //计算后的图片如果还比他自己的图片的话还大，那么就弹出提示
        if (size > tempflistindex.size){
            wx.showToast({
              title: `图片大小不能超过${this.data.imgSize/1000}M`,
              icon:'none',
              duration:2000
            })
            continue;// 跳出当前循环,开始下一个循环
        }
        imgArr.push(tempFiles[index])
      }
      return imgArr;
    },
    //删除图片
    _remove(e){
      const index = e.currentTarget.dataset.index;
      const images = this.data.images;

      images.splice(index, 1);

        this.setData({
          images: images
        });
      //删除图片之后，还传递一下删除后图片数量
        this.triggerEvent('imgSucces', this.data.images)

    }
  
  },
  pageLifetimes: {
    show() {
    // var ass={name:'1'}
    //   var obj = Object.assign({count:1},{sueeces:'1111',fail:'222'})
    //   console.log(obj);
    //   console.log('组件生命周，进来就执行')

    }
  }
})