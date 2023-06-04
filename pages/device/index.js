// pages/device/index.js
Page({
  data: {
    init: true,
    baseUrl: 'https://ems.hztauto.com',
    device: {},
    sensor: [],
  },

  onLoad() {
    setTimeout(() => this.setData({ init: false }))
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('device', ({ device }) => {
      this.setData({ device }, () => this.query())
    })
  },

  onShow() {
    if (this.data.init) return
    this.query()
  },

  onReady() {
    wx.setNavigationBarTitle({ title: this.data.device.name })
  },

  onPullDownRefresh() {
    this.query()
  },

  query() {
    wx.showLoading({ mask: true, title: '加载中...' })
    wx.request({
      url: `${this.data.baseUrl}/api/telemetry/latest`,
      method: 'POST',
      data: { device: this.data.device.id },
      success: res => {
        this.setData({ sensor: res.data })
      },
      complete: () => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
      },
    })
  },

  onTap(e) {
    const sensor = this.data.sensor.find(v => v.flag === e.currentTarget.dataset.flag)
    wx.navigateTo({
      url: '/pages/sensor/index',
      success: res => {
        res.eventChannel.emit('sensor', {
          device: this.data.device,
          sensor,
        })
      },
    })
  },
})
