const roleModel = require('../models/role')
const role = new roleModel()
const isEmptyStr = require('../util/format').isEmpStr

const getRole = async ctx => {
  ctx.body = ctx.query && (await role.findRoleById(ctx.query))
}

const updateRole = async ctx => {
  const body = ctx.request.body
  if (query && isEmptyStr(ctx.query.id)) {
    ctx.throw(400, `The 'ID' field is required`)
  }
}

module.exports = {
  getRole
}