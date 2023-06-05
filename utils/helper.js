import { limitYsize } from './chart.js'

const opts = {
  dataLabel: false,
  extra: { line: { type: 'curve' } },
}

const xAxis = {
  titleFontColor: '#ee0a24',
  titleOffsetY: 26,
  titleOffsetX: -30,
}

export function sensor(data) {
  console.log(data)
  const result = [
    {
      id: 'dianya',
      chart: {
        opts: {
          ...opts,
          xAxis: { ...xAxis, title: 'V' },
          yAxis: { min: 0, max: 500 },
        },
        data: {
          categories: data.time,
          series: [data.REG20023, data.REG20024, data.REG20025],
        },
      },
    },
    {
      id: 'dianliu',
      chart: {
        opts: {
          ...opts,
          xAxis: { ...xAxis, title: 'A' },
          yAxis: { min: 0, max: 50 },
        },
        data: {
          categories: data.time,
          series: [data.REG20026, data.REG20027, data.REG20028],
        },
      },
    },
    {
      id: 'gonglv',
      chart: {
        opts: {
          ...opts,
          xAxis: { ...xAxis, title: 'kW' },
          yAxis: limitYsize(data.REG20033.data),
        },
        data: {
          categories: data.time,
          series: [data.REG20033],
        },
      },
    },
    {
      id: 'dianneng',
      chart: {
        opts: {
          ...opts,
          xAxis: { ...xAxis, title: 'kWh' },
          yAxis: limitYsize(data.REG20036.data),
        },
        data: {
          categories: data.time,
          series: [data.REG20036],
        },
      },
    },
  ]

  if (data.AI1) {
    result.push({
      id: 'yali',
      chart: {
        opts: {
          ...opts,
          xAxis: { ...xAxis, title: 'kPa' },
          yAxis: limitYsize(data.AI1.data),
        },
        data: {
          categories: data.time,
          series: [data.AI1],
        },
      },
    })
  }

  if (data.AI2) {
    result.push({
      id: 'wendu',
      chart: {
        opts: {
          ...opts,
          xAxis: { ...xAxis, title: '℃' },
          yAxis: limitYsize(data.AI2.data),
        },
        data: {
          categories: data.time,
          series: [data.AI2],
        },
      },
    })
  }

  return result
}
