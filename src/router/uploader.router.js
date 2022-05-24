const KoaRouter = require("koa-router");
const uploader = require("../middleware/uploader.middleware");
const checkToken = require("../middleware/token.middleware");
const uploaderController = require("../controller/uploader.controller");

const uploaderRouter = new KoaRouter({ prefix: "/n/upload" });

uploaderRouter.post(
  "/img",
  checkToken,
  uploader.imageUploader,
  uploaderController.imageUploader
);

module.exports = uploaderRouter;
