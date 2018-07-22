import models from '../models/index'
import {isEmptyStr} from '../util/format'


const roleModel = models.role
const role = new roleModel()

const getRole = async ctx => {
  ctx.body = ctx.query && (await role.findRoleById(ctx.query))
}

const updateRole = async ctx => {
  const body = ctx.request.body
  if (query && isEmptyStr(ctx.query.id)) {
    ctx.throw(400, `The 'ID' field is required`)
  }
}

export {
  getRole,
  updateRole
}