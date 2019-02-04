import mongoose from 'mongoose'
import dbConfig from '../../config/db-schema'
import commonMethods from './common'
import {formatArticle} from '../util/article'
import {isEmptyStr} from '../util/format'

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

// ArticleSchema.methods.findArticle = commonMethods.$find('article')
ArticleSchema.methods.findArticle = function (query) {
  const $findById = commonMethods.$find('article').bind(this)
  return new Promise((resolve, reject) => {
    if (query && !isEmptyStr(query.id)) {
      $findById(query).exec((err, res) => {
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
ArticleSchema.methods.updateArticle = commonMethods.$update('article')
ArticleSchema.methods.deleteArticle = commonMethods.$delete('article')

const model = mongoose.model('article', ArticleSchema)

export default model