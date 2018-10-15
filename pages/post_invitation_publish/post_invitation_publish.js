
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
    url_inputValue:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    wx.getStorage({
      key: 'invatation_info',
      success: function (res) {
        console.log(res.data)
        _this.setData({
          date: res.data.date,
          time: res.data.time,
          address: res.data.address,
          day: res.data.day,
          theme_title: res.data.theme_title,
          src: res.data.theme_cover,
          poi_name:res.data.poi_name,
          url_inputValue: res.data.url_inputValue         
        })
      }
    })
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
    const _this = this
    wx.getStorage({
      key: 'invatation_info',
      success: function (res) {
        console.log(res.data)
        const data = res.data
        data.url_inputValue = _this.data.url_inputValue,

          wx.setStorage({ //存储到本地
            key: "invatation_info",
            data: data
          })

      }
    })
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
  bindKeyInput: function (e) {
    this.setData({
      url_inputValue: e.detail.value
    })
  },
  bindDateChange: function (e) {
    const Day = wechatUtil.transfer_date_to_day(e.detail.value)
    console.log(Day)
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
  navagateTo_theme:function(){
    wx.navigateTo({
      url: "../../pages/select_theme/select_theme?from=publish"
    })
  },
  navagateTo_editeAddress:function(){
    wx.navigateTo({
      url: "../../pages/select_from_map/select_from_map?from=publish"
    })
  },
  onShareAppMessage: (res) => {
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    }
    else {
      console.log("来自右上角转发菜单")
    }
    return {
      title: '妹子图片',
      path: '/pages/share/share?id=123',
      imageUrl: "/images/1.jpg",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
});

