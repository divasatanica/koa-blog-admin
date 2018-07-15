const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const _objectid = require('objectid')

// Official Middlewares or Plugins

const route = require('koa-route')
const koaBody = require('koa-body')

// My Middlewares/Configs

const api = require('./routes/api')
const router = require('./router')
const baseConfig = require('./config/base-config')
const cookies = require('./middlewares/cookies')
const errorHandler = require('./middlewares/error-handler')
const logger = require('./middlewares/logger')

const port = baseConfig.port
const tomorrowGen = require('./util/time').tomorrowGen

mongoose.connect(baseConfig.dbURL, {
  useNewUrlParser: true
}).then(() => {
  console.log('MongoDB access created')
}).catch(e => {
  console.log(e)
})

global.objectid = _objectid
// global.db = mongoose.createConnection('mongodb://localhost:27017/blog')

// Error Handling
app.use(errorHandler)

// Log in response header and console
app.use(logger.logInHeader)
app.use(logger.logInConsole)

app.use(cookies.setInCookies('view'))
app.use(cookies.setInCookies('count', {
  expires: tomorrowGen(),
  toSetOrNot: ctx => {
    if (ctx.path === '/api/article' && ctx.method === 'POST') {
      return true
    }
    return false
  }
}))

app.use(koaBody())

app.use(api.routes(), api.allowedMethods())


app.listen(port)
console.log(`Listening on Port ${port}`)