//app.js
import wechatUtil from './utils/index.js';


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
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        if (res.code){
          var reqData = {
            userName: "",
            pwd: "",
            loginType: "xcx_login",
            wxCode: res.code,
            unionid: wx.getStorageSync("unionid")
          };
          this.wechatUtil.http_post('/api/open/loginUser',reqData,function(s){
           console.log(s)
         },function(e){
           console.log(e)
         })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
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
  test:function(a=0,b=1){
    // console.log(a)
    // console.log(b)
    let r=a+b
    return r
  },
  globalData: {
    userInfo: null,
    api_path:'https://portal.deedao.com',
    lat: 31.137603,
    lng: 125.705566,
    addr: "",
    building: "",
    city: "蓬莱",
    myId: 0,
    sex: 1,
    nickname: "",
    isLoadedCookie: false,
    isLoadedCookieForTest: false,
    sessionId: "",
    tmpCounter: 0,
    distanceLast: 500,
    searchStr: {},
    dataSource: 3,
    hasShouQuan: false,
    sessionKey: "",
    isFromApp: false,
    avatar: "",
    isLoadedLocation: false,
    entryUrl: ""
  }
})