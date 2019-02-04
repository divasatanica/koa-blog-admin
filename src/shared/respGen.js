import * as CONST from './const'

export function respSuccess (extend) {
  return Object.assign({
    status: CONST.HTTP_STATUS_200,
    success: CONST.SUCCESS_STATUS,
    msg: CONST.OPR_SUCCESS
  }, extend)
}

export function respFail (extend = {}) {
  return Object.assign({
    status: CONST.HTTP_STATUS_400,
    success: CONST.FAIL_STATUS,
    msg: CONST.PARAM_CHECK_ERROR
  }, extend)
}