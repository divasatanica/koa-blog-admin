import mongoose from 'mongoose'
import {isEmptyStr} from '../util/format'


// 复用mongoose的各个模型可公用的方法

const $find = function (col) {
  return function (query) {
    let _ = query || {}
    let _method
    let _param

    // 根据参数中有没有ID字段来确定是ID精确查找还是根据条件筛选
    if (!isEmptyStr(query.id)) {
      _method = 'findById'
      _param = query.id
    } else {
      _method = 'find'
      _param = query
    }
    return this.model(col)[_method](_param)
  }
}

const $update = function (col) {
  return function (query, body) {
    return this.model[col].findByIdAndUpdate(query.id, body)
  }
}

const $delete = function (col) {
  return function (query) {
    return this.model[col].findByIdAndRemove(query.id)
  }
}



export default {
  $delete,
  $find,
  $update
}