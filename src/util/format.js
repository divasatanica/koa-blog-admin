/**
 * 检测是否为空字符串
 * @param {String} str 待检测的字符串
 * @returns {Boolean} 是否为空字符串
 */
function isEmpStr (str) {
  if (typeof str !== 'string') {
    return true
  }
  return !str
}

/**
 * 检测是否为有效的Email地址
 * @param {String} str 待检测的邮箱
 * @returns {Boolean} 是否为有效的Email地址
 */
function isMail (str) {
  return (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)) && !isEmpStr(str)
}

/**
 * 检测用户名是否合乎规范 中英文字符、中划线、下划线 长度不超过20
 * @param {String} str 待检测的用户名 
 * @returns {Boolean} 是否为合乎规范的用户名
 */
function isUserName (str) {
  return (/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_-\u4e00-\u9fa5]{1,20}$/.test(str)) && !isEmpStr(str)
}

export {
  isEmpStr as isEmptyStr,
  isMail,
  isUserName
}
