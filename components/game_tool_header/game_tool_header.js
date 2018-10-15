// components/game_tool_header/game_tool_header.js
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
    getUserInfoFun:function(){
      wx.navigateTo({
        url: "../../pages/select_time/select_time"
      })


      console.log(1233)
    }
  },
 
})
