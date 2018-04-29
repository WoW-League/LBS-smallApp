Page({

  /**
   * 页面的初始数据
   */
  data: {
    starNum: 3,
    orderState: ['', '待支付', '待接单', '进行中', '待确定', '已完成', '已取消', '售后'],
    orderInfor: {}
  },
  calling: function(){
    wx.makePhoneCall({
      phoneNumber: '0357-3236692' //仅为示例，并非真实的电话号码
    })
  },
  callWorker: function(){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.orderInfor.tel //仅为示例，并非真实的电话号码
    })
  },
  fareDetail: function(){
    wx.navigateTo({
      url: '../fare-detail/fare-detail',
    })
  },
  cancelOrder: function(){
    wx.showModal({
      title: '您是否取消订单',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://lbs.lanbanshou.com/index.php/api/order/releaseOrder',
            method: 'POST',
            header: {
              'token': wx.getStorageSync('token') // 默认值
            },
            data: {
              "uid": wx.getStorageSync('uid'),
              "id": wx.getStorageSync('id'),
              "rid": [0,1,2]
            },
            success: function(res){
              if(res.data.code == 200){
                wx.showToast({
                  title: res.data.msg,
                  success: function(){
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                })
              }
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  toPay: function(){
    console.log(this.data.openCode)
    var that = this;
    wx.request({
      url: 'https://lbs.lanbanshou.com/index.php/api/pay/pay',
      method: 'GET',
      data: {
        'uid': wx.getStorageSync('uid'),
        'oid': wx.getStorageSync('id'),
        'paytype': 22,
        'openId': that.data.openCode,
        'is_integral': 0
      },
      header: {
        'token': wx.getStorageSync('token') // 默认值
      },
      success: function(res){
        console.log(res);
        var resData = JSON.parse(res.data.data);
        console.log(typeof (resData.timestamp))
        console.log('timestamp:'+ resData.timestamp)
        console.log('noncestr:' + resData.noncestr)
        console.log('package:' + resData.prepayid)
        console.log('sign:'+resData.sign); 
        wx.requestPayment({
          'timeStamp': (resData.timestamp).toString(),
          'nonceStr': resData.noncestr,
          'package': 'prepay_id=*' + resData.prepayid,
          'signType': 'MD5',
          'paySign': resData.sign,
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {

          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code);
        that.setData({
          openCode: res.code
        })
      }
    });
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
    var that = this;
    wx.getStorage({
      key: 'orderInfor',
      success: function (res) {
        that.setData({
          orderInfor: res.data,
          serviceItem: res.data.sidsText || res.data.cats.join(">")
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})