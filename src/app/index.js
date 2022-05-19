const Koa = require("koa");
const koaBodyparser = require("koa-bodyparser");
require("./config");
const userRouter = require("../router/users.router");
const errHandler = require("./errorHandle")

const app = new Koa();

app.use(koaBodyparser());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// 错误处理
app.on('error', errHandler)

module.exports = app;
