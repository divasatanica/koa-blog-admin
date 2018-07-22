import {isEmptyStr} from './format'

/**
 * 对文章数据进行格式化处理
 * @param {Object} article 传入的文章数据
 * @param {Object} target 格式化的目标(Optional)
 * @returns {Object} 格式化后的文章数据
 */

function formatArticle (article, target = {}) {
  let _ = article
  if (isEmptyStr(_.header) || isEmptyStr(_.marked)) {
    return Promise.reject(new Error('Invalid header or content'))
  }
  if (isEmptyStr(_.author)) {
    target.author = '匿名作者'
  }
  for (let key in _) {
    target[key] = _[key]
  }
  target.tag = JSON.parse(JSON.stringify(_.tag))
  return target
}

export {
  formatArticle
}