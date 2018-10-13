function goLogin(app) {
  /**/
  console.log("goLogin.start.");
  console.log(Date.parse(new Date()));

  wx.login({
    success: function (res0) {
      console.log(res0);
      //return;

      // 获取用户信息
      if (res0.code) {
        var reqData = {
          userName: "",
          pwd: "",
          loginType: "xcx_login",
          wxCode: res0.code,
          unionid: wx.getStorageSync("unionid")
        };
        var reqDataStr = JSON.stringify(reqData);
        console.log("APPPPPPPPP");
        console.log(reqDataStr);
        //发起网络请求
        wx.request({
          url: getApp().globalData.url_root + '/api/open/loginUser',
          method: 'POST',
          header: {
            "Content-Type": "application/json"
          },
          data: reqDataStr,
          success: function (res3) {
            console.log("goLogin.mid.");
            console.log(Date.parse(new Date()));
            console.log(res3);
            if (res3.data.data == undefined || res3.data.msg != 'login success') {
              console.log("@");
              console.log(getApp().globalData.tmpCounter);
              if (getApp().globalData.tmpCounter == 10) {
                return;
              }
              getApp().globalData.tmpCounter++;
              goLogin(res0, getApp());
              return;
            } else {
              getApp().globalData.myId = res3.data.data.id;
              getApp().globalData.sex = res3.data.data.sex;
              getApp().globalData.nickname = res3.data.data.nickname;
              getApp().globalData.sessionId = res3.data.data.rongcloudtoken;
              getApp().globalData.sessionKey = res3.data.data.session_key;
              getApp().globalData.avatar = res3.data.data.portraituri;
              if (res3.data.data.unionid == undefined) { //未授权
                getApp().globalData.hasShouQuan = false;
                getApp().globalData.isLoadedCookie = true;
                var time = setInterval(function () {
                  if (getApp().globalData != undefined &&
                    getApp().globalData.hasShouQuan == true) {
                    clearInterval(time);
                    goLocation();
                  }
                }, 100);
              } else {
                getApp().globalData.hasShouQuan = true;
                goLocation();
              }
            }
            console.log("goLogin.end.");
            console.log(Date.parse(new Date()));
          },
          fail(e) {
            console.log("essror");
            console.log(e);
            if (getApp().globalData.tmpCounter == 10) {
              return;
            }
            getApp().globalData.tmpCounter++;
            goLogin(res0, getApp());
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (getApp().userInfoReadyCallback) {
        getApp().userInfoReadyCallback(res2)
      }
    },
    fail: function () {
      console.log("启用wx.login函数，失败！");
    },
    complete: function () {
      console.log("已启用wx.login函数");
    }
  });
}

module.exports = {
  goLogin: goLogin
}
