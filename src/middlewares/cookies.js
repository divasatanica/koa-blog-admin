const setInCookies = (keyName, options) => {
  const _options = options || {}
  return async (ctx, next) => {
    const value = Number(ctx.cookies.get(keyName) || 0) + 1
    let toSetOrNot = true
    if (_options.toSetOrNot && typeof _options.toSetOrNot === 'function') {
      toSetOrNot = _options.toSetOrNot(ctx)
    }
    if (toSetOrNot) {
      await next()
      ctx.cookies.set(keyName, value, _options)
    } else {
      await next()
    }
  }
}

export {
  setInCookies
}