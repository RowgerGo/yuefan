// pages/select_theme/select_theme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme:'',
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      inputValue: this.data.theme+this.data.inputValue,
    });
    console.log(this.data.inputValue)
    wx.navigateBack({//返回
      delta: 1
    })
  }
})