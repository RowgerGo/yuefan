var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// pages/game_tool/game_tool.js
const app = getApp()
const wechatUtil=app.wechatUtil
Page({
  data: {
    tabs: ["D贴收藏", "我的饭局", "游戏和工具"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    my_postList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //开发阶段注释，上线需要放开
    // wx.removeStorage({
    //   key: 'invatation_info',
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this._login()
    
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
   /**
   * 页面相关事件处理函数--监听tab切换
   */
  tabClick: function (e) {
    console.log(e.currentTarget.id)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.get_my_collect(e.currentTarget.id, getApp().globalData.rongcloudtoken,this)
  },
   /**
   * 页面相关事件处理函数--登录方法
   */
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
            getApp().globalData.myId = s.data.id
            getApp().globalData.avatar = s.data.portraituri
            getApp().globalData.session_key = s.data.session_key
            getApp().globalData.rongcloudtoken = s.data.rongcloudtoken
            self.get_my_collect(1, s.data.rongcloudtoken,self)
          }, function (e) {
            console.log(e)
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  /**
   * 页面相关事件处理函数--获取首页列表数据
   * type分别传入0,1,2
   * rongcloudtoken是登录票据 getApp().globalData.rongcloudtoken
   * self 为this
   */
  get_my_collect: (type = 1, rongcloudtoken, self)=>{



    var self = self;
    var reqData = {
      sortType:1,
      dataSources: type == 0 ? 2 : 1,
      type:1,
      pageSize: 30,
      pageStart:0,
      recursionFlg:1
    };
    var header={
      'content-type': 'application/json;charset=utf-8', // 默认值
      'Cookie': 'JSESSIONID=' + app.globalData.rongcloudtoken
    }
  
    wechatUtil.http_post('/post/search/selectPostBySearch', JSON.stringify(reqData), function (s) {
      //console.log(s)
      //this.globalData.openid = s.data.openid 
      //console.log('getApp().globalData.rongcloudtoken' + getApp().globalData.rongcloudtoken)
      console.log(s)
      
        self.setData({
          my_postList:s.data
        })

    }, function (e) {
      console.log(e)
  
    }, header)
  }
})