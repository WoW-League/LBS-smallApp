// pages/set-password/set-password.js
Page({
  data: {
    inputValue1: '',
    inputValue2: '',
    tabPassText1: true,  
    tabPassText2: true
  },
  bindKeyInput1: function (e) {
    this.setData({
      inputValue1: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      inputValue2: e.detail.value
    })
  },
  confirmChange: function(){
    var that = this;
    if (this.data.inputValue1 == '' || this.data.inputValue1 == '') {
      wx.showToast({
        title: '请输入新密码',
      })
    }
    else if (this.data.inputValue1 != this.data.inputValue2 ) {
      wx.showToast({
        title: '密码不一致',
      })
    }
    else {
      wx.request({
        url: 'https://lbs.lanbanshou.com/index.php/api/user/changeLoginPassword',
        method: 'POST',
        data:{
          "password": that.data.inputValue1,
          "phone": wx.getStorageSync('phone')
        },
        success: function(res){
          if(res.data.code == 200){
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              success: function(){
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        }
      })
    }
  }
})