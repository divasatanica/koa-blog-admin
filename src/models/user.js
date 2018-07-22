import mongoose from 'mongoose'
import dbConfig from '../../config/db-schema'
import commonMethods from './common'
import { isEmptyStr } from '../util/format'

const Schema = mongoose.Schema
const userConfig = dbConfig.user

let UserSchema = new Schema(userConfig.structure, userConfig.collection)



const model = mongoose.model('user', UserSchema)

export default model