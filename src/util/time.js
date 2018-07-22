/**
 * 生成11位数字时间戳
 * @param count 当天上传文章的计数(0-999)
 * @returns 11位数字时间戳
 */
function timeStampGen (count) {
  let date = new Date()
  let dateStamp = String(date.getFullYear()) + (date.getMonth() > 8 ? '' : '0') + String(date.getMonth() + 1) + (date.getDate() > 9 ? '' : '0') + String(date.getDate())
  let countStamp
  if (count < 10) {
    countStamp = `00${count}`
  } else if (count < 100 && count >= 10) {
    countStamp = `0${count}`
  } else {
    countStamp = count
  }
  return `${dateStamp}${countStamp}`
}

/**
 * 生成一个当天的第二天零点的Date对象
 * @returns Date对象
 */
function tomorrowGen () {
  let date = new Date()
  let dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`
  return new Date(dateStr)
}

export {
  timeStampGen,
  tomorrowGen
}