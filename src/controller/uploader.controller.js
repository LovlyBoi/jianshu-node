const { APP_HOSTNAME, APP_PORT } = require("../app/config");
const emit = require("../utils/errorEmitter");

class UploaderController {
  async imageUploader(ctx, next) {
    console.log(ctx.req.files);
    if (ctx.req.files) {
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
