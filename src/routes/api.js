import _ from 'koa-router'

import {getArticle, putArticle, postArticle, deleteArticle} from '../controllers/article'
import {getRole, updateRole, addRole, deleteRole} from '../controllers/role'

const router = new _({
  prefix: '/api'
})

router.get('/article', getArticle)
      .post('/article', postArticle)
      .put('/article', putArticle)
      .delete('/article', deleteArticle)

router.get('/role', getRole)
      .post('/role', addRole)
      .put('/role', updateRole)
      .delete('/role', deleteRole)


export {
  router
}
