//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    info: '',
    motto: 'Hello World',
    grids: [0, 0, 2, 3, 34, 435, 345, 456, 45645],
    userInfo: {},
    grid_select: 8,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showTopTips: false,
    date: "2016-09-02",
    time: "12:01",
    day: '',
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    isAgree: false
  },
  //事件处理函数
  onLoad:function(){
    var data = {
      x: 1,
      y: 20000
    }
    app.http_get('/config/distanceAndRandom', data, (res) => {
      this.setData({
        info: res.data.distance
      })
    }, (e) => {
      console.log(e)
    })
  },
  bindDateChange: function(e) {
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
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  }

})