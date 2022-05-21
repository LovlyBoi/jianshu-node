const { APP_HOSTNAME, APP_PORT } = require("../app/config");
const emit = require("../utils/errorEmitter");

class UploaderController {
  async imageUploader(ctx, next) {
    if (ctx.req.files.length >= 1) {
      const url = ctx.req.files.map(
        (file) => `${APP_HOSTNAME}:${APP_PORT}/${file.filename}`
      );
      ctx.body = {
        url,
        msg: "上传成功！",
      };
    } else {
      emit(ctx, "上传失败", 500);
    }
    await next();
  }
}

module.exports = new UploaderController();
