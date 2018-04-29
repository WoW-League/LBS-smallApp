// pages/logs/logs.js
var appInstance = getApp();
Page({
  data: {
    activeNext:'',
    inputValue1: wx.getStorageSync('phone') || '',
    inputValue2:'',
    focus: true, 
    focus2: false,
    userInfo: {},
    tabPassText: true,
    toggleState:'none'
  },
  bindKeyInput: function (e) {
    var telInputLength = e.detail.value.length;
    this.setData({
      inputValue1: e.detail.value
    })
    if (this.data.focus == true){
      if (telInputLength === 11) {
        this.setData({
          toggleState: ''
        })
      } else if (1 <= telInputLength && telInputLength < 11) {
        this.setData({
          activeNext: '',
          toggleState: ''
        })
      } else if (telInputLength === 0) {
        this.setData({
          toggleState: 'none'
        })
      }
    } else{
      this.setData({
        toggleState: 'none'
      })
    }
  },
  deleteInput: function(){
    this.setData({
      activeNext: '',
      inputValue1: '',
      focus: true,
      toggleState: 'none'
    })      
  },
  togglePassword: function(e){
    var that = this;
    this.setData({
      tabPassText: !that.data.tabPassText,
      focus2: true
    })
  },
  bindKeyInput2: function (e) {
    var passText = e.detail.value;
    if (passText != ''){
      this.setData({
        inputValue2: passText,
        activeNext: 'active-btn'
      })
    } else{
      this.setData({
        inputValue2: passText,
        activeNext: ''
      })
    }
  },
  goLogin: function(){
    var phone = this.data.inputValue1;
    var mima = this.data.inputValue2;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 2000
      })
    } else if (mima.length == 0){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
    } else{
      appInstance.loginPass(phone, mima);
    }
  },
  forgetPass: function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  onLoad: function () {
    var that = this
    appInstance.authHead(that);
  },
  onShow:function(){
    this.setData({
      inputValue1: wx.getStorageSync('phone') || '',
    })
  }
})