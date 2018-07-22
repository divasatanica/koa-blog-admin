import * as _ from 'koa-router'

import {getArticle, putArticle, postArticle, deleteArticle} from '../controllers/article'
import {getRole, updateRole} from '../controllers/role'

const router = new _({
  prefix: '/api'
})

router.get('/article', getArticle)
      .post('/article', postArticle)
      .put('/article', putArticle)
      .delete('/article', deleteArticle)

router.get('/role', getRole)


export {
  router
}
