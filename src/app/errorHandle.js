const errHandler = (ctx, err, status) => {
  ctx.status = status
  ctx.body = err.message
}

module.exports = errHandler
