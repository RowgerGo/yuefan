// pages/enter_map/enter_map.js
var mapCtx0;
// 引入SDK核心类 
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// 实例化API核心类 
var demo = new QQMapWX({
  key: 'VLGBZ-MVGK3-JZS3T-YWHZV-N55O3-LBFNG' // 必填
});
Page({

  /**
   * 页面的初始数据longitude="115.929465" latitude="28.68396"
   */
  data: {
    latitude: '28.68396',
    longitude: '115.929465',
    inputShowed: false,
    inputVal: "",
    circles: [{
      latitude: '28.68396',
      longitude: '115.929465',
      color: '#FF0000DD',
      fillColor: '#E6A5B788',
      radius: 3000,
      strokeWidth:0.1
    }],
    markers: [],
    address:'',
    recommend:''
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面加载获取当前定位位置为地图的中心坐标
    var _this = this;
    wx.getLocation({
      success(data) {
        if (data) {

          _this.reverseGeocoder(data.latitude, data.longitude)

          _this.setData({
            latitude: data.latitude,
            longitude: data.longitude,
            markers: [{
              id: 0,
              latitude: data.latitude,
              longitude: data.longitude,
              width: 32,
              height: 32
            }],
            circles: [{
              latitude: data.latitude,
              longitude: data.longitude,
              color: '#DB6283',
              fillColor: '#E6A5B788',
              radius: 3000,
              strokeWidth: 1
            }],
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  getLngLat: function() {
    var that = this;
    this.mapCtx = wx.createMapContext("map");
    this.mapCtx.getCenterLocation({
      success: function(res) {
        that.reverseGeocoder(res.latitude, res.longitude)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            width: 30,
            height: 30
          }],
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#FF0000DD',
            fillColor: '#E6A5B788',
            radius: 3000,
            strokeWidth: 1
          }],
        })

      }
    })
  },
  regionchange: function(e) {
    if (e.causedBy == "drag") {
      this.getLngLat()
    }
  },
  reverseGeocoder: function (latitude, longitude){
    var _this=this
    demo.reverseGeocoder({
      type: 'gcj02',
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res.result)
        _this.setData({
          address: res.result.address,
          recommend: res.result.formatted_addresses.recommend
        })
        // getApp().globalData.lat = latitude;
        // getApp().globalData.lng = longitude;
        // getApp().globalData.city = res.result.address_component.city;
        // getApp().globalData.isLoadedCookie = true;
        // getApp().globalData.isLoadedLocation = true;
      }
    });
  },
  navigato_back:function(){
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      address: this.data.address,
    });
    wx.navigateBack({//返回
      delta: 1
    })
  },
  navigato_switchCity: function() {
    wx.navigateTo({
      url: "../../pages/select_from_switch/select_from_switch"
    })
  }
})