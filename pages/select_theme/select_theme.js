// pages/select_theme/select_theme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme:'',
    inputValue:'',
    from:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const from = options.from

    if (from){
      this.setData({
        from:from
      })
    }
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

  },
  theme_select:function(e){
    var theme = e.currentTarget.dataset.theme;
    if (theme!=""){
      this.setData({
        theme: theme
      })
    }else{
      console.log(111111111111111)
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  confirm_click:function(){
    if(this.data.from=="publish"){
      const _this=this
      wx.getStorage({
        key: 'invatation_info',
        success: function (res) {
          console.log(res.data)
          const data = res.data
          data.theme_title = _this.data.theme + _this.data.inputValue,

          wx.setStorage({ //存储到本地
            key: "invatation_info",
            data: data
          })
          wx.navigateTo({
            url: "../../pages/post_invitation_publish/post_invitation_publish"
          })
        }
      })
    }else{
      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      prevPage.setData({//直接给上移页面赋值
        inputValue: this.data.theme + this.data.inputValue,
      });
      console.log(this.data.inputValue)
      wx.navigateBack({//返回
        delta: 1
      })
    }
  }
})