// pages/order/order.js
var appInstance = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",
    orderList: [],
    scrollLeft: 0, //tab标题的滚动条位置
    orderState: ['','待支付', '待接单', '进行中', '待确定', '已完成', '已取消', '售后'],
    currentTab: 0, 
    allPages: '',    // 总页数
    pageNum: 1 // 当前页数  默认是1
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      wx.setStorageSync('idStatus', e.target.dataset.current)
      this.setData({
        currentTab: wx.getStorageSync('idStatus')
      })
    }
  },
  bindChange: function (e) {
    var that = this;
    wx.setStorageSync('idStatus', e.detail.current)
    this.setData({
      currentTab: wx.getStorageSync('idStatus')
    })
    appInstance.orderType(that, that.data.pageNum, that.data.currentTab);
    this.checkCor();
  },
  checkCor: function () {
    if (this.data.currentTab >= 3) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  gotoDetail: function(e){
    var listId = parseInt(e.currentTarget.id);
    wx.setStorageSync('id', e.currentTarget.id);
    wx.request({
      url: 'https://lbs.lanbanshou.com/index.php/api/order/requireDetail2',
      header: {
        'token': wx.getStorageSync('token') // 默认值
      },
      method: 'GET',
      data:{
        id: listId
      },
      success: function(res){
        var codeState = res.data.code;
        var listInfor = res.data.data;
        if (codeState == 200){
          console.log(res.data)
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000,
            success: function(){
              wx.setStorage({
                key: "orderInfor",
                data: listInfor,
                success: function () {
                  wx.navigateTo({
                    url: '../order-detail/order-detail'
                  })
                }
              })
            }
          })
        } else if (codeState == 404){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 100;
        that.setData({
          winHeight: calc
        });
      }
    });
    appInstance.orderType(that, that.data.pageNum, wx.getStorageSync('idStatus'));
  },
  lower: function (e) {
    var that = this;
    this.setData({
      pageNum: that.data.pageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
    });
    appInstance.orderType(that, that.data.pageNum, that.data.currentTab);
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