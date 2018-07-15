const schemaConfig = require('../config/db-schema')
const mongoose = require('mongoose')
const isEmptyStr = require('../util/format').isEmpStr
const Schema = mongoose.Schema
const userConfig = schemaConfig.user

let UserSchema = new Schema(userConfig.structure, userConfig.collection)



const model = mongoose.model('user', UserSchema)

module.exports = model