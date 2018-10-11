// pages/select_time/select_time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2018-09-21",
    time: "13:35",
    day: '',

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
  openPick_Place: function () {
    wx.navigateTo({
      url: "../../pages/pick_place/pick_place"
    })
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

  }
})