// pages/chart/index.js
import { sensor } from '../../utils/helper.js'

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
      url: `${this.data.baseUrl}/api/telemetry/hour`,
      method: 'POST',
      data: { device: this.data.device.id },
      success: res => {
        this.setData({ sensor: sensor(res.data) })
      },
      complete: () => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
      },
    })
  },
})
