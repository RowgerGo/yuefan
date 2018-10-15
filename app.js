//app.js
import wechatUtil from './utils/index.js';
var mapCtx0;
// 引入SDK核心类 
var QQMapWX = require('./libs/qqmap-wx-jssdk.js');
// 实例化API核心类 
var demo = new QQMapWX({
  key: 'VLGBZ-MVGK3-JZS3T-YWHZV-N55O3-LBFNG' // 必填
});

App({
  data:{
    info:'测试2131'
  },
  onLaunch: function () {
    //
    this.wechatUtil=new wechatUtil()

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户的位置信息
    this.get_location()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  get_location:function(){
    // 页面加载获取当前定位位置为地图的中心坐标
    var _this = this;
    wx.getLocation({
      success(data) {
        if (data) {
          _this.reverseGeocoder(data.latitude, data.longitude)
        }
      }
    });
  },
  reverseGeocoder: function (latitude, longitude) {
    var _this = this
    demo.reverseGeocoder({
      type: 'gcj02',
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        getApp().globalData.lat = latitude;
        getApp().globalData.lng = longitude;
        getApp().globalData.address = res.result.address;
        getApp().globalData.recommend = res.result.formatted_addresses.recommend
      }
    });
  },
  test:function(a=0,b=1){
    // console.log(a)
    // console.log(b)
    let r=a+b
    return r
  },
  globalData: {
    userInfo: null,
    api_path:'https://portal.deedao.com',
    lat: '',
    lng: '',
    address: "",
    recommend:"",
    building: "",
    city: "蓬莱",
    myId: 0,
    sex: 1,
    openid:'',
    nickname: "",
    isLoadedCookie: false,
    isLoadedCookieForTest: false,
    sessionId: "",
    tmpCounter: 0,
    distanceLast: 500,
    searchStr: {},
    dataSource: 3,
    hasShouQuan: false,
    session_key: "",
    isFromApp: false,
    avatar: "",
    isLoadedLocation: false,
    entryUrl: "",
    rongcloudtoken:''
  }
})