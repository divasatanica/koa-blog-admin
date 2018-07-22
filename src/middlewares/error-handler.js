const handler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      message: err.message,
      status: ctx.response.status,
      success: 0
    }
  }
}

export {
  handler
}