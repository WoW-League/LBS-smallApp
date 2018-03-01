// pages/repair/repair.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    firstItem: {},
    secondItem: {},
    currentActive: true,
    choose1Item: '', 
    choose2Item: '', 
    choose3Item: [],
    item1Index: 16,    
    item2Index: 28,
  },
  checkboxChange: function (e) {
    this.setData({
      choose3Item: e.detail.value
    })
  },
  find1Item: function (e) {
    this.setData({
      choose1Item : e.target.dataset.title,
      item1Index: e.target.dataset.index
    }); 
  },
  find2Item: function (e) {
    this.setData({
      choose2Item: e.target.dataset.title,
      item2Index: e.target.dataset.index
    });
  },
  setItemStorage: function(){
    var that = this;
    if (this.data.choose2Item == ''){
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.setStorage({
        key: "chooseItem",
        data: that.data.choose1Item + ">" + that.data.choose2Item + ">" + that.data.choose3Item,
        success:function(){
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://app.lanbanshou.com/phpapi/service/firstService',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          firstItem: res.data.data  
        })
      }
    })
    wx.request({
      url: 'https://app.lanbanshou.com/SSMDemo/data/getService.json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          secondItem: res.data.data
        })
      }
    })
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