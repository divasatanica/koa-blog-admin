import mongoose from 'mongoose'
import dbConfig from '../../config/db-schema'
import commonMethods from './common'
import {isEmptyStr} from '../util/format'

const Schema = mongoose.Schema
const roleConfig = dbConfig.role

let RoleSchema = new Schema(roleConfig.structure, roleConfig.collection)

RoleSchema.methods.addRole = async function (role, cb) {
  
}

RoleSchema.methods.findRoleById = function (query) {
  return new Promise((resolve, reject) => {
    if (query && !isEmptyStr(query.id)) {
      this.model('role').findById(query.id).populate('contain').exec((err, res) => {
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
    }
  })
}

RoleSchema.methods.updateOneContain = function (query) {
  return new Promise((resolve, reject) => {
    if (query && !isEmptyStr(query.id)) {
      this.model('role').findById(query.id, async (err, role) => {
        if (err) {
          reject(err)
        }
        role.contain.push(query.userId)
        await role.save()
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

RoleSchema.methods.updateRole = commonMethods.$update('role')

const model = mongoose.model('role', RoleSchema)

export default model