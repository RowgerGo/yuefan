class wechatUtil {
  DeeDaoConfig = {
    rootDocment: 'https://portal.deedao.com'
  }
  judgeNull(value) {
    if (value == null || value == undefined) return true
    if (this.judgeString(value)) {
      if (value.trim().length == 0) return true
    } else if (this.judgeArray(value)) {
      if (value.length == 0) return true
    } else if (this.judgeObject(value)) {
      for (let name in value) return false
      return true
    }
    return false;
  }
  judgeString(value) {
    return value != null && value != undefined && value.constructor == String
  }
  judgeNumber(value) {
    return value != null && value != undefined && value.constructor == Number
  }
  judgeBoolean(value) {
    return value != null && value != undefined && value.constructor == Boolean
  }
  judgeArray(value) {
    return value != null && value != undefined && value.constructor == Array
  }
  judgeObject(value) {
    return value != null && value != undefined && value.constructor == Object
  }
  judgeFunction(value) {
    return value != null && value != undefined && value.constructor == Function
  }
  mergeObject() {
    let newObject = {}
    for (let a = 0; a < arguments.length; a++) {
      let mergeObject = arguments[a]
      for (let prototype in mergeObject) {
        let mergeObjectPrototype = mergeObject[prototype]
        if (this.judgeObject(mergeObjectPrototype)) {
          newObject[prototype] = this.mergeObject({}, mergeObjectPrototype)
        } else if (this.judgeArray(mergeObjectPrototype) && this.judgeObject(mergeObjectPrototype[0])) {
          let newArray = []
          for (let b = 0; b < mergeObjectPrototype.length; b++) {
            newArray.push(this.mergeObject({}, mergeObjectPrototype[a]))
          }
          newObject[prototype] = newArray
        } else {
          newObject[prototype] = mergeObjectPrototype
        }
      }
    }
    return newObject
  }
  getApp() {
    return getApp()
  }
  getCurrentPages() {
    return getCurrentPages()
  }
  getCurrentPage() {
    let pages = this.getCurrentPages()
    return pages[pages.length - 1]
  }
  getCurrentPath() {
    return this.getCurrentPage().__route__
  }
  getPath(targetPath) {
    let currentPath = this.getCurrentPath()
    return this.getRelativePath(currentPath, targetPath)
  }
  getRelativePath(currentPath, targetPath) {
    let currentPathArray = currentPath.split('/')
    let targetPathArray = targetPath.split('/')
    let samePath = false
    let levelNumber = 0
    let relativePath = ''
    for (let a = 0; a < currentPathArray.length; a++) {
      let currentPathData = currentPathArray[a]
      for (let b = 0; b < targetPathArray.length; b++) {
        let targetPathData = targetPathArray[b]
        if (targetPathData == currentPathData) {
          levelNumber = currentPathArray.length - b - 1
          samePath = true
          break
        }
      }
    }
    if (samePath) {
      for (let a = 0; a < levelNumber - 1; a++) {
        relativePath += '../'
      }
      for (let a = levelNumber; a > 0; a--) {
        let targetPathData = targetPathArray[a]
        if (a == 1) relativePath += targetPathData
        else relativePath += targetPathData + '/'
      }
    } else {
      levelNumber = currentPathArray.length - 1
      for (let a = 0; a < levelNumber; a++) {
        relativePath += '../'
      }
      for (let a = 0; a < targetPathArray.length; a++) {
        let targetPathData = targetPathArray[a]
        if (a == targetPathArray.length - 1) relativePath += targetPathData
        else relativePath += targetPathData + '/'
      }
    }
    return relativePath
  }
  transfer_date_to_day(date){
    let Day = new Date(date).getDay()
    console.log(Day)
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
        Day = "天"
        break;
      case 0:
        Day = "天"
        break;
      default:
        Day = ""
    }
    return Day
  }
  getTimestamp() {
    return Date.parse(new Date())
  }
  getClassName(params) {
    if (this.judgeNull(params)) return ''
    if (!this.judgeObject(params)) {
      console.error('expect object params')
      return ''
    }
    let className = ''
    for (var name in params) {
      if (params[name]) className += ' ' + name
    }
    return className.replace(/ /, '')
  }
  test(e){
    console.log(this.DeeDaoConfig.rootDocment+e)
  }
  http_get(url = null, data = null, suc, err){
    wx.request({
      url: 'https://portal.deedao.com' + url, //仅为示例，并非真实的接口地址
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        suc(res.data)
      },
      fail: function () {
        err("请求错误")
      }
    })
 }
  http_post(url = null, data = null,suc, err,header={}) {
    wx.request({
      url: 'https://portal.deedao.com' + url, //仅为示例，并非真实的接口地址
      data: data,
      method:'POST',
      header: header,
      success(res) {
        suc(res.data)
        console.log(wx.getStorageSync("rongcloudtoken"))
      },
      fail: function () {
        err("请求错误")
      }
    })
  }
}

export default wechatUtil