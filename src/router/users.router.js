const KoaRouter = require("koa-router");
const userRouter = new KoaRouter({ prefix: "/n/user" });
const { login, register } = require("../controller/users.controller");
const {
  verifyUserRegister,
  verifyUserLogin,
} = require("../middleware/users.middleware");

userRouter.post("/register", verifyUserRegister, register);
userRouter.post("/login", verifyUserLogin, login);

module.exports = userRouter;
