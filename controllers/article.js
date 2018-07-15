const articleModel = require('../models/index').article
const timeStampGen = require('../util/time').timeStampgen
const marked = require('marked')
const isEmptyStr = require('../util/format').isEmpStr

const getArticle = async ctx => {
  const article = new articleModel()
  ctx.body = ctx.query && (await article.findArticle(ctx.query))
}

const postArticle = async ctx => {
  const body = ctx.request.body
  const _count = ctx.cookies.get('count') || 0
  const newArticle = new articleModel()
  const data = {
    header: body.header,
    author: body.author,
    marked: marked(body.passage2mark),
    timeStamp: timeStampGen(_count),
    tag: (() => {
      try {
        return JSON.parse(body.tags)
      } catch (e) {
        ctx.throw(400, `The key 'tags' must be JSON format`)
      }
    })(),
    clock: body.clock
  }
  ctx.body = await newArticle.addArticle(data)
}

const putArticle = async ctx => {
  const body = ctx.request.body
  const newUpdate = new articleModel()
  if (query && isEmptyStr(ctx.query.id)) {
    ctx.throw(400, `The 'ID' field is required`)
  }
  const data = {
    id: ctx.query.id,
    header: body.header,
    author: body.author,
    marked: marked(body.passage2mark),
    timeStamp: body.timeStamp,
    tag: (() => {
      try {
        return JSON.parse(body.tags)
      } catch (e) {
        ctx.throw(400, `The key 'tags' must be JSON format`)
      }
    }),
    clock: body.clock
  }
  ctx.body = await newUpdate.updateArticle(data)
}

const deleteArticle = async ctx => {
  const newDelete = new articleModel()
  const query = ctx.query
  if (query && isEmptyStr(query.id)) {
    ctx.throw(400, `The 'ID' field is required`)
  }
  ctx.body = await newDelete.deleteArticle(query)
}

module.exports = {
  getArticle,
  postArticle,
  putArticle,
  deleteArticle
}