// pages/pick_place/pick_place.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    latitude: '',
    longitude: '',
    poi_name:''
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

  },
  navigateTo_map:function(){
    wx.navigateTo({
      url: "../../pages/select_from_map/select_from_map"
    })
  },
  navigateTo_selectTheme:function(e){
    var _this = this
    const type = e.currentTarget.dataset.type
    if(type==1){

      wx.getStorage({
        key: 'invatation_info',
        success: function (res) {
          const data = res.data
          data.address = _this.data.address
          data.latitude = _this.data.latitude
          data.longitude = _this.data.longitude
          data.poi_name = _this.data.poi_name

          wx.setStorage({//存储到本地
            key: "invatation_info",
            data: data
          })
        }
      })
      wx.navigateTo({
        url: "../../pages/post_invitation/post_invitation"
      })
    }else{
      wx.navigateTo({
        url: "../../pages/post_invitation/post_invitation"
      })
    }
  
  }
})