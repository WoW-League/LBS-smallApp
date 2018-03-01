const date = new Date()
const hours = []
const hours2 = []
const nowHours = date.getHours()
const nowDay = date.getDay()
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
          locationInfor: res.name
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
    var appointMinutes = (this.data.multiArray[2][this.data.multiIndex[2]]).replace('分', ' ');
    var appointDate = appointDay + ' ' + appointHours + appointMinutes
    
    this.setData({
      serviceDate: appointDate.replace('今天 现在', '现在上门')
    })
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
  immediatelyOrder:function(){
    wx.navigateTo({
      url: '../order-detail/order-detail'
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
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
    var that = this;
    wx.getStorage({
      key: 'chooseItem',
      success: function (res) {
        that.setData({
          synthesizeItem: res.data
        },function(){
          wx.removeStorage({
            key: 'chooseItem'
          })
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