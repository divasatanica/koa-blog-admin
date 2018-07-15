const _ = require('koa-router')

const _article = require('../controllers/article')
const _role = require('../controllers/role')

const router = new _({
  prefix: '/api'
})

router.get('/article', _article.getArticle)
      .post('/article', _article.postArticle)
      .put('/article', _article.putArticle)
      .delete('/article', _article.deleteArticle)

router.get('/role', _role.getRole)


module.exports = router
