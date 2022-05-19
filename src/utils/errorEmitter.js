function emitter(ctx, msg, status = 404) {
  if (ctx) {
    ctx.app.emit("error", ctx, new Error(msg), status);
  }
}

module.exports = emitter
