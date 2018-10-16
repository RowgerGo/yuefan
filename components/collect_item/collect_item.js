// components/collect_item/collect_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {            // 属性名
      type: Object,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    type: {            // 属性名
      type: Number,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    index:{
      type: Number,    
      value: ''    
    }
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
    navigateTo_details:function(e){
      const id = e.currentTarget.dataset.postid
      const type = e.currentTarget.dataset.type
      if(type==1){
        wx.navigateTo({
          url: "../../pages/post_invitation_selfDetails/post_invitation_selfDetails?postId=" + id
        })
      }
    }
  }
})
