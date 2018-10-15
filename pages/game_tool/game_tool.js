var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// pages/game_tool/game_tool.js
const app = getApp()
const wechatUtil=app.wechatUtil
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["D贴收藏", "我的饭局", "游戏和工具"],
    items: ['收藏1','收藏2'],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this._login()
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  _login: function(){
    var _this=this
    var self = this;
    wx.login({
      success: res => {
        if (res.code) {
          var reqData = {
            userName: "",
            pwd: "",
            loginType: "xcx_login",
            wxCode: res.code,
            unionid: wx.getStorageSync("unionid")
          };
          wechatUtil.http_post('/api/open/loginUser', reqData, function (s) {
            wx.setStorageSync('rongcloudtoken', s.data.rongcloudtoken);
            console.log('-------------------' + s.data.openid)
            getApp().globalData.openid = s.data.openid
            getApp().globalData.id = s.data.id
            getApp().globalData.session_key = s.data.session_key
            getApp().globalData.rongcloudtoken = s.data.rongcloudtoken
            self.get_my_collect(1, s.data.rongcloudtoken)
            // this.globalData.openid = s.data.openid 
            console.log(s)
          }, function (e) {
            console.log(e)
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  get_my_collect: (type = 1, rongcloudtoken)=>{
    var reqData = {
      sortType:1,
      dataSources:2,
      type:1,
      pageSize: 5,
      pageStart:1,
      recursionFlg:1
    };
    var header={
      'content-type': 'application/json;charset=utf-8', // 默认值
      'Cookie': 'JSESSIONID=' + app.globalData.rongcloudtoken
    }
  
    wechatUtil.http_post('/post/search/selectPostBySearch', JSON.stringify(reqData), function (s) {
      console.log(s)
      // this.globalData.openid = s.data.openid 
      console.log('getApp().globalData.rongcloudtoken' + getApp().globalData.rongcloudtoken)
      console.log(s)
    }, function (e) {
      console.log(e)
  
    }, header)
  }
})