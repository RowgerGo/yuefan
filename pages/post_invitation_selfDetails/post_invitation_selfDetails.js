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
    grids: [{ "url": '', "select": false }, { "url": '', "select": false }, { "url": '', "select": false }, { "url": '', "select": false }, { "url": '', "select": false }, { "url": '', "select": false }, { "url": '', "select": false }, { "url": '', "select": false }, { "url": '', "select": false }],
    postId: 1295,
    post_info: {},
    subType_title:'',
    selected:10000
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const postId = options.postId;
    if (postId) {
      wx.showToast({
        title: postId,
        icon: 'none',
        success: function () {

        }
      })
      this.setData({
        postId: postId
      })
      this.get_post_details(postId, app.globalData.rongcloudtoken, this)


    }  
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
    wx.redirectTo({
      url: "../../pages/index/index"
    })
  },
  get_post_details(type = 1, rongcloudtoken, self) {
    var self = self;
    var reqData = {
      postId: type,
      type: 1,
      start: 0,
      length: 0,
    };
    var header = {
      'content-type': 'application/json;charset=utf-8', // 默认值
      'Cookie': 'JSESSIONID=' + app.globalData.rongcloudtoken
    }

    wechatUtil.http_post('/post/showPostDetail', JSON.stringify(reqData), function (s) {
        self.setData({
          post_info: s.data,
          date: wechatUtil.formatDate(s.data.sceneTime),
          time: wechatUtil.formatTime(s.data.sceneTime),
          day: wechatUtil.formatDay(s.data.sceneTime)
        })
      console.log(wechatUtil.formatDate(s.data.sceneTime))
    }, function (e) {
      console.log(e)

    }, header)
  },
  join_select:function(){
    wx.navigateTo({
      url: "../../pages/join_select/join_select"
    })
  },
  select_image:function(e){
    const index = e.currentTarget.dataset.index
    let grids=this.data.grids
    let select = grids[index].select
    grids[index].select=!select
    console.log(select)
    
    this.setData({
      grids: grids
    })
  },
  delete:function(){
    const grids=this.data.grids
    let count=0
    grids.map(function (value, index) {
      if(value.select){
        count=count+1
      }
    });
    if (count == 0) {
      wx.showModal({
        content: '请先选中图片',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return;
    }
    wx.showModal({
      title: '减去图片提示',
      content: '选中的' +count+'张图片即将被移除，请确认是否继续。',
      confirmText: "确定",
      cancelText: "取消操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('确定')
        } else {
          console.log('取消操作')
        }
      }
    });
  },
  cover:function(){
    const grids = this.data.grids
    let count = 0
    grids.map(function (value, index) {
      if (value.select) {
        count = count + 1
      }
    });
    if (count>1){
      wx.showToast({
        title: '请指定一张图片设置为封面',
        icon:'none',
        duration: 2000
      })
      return;
    }
    if (count ==0) {
      wx.showModal({
        content: '请先选中图片',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return;
    }
    wx.showModal({
      title: '设置封面照片提示',
      content: '选中的图片即将被设置为封面，请确认是否继续。',
      confirmText: "确定",
      cancelText: "取消操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('确定')
        } else {
          console.log('取消操作')
        }
      }
    });
  },
  collect:function(){
    const grids = this.data.grids
    let count = 0
    grids.map(function (value, index) {
      if (value.select) {
        count = count + 1
      }
    });
    if (count == 0) {
      wx.showModal({
        content: '请先选中图片',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return;
    }
    wx.showModal({
      title: '生成D帖收藏提示',
      content: '选中的' + count + '张图片即将生成我的D帖收藏，请确认是否继续。',
      confirmText: "确定",
      cancelText: "取消操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('确定')
        } else {
          console.log('取消操作')
        }
      }
    });
  }
});

