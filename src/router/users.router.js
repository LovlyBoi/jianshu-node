const KoaRouter = require("koa-router");
const checkToken = require("../middleware/token.middleware");
const userRouter = new KoaRouter({ prefix: "/n/user" });
const uploader = require("../middleware/uploader.middleware");
const {
  login,
  register,
  modifyUsername,
  modifyAvatar,
} = require("../controller/users.controller");
const {
  verifyUserRegister,
  verifyUserLogin,
  verifyModifyUser,
  verifyModifyAvatar,
} = require("../middleware/users.middleware");

userRouter.post("/register", verifyUserRegister, register);
userRouter.post("/login", verifyUserLogin, login);
userRouter.post(
  "/modifyUsername",
  checkToken,
  verifyModifyUser,
  modifyUsername
);
userRouter.post(
  "/modifyAvatar",
  checkToken,
  verifyModifyAvatar,
  uploader.imageUploader,
  modifyAvatar
);

module.exports = userRouter;
