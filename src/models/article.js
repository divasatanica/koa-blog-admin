import mongoose from 'mongoose'
import dbConfig from '../../config/db-schema'
import commonMethods from './common'
import {formatArticle} from '../util/article'

const Schema = mongoose.Schema
const articleConfig = dbConfig.article

let ArticleSchema = new Schema(articleConfig.structure, articleConfig.collection)

ArticleSchema.methods.addArticle = async function (article, cb) {
  let _ = article
  formatArticle(_, this)
  await this.save(cb)
  return Promise.resolve({
    success: 1,
    status: 200,
    message: 'The article has been added'
  })
}

ArticleSchema.methods.findArticle = commonMethods.$find('article')
ArticleSchema.methods.updateArticle = commonMethods.$update('article')
ArticleSchema.methods.deleteArticle = commonMethods.$delete('article')

const model = mongoose.model('article', ArticleSchema)

export default model