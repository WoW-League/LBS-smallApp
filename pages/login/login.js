// pages/logs/logs.js
const app = getApp();
Page({
  data: {
    activeNext:'',
    inputValue: '',
    focus: true, 
    focus2: false,
    getChange: true,
    secondInputState:'none',
    loginState: true,
    mainColor: true,
    yzmText: '获取验证码',
    codeText: '',
    loginActive: false,
    userInfo: {},
    toggleState:'none'
  },
  bindKeyInput: function (e) {
    var telInputLength = e.detail.value.length;
    this.setData({
      inputValue: e.detail.value
    })
    if (this.data.focus == true){
      if (telInputLength === 11) {
        this.setData({
          activeNext: 'active-btn',
          toggleState: ''
        })
      } else if (1 <= telInputLength && telInputLength < 11) {
        this.setData({
          activeNext: '',
          secondInputState: 'none',
          loginState: true,
          loginActive: false,
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
      inputValue: '',
      focus: true,
      toggleState: 'none'
    })      
  },
  nextStep: function(){
    var phone = this.data.inputValue;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.yanZhengInput();
    }
  },
  yanZhengInput: function(){
    var getChange = this.data.getChange;
    var n = 59;
    if (getChange) {
      this.setData({
        toggleState: 'none',
        activeNext: 'none',
        focus2: true,
        secondInputState: '',
        loginState: false,
        mainColor: false,
        yzmText: '(60)重新获取',
        getChange: false
      })
      var that = this;
      var time = setInterval(function () {
        var str = '(' + n + ')' + '重新获取'
        that.setData({
          yzmText: str
        })
        if (n <= 0) {
          that.setData({
            getChange: true,
            mainColor: true,
            yzmText: '重新获取'
          })
          clearInterval(time);
        }
        n--;
      }, 1000);
    }
  },
  bindKeyInput2: function(e){
    this.setData({
      codeText: e.detail.value
    });
    if (e.detail.value.length == 4){
      this.setData({
        loginActive: true
      })
    }else {
      this.setData({
        loginActive: false
      })
    }
  },
  loginCode: function(){
    var codeL = this.data.codeText.length; 
    if (codeL>0 && codeL<4){
      wx.showToast({
        title: '验证码有误',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  onLoad: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo:res.userInfo
        });
      }
    });
  }
})