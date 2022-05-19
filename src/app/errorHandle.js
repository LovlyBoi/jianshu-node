const errHandler = (ctx, err, status) => {
  ctx.status = status
  ctx.body = {
    msg: err.message
  }
}

module.exports = errHandler
