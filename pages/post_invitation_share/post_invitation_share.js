const app = getApp()
const wechatUtil = app.wechatUtil
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2016-09-02",
    time: "12:01",
    day: '',
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    postId: 1295,
    post_info:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(wechatUtil.formatTime3(new Date()))
    const postId = options.postId;
    if (postId) {
      wx.showToast({
        title: postId,
        icon: 'none',
        success: function () {

        }
      })
      // this.setData({
      //   postId: postId
      // })
    }  
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
  _login:function(){
    var _this = this
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
            self.get_post_info(1, s.data.rongcloudtoken, self)
          }, function (e) {
            console.log(e)
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  get_post_info(type = 1, rongcloudtoken, self){
    var self = self;
    var reqData = {
      postId: this.data.postId,
      type: 1,
      start: 0,
      length: 0,
    };
    var header = {
      'content-type': 'application/json;charset=utf-8', // 默认值
      'Cookie': 'JSESSIONID=' + app.globalData.rongcloudtoken
    }

    wechatUtil.http_post('/post/showPostDetail', JSON.stringify(reqData), function (s) {
      //console.log(s)
      //this.globalData.openid = s.data.openid 
      //console.log('getApp().globalData.rongcloudtoken' + getApp().globalData.rongcloudtoken)
      console.log(s)
      if (type = 1) {
        self.setData({
          post_info: s.data
        })
      }
    }, function (e) {
      console.log(e)

    }, header)
  },
  bindDateChange: function (e) {
    let Day = new Date(e.detail.value).getDay()
    switch (Day) {
      case 1:
        Day = "一"
        break;
      case 2:
        Day = "二"
        break;
      case 3:
        Day = "三"
        break;
      case 4:
        Day = "四"
        break;
      case 5:
        Day = "五"
        break;
      case 6:
        Day = "六"
        break;
      case 7:
        Day = "七"
        break;
      default:
        Day = ""
    }
    this.setData({
      date: e.detail.value,
      day: Day
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  openIndex: function () {
    wx.navigateTo({
      url: "../../pages/index/index"
    })
  },
  openSelectFriends: function () {
    wx.navigateTo({
      url: "../../pages/select_friends/select_friends"
    })
  },
});

