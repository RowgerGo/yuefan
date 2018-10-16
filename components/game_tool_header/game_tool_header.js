// components/game_tool_header/game_tool_header.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIndex: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfoFun:function(e){
      console.log(e.detail)
      if (e.detail.errMsg == "getUserInfo:ok"){
        getApp().globalData.nickname = e.detail.userInfo.nickName
        wx.navigateTo({
          url: "../../pages/select_time/select_time"
        })
      }
      
   

     
    }
  },
 
})
