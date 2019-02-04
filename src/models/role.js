import mongoose from 'mongoose'
import dbConfig from '../../config/db-schema'
import commonMethods from './common'
import {isEmptyStr} from '../util/format'
import * as CONST from '../shared/const'
import { respSuccess } from '../shared/respGen';

const Schema = mongoose.Schema
const roleConfig = dbConfig.role
let RoleSchema = new Schema(roleConfig.structure, roleConfig.collection)

const FindRoleById = commonMethods.$find('role'),
      DeleteRoleById = commonMethods.$delete('role')
const PARAM_CHECK_ERROR_OBJECT = {
  msg: CONST.PARAM_CHECK_ERROR,
  status: CONST.HTTP_STATUS_400
}

RoleSchema.methods.addRole = function (...role) {
  return new Promise((resolve, reject) => {
    this.model('role').insertMany(role).exec(function (err, docs) {
      if (err) {
        reject(err)
      }
      resolve(docs)
    })
  })
}

RoleSchema.methods.findRoleById = function (query) {
  const $findById = FindRoleById.bind(this)
  return new Promise((resolve, reject) => {
    if (query && !isEmptyStr(query.id)) {
      $findById(query).populate('contain').exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(respSuccess({
          data: res ? [res] : []
        }))
      })
    }
  })
}

RoleSchema.methods.updateRole = function (query, body) {
  const $findById = FindRoleById.bind(this)
  return new Promise((resolve, reject) => {
    let emptyBody = (body && (!Array.isArray(body.userToAdd) || !Array.isArray(body.userToRemove) || !body.auth || !body.name));
    let paramCheckFlag = (query && isEmptyStr(query.id) || emptyBody)
    
    if (paramCheckFlag) {
      reject(respFail(PARAM_CHECK_ERROR_OBJECT));
    }
    $findById(query).exec(async (err, role) => {
      if (err) {
        reject(err)
      }
      let _contain = role.contain
      body.userToRemove.forEach(item => {
        let index = _contain.indexOf(item)
        if (index > -1) {
          _contain.splice(index, 1)
        }
      })
      _contain = _contain.concat(body.userToAdd)
      role.contain = _contain
      try {
        await role.save()
      } catch (error) {
        reject(error)
      }
      resolve(respSuccess())
    })
  })
}

RoleSchema.methods.deleteRole = function (query) {
    const $deleteRoleById = DeleteRoleById.bind(this)
    return new Promise((resolve, reject) => {
      if (query && isEmptyStr(query.id)) {
        reject(respFail(PARAM_CHECK_ERROR_OBJECT))
      }
      $deleteRoleById(query).exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(respSuccess())
      })
    })
}

const model = mongoose.model('role', RoleSchema)

export default model