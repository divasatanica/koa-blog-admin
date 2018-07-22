import mongoose from 'mongoose'
import {isEmptyStr} from '../util/format'


// 复用mongoose的各个模型可公用的方法

const $find = function (col) {
  return function (query) {
    return new Promise((resolve, reject) => {
      let _ = query
      let _method
      let _param

      // 根据参数中有没有ID字段来确定是ID精确查找还是根据条件筛选
      if (query && !isEmptyStr(query.id)) {
        _method = 'findById'
        _param = query.id
      } else {
        _method = 'find'
        _param = query
      }
      this.model(col)[_method](_param, (err, res) => {
        if (err) {
          reject(err)
        }
        const response = {
          status: 200,
          success: 1,
          data: res ? [res] : []
        }
        resolve(response)
      })
    })
  }
}

const $update = function (col) {
  return function (query) {
    return new Promise((resolve, reject) => {
      if (query && !isEmptyStr(query.id)) {
        this.model(col).findByIdAndUpdate(query.id, query, (err, res) => {
          if (err) {
            reject(err)
          }
          const response = {
            status: 200,
            success: 1,
            message: 'Successfully Updated'
          }
          resolve(response)
        })
      }
    })
  }
}

const $delete = function (col) {
  return function (query) {
    return new Promise((resolve, reject) => {
      if (query && !isEmptyStr(query.id)) {
        this.model(col).findByIdAndRemove(query.id, (err, res) => {
          if (err) {
            reject(err)
          }
          const response = {
            status: 200,
            success: 1,
            message: 'Successfully Deleted',
            data: res
          }
          resolve(response)
        })
      }
    })
  }
}

export {
  $delete,
  $find,
  $update
}