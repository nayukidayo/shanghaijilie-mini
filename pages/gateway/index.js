// pages/gateway/index.js
const app = getApp()

Page({
  data: {
    init: true,
    baseUrl: 'https://ems.hztauto.com',
    gateway: [],
    tag: {
      zhendong: {
        name: '振动',
        color: '#1989fa',
      },
      dianbiao: {
        name: '电表',
        color: '#7232dd',
      },
      wendu: {
        name: '温度',
        color: '#dd8332',
      },
      yali: {
        name: '压力',
        color: '#ad0000',
      },
    },
  },

  onLoad(opts) {
    setTimeout(() => this.setData({ init: false }))
    if (opts?.type !== 'login') {
      try {
        const auth = wx.getStorageSync('auth')
        if (
          auth.username !== app.globalData.username ||
          auth.password !== app.globalData.password
        ) {
          throw new Error('Authentication failed')
        }
      } catch (_) {
        wx.redirectTo({ url: '/pages/signin/index' })
      }
    }
    this.query()
  },

  onShow() {
    if (this.data.init) return
    this.query()
  },

  onPullDownRefresh() {
    this.query()
  },

  query() {
    wx.showLoading({ mask: true, title: '加载中...' })
    wx.request({
      url: `${this.data.baseUrl}/api/device`,
      success: res => {
        this.setData({ gateway: res.data })
      },
      complete: () => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
      },
    })
  },

  onTap(e) {
    const device = this.data.gateway.find(v => v.id === e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/device/index',
      success: res => {
        res.eventChannel.emit('device', { device })
      },
    })
  },
})
