const KoaRouter = require("koa-router");
const checkToken = require("../middleware/token.middleware");
const userRouter = new KoaRouter({ prefix: "/n/user" });
const {
  login,
  register,
  modifyUsername,
} = require("../controller/users.controller");
const {
  verifyUserRegister,
  verifyUserLogin,
  verifyModifyUser,
} = require("../middleware/users.middleware");

userRouter.post("/register", verifyUserRegister, register);
userRouter.post("/login", verifyUserLogin, login);
userRouter.post("/modifyUsername", checkToken, verifyModifyUser, modifyUsername);

module.exports = userRouter;
