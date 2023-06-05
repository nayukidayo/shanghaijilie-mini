function formatTime(time, duration) {
  const date = new Date(time)
  switch (duration) {
    case '1h':
      return date.getMinutes().toString()
    case '1d':
      return date.getHours().toString()
    case '7d':
      return date.getDate().toString()
  }
  return date
}

const coverXtitle = {
  '1h': '分',
  '1d': '时',
  '7d': '日',
}

export function limitYsize(value) {
  if (!value.length) return
  const num = value[value.length - 1]
  const change = num * 0.5
  return { min: num - change, max: num + change || 5 }
}

export default function (history, duration) {
  const data = {
    categories: history.time.map(v => formatTime(v, duration)),
    series: [{ name: history.name, data: history.value }],
  }

  const opts = {
    extra: { line: { type: 'curve' } },
    xAxis: { title: coverXtitle[duration], titleOffsetY: 24, titleOffsetX: -24 },
    yAxis: limitYsize(history.value),
  }

  return { opts, data }
}
