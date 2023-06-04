// pages/signin/index.js
const app = getApp()

Page({
  data: {
    username: '',
    password: '',
    remember: true,
  },

  onReady() {
    wx.hideHomeButton()
  },

  onUsernameChange(e) {
    this.setData({ username: e.detail })
  },

  onPasswordChange(e) {
    this.setData({ password: e.detail })
  },

  onCheckboxToggle() {
    this.setData({ remember: !this.data.remember })
  },

  onBtnClick() {
    wx.showToast({ title: '加载中', icon: 'loading', mask: true })
    setTimeout(() => {
      if (
        this.data.username !== app.globalData.username ||
        this.data.password !== app.globalData.password
      ) {
        wx.showToast({ title: '认证失败', icon: 'error' })
        return
      }
      if (this.data.remember) {
        try {
          wx.setStorageSync('auth', {
            username: this.data.username,
            password: this.data.password,
          })
        } catch (err) {
          console.log(err)
        }
      }
      wx.redirectTo({ url: '/pages/gateway/index?type=login' })
    }, 200)
  },
})
