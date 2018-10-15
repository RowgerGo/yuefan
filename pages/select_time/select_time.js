// pages/select_time/select_time.js
const app = getApp()
const wechatUtil = app.wechatUtil
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2018-09-21",
    time: "13:35",
    day: '',
    is_select:false
  },
  bindDateChange: function (e) {
    const day = wechatUtil.transfer_date_to_day(e.detail.value)
    this.setData({
      date: e.detail.value,
      day: day,
      is_select:true
    })
  },
  bindTimeChange: function (e) {
    const day = wechatUtil.transfer_date_to_day(this.data.date)
    this.setData({
      time: e.detail.value,
      day: day,
      is_select: true
    })
  },
  openPick_Place: function () {
    if(!this.data.is_select){
      wx.showToast({
        title: '请选择时间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const info={
      date: this.data.date,
      time: this.data.time,
      day: this.data.day
    }
    console.log(info)
    wx.setStorage({//存储到本地
      key: "invatation_info",
      data: info
    })
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
  navigato_goback:function(){
    wx.navigateBack({ changed: true });//返回上一页
  }
})