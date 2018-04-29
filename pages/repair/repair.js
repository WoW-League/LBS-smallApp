// pages/repair/repair.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    firstItem: {},
    secondItem: {},
    currentActive: true,
    choose1Item: '电动车', 
    choose2Item: '自行车', 
    twoArrIndex: [28, 49, 66, 71, 92, 101, 126, 140],
    twoArrItem: ['自行车', '暖气', '维修', '家居', '开锁', '热水器',  '网络', '搬家'],
    choose3Item: [],
    item1Index: 16,    
    item2Index: 28, 
    item3Index: []
  },
  checkboxChange: function (e) {
    var arr = e.detail.value;
    var iIndex = [];
    var iItem3 = [];
    for(let i=0; i<arr.length; i++){
      iIndex.push(parseInt(arr[i].split(',')[1]));
      iItem3.push(arr[i].split(',')[0]);
    }
    console.log(iIndex);
    this.setData({
      item3Index: iIndex,
      choose3Item: iItem3
    })
  },
  find1Item: function (e) {
    console.log(e.target.id);
    this.setData({
      choose1Item : e.target.dataset.title,
      choose2Item: this.data.twoArrItem[e.target.id],
      item1Index: e.target.dataset.index,
      item2Index: this.data.twoArrIndex[e.target.id]
    }); 
  },
  find2Item: function (e) {
    console.log(e.target.dataset.index);
    this.setData({
      choose2Item: e.target.dataset.title,
      item2Index: e.target.dataset.index
    });
  },
  areaInput: function(e){
    console.log(e.detail.value);
    this.setData({
      areaValue: e.detail.value
    })
  },
  setItemStorage: function(){
    console.log(this.data.choose3Item.length);
    var that = this;
    if (this.data.choose2Item != '' && this.data.choose3Item.length == 0){
      wx.showToast({
        title: '没选维修项目哦',
        icon: 'none'
      })
    } else {
      wx.setStorage({
        key: 'chooseIndex',
        data: [that.data.item1Index, that.data.item2Index].concat(that.data.item3Index)
      })
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        areaValue: this.data.areaValue
      })

      wx.setStorage({
        key: "chooseItem",
        data: that.data.choose1Item + ">" + that.data.choose2Item + ">" + that.data.choose3Item,
        success:function(){
          wx.switchTab({
            url: '../index/index',
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
      url: 'https://lbs.lanbanshou.com/index.php/api/service/firstService',
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
      url: 'https://lbs.lanbanshou.com/index.php/api/service/getService',
      header: {
        'token': wx.getStorageSync('token')  // 默认值
      },
      method: 'GET',
      success: function (res) {
        var errMsg = res.data.msg;
        console.log(res);
        if (res.data.code == 0){
          wx.showModal({
            // title: '提示',
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
        } else if (res.data.code == 200){
          that.setData({
            secondItem: res.data.data
          })
        }
      }
    })
    //获取从首页传过来的itemId 显示对应item选项
    // wx.getStorage({
    //   key: 'itemIdMum',
    //   success: (res)=> {
    //     this.setData({
    //       item1Index: res.data
    //     })
    //   }
    // })
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