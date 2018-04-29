// pages/logs/logs.js
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userPhone: wx.getStorageSync('phone')
  },
  quitLogin: function(){
    wx.showModal({
      content: '确认退出吗',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.clearStorage();
          // 跳转首页
          wx.redirectTo({
            url: '/pages/login-password/login-password'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  },
  toProtocol: function(){
    wx.navigateTo({
      url: '../user-agreement/user-agreement',
    })
  },
  toShare: function(){
    wx.navigateTo({
      url: '../recommend-gift/recommend-gift',
    })
  },
  toKefu: function(){
    wx.makePhoneCall({
      phoneNumber: '0357-3236692',
    })
  },
  setPassword: function(){
    wx.navigateTo({
      url: '../set-password/set-password',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    appInstance.authHead(that);
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
    this.setData({
      userPhone: wx.getStorageSync('phone')
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