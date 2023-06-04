// pages/sensor/index.js
import chart from '../../utils/chart.js'

Page({
  data: {
    baseUrl: 'https://ems.hztauto.com',
    device: {},
    sensor: {},
    duration: '1h',
    tabs: [
      { name: '1h', title: '一小时' },
      { name: '1d', title: '一天' },
      { name: '7d', title: '七天' },
    ],
    chart: null,
  },

  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sensor', ({ device, sensor }) => {
      this.setData({ device, sensor })
    })
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: `网关${this.data.device.id} - ${this.data.sensor.name}`,
    })
  },

  onShow() {
    wx.showLoading({ mask: true, title: '加载中...' })
    wx.request({
      url: `${this.data.baseUrl}/api/telemetry/history`,
      method: 'POST',
      data: {
        device: this.data.device.id,
        flag: this.data.sensor.flag,
        duration: this.data.duration,
      },
      success: res => {
        this.setData({
          chart: chart(res.data, this.data.duration),
        })
      },
      complete: () => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
      },
    })
  },

  onPullDownRefresh() {
    this.onShow()
  },

  onTabChange(e) {
    this.setData({ duration: e.detail.name })
    this.onShow()
  },
})
