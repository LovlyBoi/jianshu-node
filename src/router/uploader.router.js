const KoaRouter = require("koa-router");
const uploader = require("../middleware/uploader.middleware");
const checkToken = require("../middleware/token.middleware");
const UploaderController = require("../controller/uploader.controller");

const uploaderRouter = new KoaRouter({ prefix: "/n/upload" });

uploaderRouter.post(
  "/img",
  checkToken,
  uploader.imageUploader,
  UploaderController.imageUploader
);

module.exports = uploaderRouter;
