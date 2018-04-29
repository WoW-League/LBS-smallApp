const hours = []
const hours2 = []
const date = new Date()
const nowYear = date.getFullYear()//获取年
const nowMonth = fillZero(date.getMonth()+1)//获取月
const nowDay = fillZero(date.getDate())//获取日
const nowHours = fillZero(date.getHours())//小时
const nowMinutes = fillZero(date.getMinutes())//分钟
const nowSeconds = fillZero(date.getSeconds()) //获取秒
function fillZero(s) {
  return s < 10 ? '0' + s : s;
};
for (let i = nowHours; i <= 23; i++) {
  hours.push(i + '点')
}
hours.splice(0, 1, "现在");
for (let i = 0; i <= 23; i++) {
  hours2.push(i + '点')
}
// 引入SDK核心类
var QQMapWX = require('../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
// 调用接口
Page({
  data:{
    thisCity: '',
    locationInfor:'',
    wzLocation:{},
    synthesizeItem:'',
    multiArray: [['今天', '明天', '后天'], hours, ['']],
    multiIndex: [0, 0, 0],
    serviceDate: '现在上门',
    ruleDate: nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHours + ':' + nowMinutes + ':' + nowSeconds,
    sids: [],
    controls: [{
      id: 1,
      iconPath: '../images/location.png',
      position: {
        left: 315,
        top: 140,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },  
  chooseAdd: function(){
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          locationInfor: res.name,
          wzLocation:res
        })
      }
    })
  },
  repeairItem: function(){
    wx.navigateTo({
      url: '../repair/repair'
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = hours;
            data.multiArray[2] = ['', '10分', '20分', '30分', '40分', '50分'];
            break;
          case 1:
            data.multiArray[1] = hours2;
            data.multiArray[2] = ['00分', '10分', '20分', '30分', '40分', '50分'];
            break;
          case 2:
            data.multiArray[1] = hours2;
            data.multiArray[2] = ['00分', '10分', '20分', '30分', '40分', '50分'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = [''];
                break;
              default:
                data.multiArray[2] = ['00分', '10分', '20分', '30分', '40分', '50分'];
            }
            break;
        }
      }
    this.setData(data);
    var appointDay = (this.data.multiArray[0][this.data.multiIndex[0]]).replace('现在', nowHours);
    var appointHours = (this.data.multiArray[1][this.data.multiIndex[1]]).replace('点', ':');
    var appointMinutes = (this.data.multiArray[2][this.data.multiIndex[2]]).replace('分', '');
    var appointDate = appointDay + ' ' + appointHours + appointMinutes
    
    this.setData({
      serviceDate: appointDate.replace('今天 现在', '现在上门')
    })
    // 2018 - 04 - 02 16:26:00
      //num 0 今天 1 明天 2后天
      //nowYester 0 现在时间 其他 选择的时间
    function getRiqi(num,nowYester){
      if (nowYester == 1){
        return nowYear + '-' + nowMonth + '-' + (nowDay + num) + ' ' + that.fillZero(parseInt(appointHours)) + ':' + appointMinutes + ':' + nowSeconds;
      } else{
        return nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHours + ':' + nowMinutes + ':' + nowSeconds;
      }
     
    } 
    if (appointDay == '今天'){
      if (appointHours == '现在'){
        this.setData({
          ruleDate: getRiqi(0, 0)
        })
      } else{
        this.setData({
          ruleDate: getRiqi(0,1)
        })
      }
      console.log(this.data.ruleDate);
    } else if (appointDay == '明天'){
      this.setData({
        ruleDate: getRiqi(1,1)
      })
      console.log(getRiqi(1,1));
    } else if (appointDay == '后天'){
      this.setData({
        ruleDate: getRiqi(2,1)
      })
      console.log(getRiqi(2,1));
    }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  controltap(e) {
    this.mapCtx.moveToLocation();
  },
  personInfro:function(){
    wx.navigateTo({
      url: '../myinfor/myinfor',
    })
  },
  fillZero: function (s) {
    return s < 10 ? '0' + s : s;
  },
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var infor = e.detail.value;
    if (infor.sidsText == ''){
      wx.showToast({
        title: '没选维修项目哦',
        icon: 'none'
      }) 
    } else {
      wx.request({
        url: 'https://lbs.lanbanshou.com/index.php/api/order/makeRequire',
        data: e.detail.value,
        header: {
          'token': wx.getStorageSync('token') // 默认值
        },
        method: "POST",
        success: function (res) {
          if (res.data.code == 0) {
            wx.showModal({
              content: '令牌失效请重新登录吧！',
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
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000,
              success: function () {
                wx.setStorage({
                  key: "orderInfor",
                  data: infor,
                  success: function () {
                    wx.navigateTo({
                      url: '../order-detail/order-detail',
                      success: function () {
                        wx.removeStorage({
                          key: 'chooseItem',
                          success: function () {
                            that.setData({
                              synthesizeItem: ''
                            })
                          }
                        });
                        wx.removeStorage({
                          key: 'chooseIndex',
                          success: function () {
                            that.setData({
                              sids: ''
                            })
                          }
                        });
                      }
                    })
                  }
                })              
              }
            })
          } else if (res.data.code == 404) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
          console.log(res.data)
        }
      })
    }
  },
  onLoad: function(){
    var that = this;
    // 实例化API核心类
    qqmapsdk  = new QQMapWX({
      key: 'J6EBZ-6YFCS-RKGOF-6TQ3B-L5JRE-5MFJF' // 必填
    });
    //城市列表
    qqmapsdk.getCityList({
      success: function (res) {
        console.log(res.result[1]);
      },
      fail: function (res) {
        console.log(res);
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var clientWidth = res.windowWidth;
        that.setData({
          controls: [{
            id: 1,
            iconPath: '../images/location.png',
            position: {
              left: clientWidth-60,
              top: 110,
              width: 40,
              height: 40
            },
            clickable: true
          }]
        });
      }
    });
  },
  onShow: function(){
    this.setData({
      uid: wx.getStorageSync('uid'),
      tel: wx.getStorageSync('phone'),
    })
    var that = this;
    wx.getStorage({
      key: 'chooseItem',
      success: function (res) {
        var repairItem = res.data.split('>');
        console.log(repairItem);
        that.setData({
          synthesizeItem: res.data
        })
      }
    })
    wx.getStorage({
      key: 'chooseIndex',
      success: function (res) {
        console.log(res);
        that.setData({
          sids: res.data
        })
      }
    })
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap');
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        wx.setStorage({ key: "latitude", data: res.latitude });
        wx.setStorage({ key: "longitude", data: res.longitude });
        //逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log(res)
            that.setData({
              locationInfor: res.result.formatted_addresses.recommend,
              thisCity: res.result.address_component.city
            })
          },
          fail: function (res) {
            console.log(res);
          }
        });   
        that.setData({
          wzLocation: res
        })
      }
    })
  },
})