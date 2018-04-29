App({
  onLaunch: function () {
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo;
        console.log(res)
      }
    })
  },
  login: function (phoneNumber, authCode){
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          wx.request({
            url: 'https://lbs.lanbanshou.com/index.php/api/user/userLogin',
            data: {
              phone: phoneNumber,
              captcha: authCode
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
              if (res.data.code == 200) {
                wx.showLoading({
                  title: res.data.msg,
                  success: function () {
                    wx.setStorageSync('token', res.data.info.token);
                    wx.setStorageSync('phone', res.data.info.phone);
                    wx.setStorageSync('uid', res.data.info.id);
                    // 跳转首页
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  }
                })
                setTimeout(function () {
                  wx.hideLoading()
                }, 2000)
              } else {
                wx.showToast({
                  title: '验证码错误',
                  icon: 'none',
                  duration: 2000
                })
              }      
            },
            fail: function (res) {
              console.log('登录失败！' + res.errMsg)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  loginPass: function (phoneNumber, passtext) {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res);
          //发起网络请求
          wx.request({
            url: 'https://lbs.lanbanshou.com/index.php/api/user/userLogin',
            data: {
              phone: phoneNumber,
              pwd: passtext
            },
            method: 'POST',
            success: function (res) {
              // 跳转首页
              console.log(res);
              if(res.data.code == 200){
                wx.showLoading({
                  title: '正在登录中',
                  success: function(){
                    wx.setStorageSync('token', res.data.info.token);
                    wx.setStorageSync('phone', res.data.info.phone);
                    wx.setStorageSync('uid', res.data.info.id);
                    // 跳转首页
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  }
                })
                setTimeout(function () {
                  wx.hideLoading()
                }, 2000)
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail: function(res){
              console.log('登录失败！' + res.errMsg)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  authHead: function(obj){
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              obj.setData({
                userInfo: res.userInfo
              });
            }
          })
        } else{
          obj.setData({
            userInfo: {'avatarUrl':'../images/default-headImg.png'}
          });
        }
      }
    })
  },
  orderType: function(obj,pageNum,orderStatus){
    wx.request({
      url: 'https://lbs.lanbanshou.com/index.php/api/order/order',
      header: {
        'token': wx.getStorageSync('token') // 默认值
      },
      method: 'GET',
      data: {
        uid: wx.getStorageSync('uid'),//用户id
        utype: 1, //用户类型，1-用户，2-服务人员
        status: orderStatus,//单状态0.全部，1.待支付，2.待接单，3.进行中，4.待确定，5.已完成 , 6.已取消，7-售后
        page: 1,
        pagesize: pageNum*5
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showModal({
            // title: '提示',
            content: '令牌失效是否重新登录',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../login-password/login-password',
                })
              } else if (res.cancel) {
                wx.showToast({
                  title: '不能下单了哟',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else if (res.data.code == 200) {
          //console.log(res.data.data);
          //console.log(obj.data.allPages == res.data.data.length)
          if (obj.data.allPages == res.data.data.length){
            wx.showToast({
              title: '没有更多了',
            })
            return;
          }
          obj.setData({
            allPages: res.data.data.length
          });
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 500,
            success: function () {
              obj.setData({
                orderList: res.data.data
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})