// 处理音乐时长的时间
export function ircTimes(time) {
  time = parseInt(time)
  // 大于 10000 说明是毫秒, 需转化为秒
  if (time > 10000) {
    time = Math.floor(time / 1000)
  } else {
    time = Math.floor(time)
  }
  let m = parseInt(time / 60)
  let s = parseInt(time % 60)
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return `${m}: ${s}`
}

// 求出总秒数
export function intervalSeconds(time) {
  time = time.split(':')
  let m = parseInt(time[0])
  let s = parseInt(time[1])
  return m * 60 + s
}
