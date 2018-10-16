const app = getApp()
const wechatUtil = app.wechatUtil
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('生命周期函数--监听页面加载')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('生命周期函数--监听页面初次渲染完成')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('生命周期函数--监听页面显示')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('生命周期函数--监听页面隐藏')
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
  NavigateToIndex:function(){
    wx.navigateTo({
      url: '../index/index?type=我是&value=罗杰',
    })
  },
  join_select: function (e) {
    console.log(e)

    const type = e.currentTarget.dataset.type
    const title = e.currentTarget.dataset.title

    if(type==1){
      this.join(1, title)
    }
    if (type == 2) {
      this.join(1, title)
    }
    if (type == 3) {
      this.join(null,title)
    }
    if (type == 4) {
      this.join(2, title)
    }

  },
  join: function (type, title) {
    var self = this;
    var reqData = {
      postId: this.data.postId,
      type: 3,
      subType: type
    };
    var header = {
      'content-type': 'application/json;charset=utf-8', // 默认值
      'Cookie': 'JSESSIONID=' + app.globalData.rongcloudtoken
    }

    wechatUtil.http_post('/post/collection/changeWYYStatus', JSON.stringify(reqData), function (s) {
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 3000,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
           
            let pages = getCurrentPages();//当前页面
            let prevPage = pages[pages.length - 2];//上一页面
            prevPage.setData({//直接给上移页面赋值
              subType_title: title,
            });
            wx.navigateBack({ changed: true });//返回上一页
          }, 2000)
        }
      })
    }, function (e) {
      console.log(e)
    }, header)
  },
})

