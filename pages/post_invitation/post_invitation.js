// pages/post_invitation/post_invitation.js
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
    this.get_my_collect()
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
  get_my_collect: (type = 1) => {
    var reqData = {
      dataSources: 2,
      pageSize: 5
    };
    var header = {
      'content-type': 'application/json', // 默认值
      'Cookie': 'JSESSIONID=' + app.globalData.rongcloudtoken
    }

    wechatUtil.http_post('/post/search/selectPostBySearch', reqData, function (s) {
      console.log(s)
      // this.globalData.openid = s.data.openid 
      console.log('getApp().globalData.rongcloudtoken' + getApp().globalData.rongcloudtoken)
      console.log(s)
    }, function (e) {
      console.log(e)

    }, header)
  }
})