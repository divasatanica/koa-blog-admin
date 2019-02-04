import models from '../models/index'
import {isEmptyStr} from '../util/format'
import * as CONST from '../shared/const'


const roleModel = models.role
const role = new roleModel()

const getRole = async ctx => {
  const query = ctx.query
  if (query && isEmptyStr(query.id)) {
    ctx.throw(CONST.HTTP_STATUS_400, CONST.PARAM_CHECK_ERROR)
  }
  ctx.body = await role.findRoleById(query)
}

const updateRole = async ctx => {
  const body = ctx.request.body,
        query = ctx.query
  let emptyBody = (body && (!Array.isArray(body.userToAdd) || !Array.isArray(body.userToRemove) || !body.auth || !body.name)),
      paramCheckFlag = (query && isEmptyStr(query.id) || emptyBody)
  if (paramCheckFlag) {
    ctx.throw(CONST.HTTP_STATUS_400, CONST.PARAM_CHECK_ERROR)
  }

  ctx.body = await role.updateRole(query, body)
}

const addRole = async ctx => {
  const body = ctx.request.body
  if (body && (isEmptyStr(body.id) || isEmptyStr(body.name))) {
    ctx.throw(CONST.HTTP_STATUS_400, CONST.PARAM_CHECK_ERROR)
  }
  ctx.body = await role.addRole(body)
}

const deleteRole = async ctx => {
  const query = ctx.query
  if (query && isEmptyStr(query.id)) {
    ctx.throw(CONST.HTTP_STATUS_400, CONST.PARAM_CHECK_ERROR)
  }
  ctx.body = await role.deleteRole(query)
}

export {
  getRole,
  updateRole,
  addRole,
  deleteRole
}