// pages/index-second/index-second.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperimgUrls: [
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    itemData: [
      { service_items_id: 16, service_items_title: "电动车", service_items_img: "../images/index-icon-bicycle.png" },
      { service_items_id: 25, service_items_title: "水 暖", service_items_img: "../images/index-icon-pipe.png" },
      { service_items_id: 67, service_items_title: "清洁", service_items_img: "../images/index-icon-clean.png" },
      { service_items_id: 26, service_items_title: "家居", service_items_img: "../images/index-icon-home.png" },
      { service_items_id: 2, service_items_title: "开锁", service_items_img: "../images/index-icon-lock.png" },
      { service_items_id: 3, service_items_title: "家电", service_items_img: "../images/index-icon-TV.png" },
      { service_items_id: 125, service_items_title: "电脑", service_items_img: "../images/index-icon-computer.png" },
      { service_items_id: 16, service_items_title: "更多", service_items_img: "../images/index-icon-more.png" }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  repairItem: function(e){
    var itemIdx = e.target.dataset.index;
    wx.setStorage({
      key: "itemIdMum",
      data: itemIdx,
      success: () =>{
        wx.navigateTo({
          url: '../repair/repair'
        })
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