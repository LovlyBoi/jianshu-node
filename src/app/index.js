const path = require("path");
const Koa = require("koa");
const koaBodyparser = require("koa-bodyparser");
const koaStatic = require("koa-static");
require("./config");
const userRouter = require("../router/users.router");
const uploadRouter = require("../router/uploader.router");
const errHandler = require("./errorHandle");

const app = new Koa();

app.use(koaBodyparser());

app.use(koaStatic(path.resolve(__dirname, "../cache/image")));

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(uploadRouter.routes());
app.use(uploadRouter.allowedMethods());

// 错误处理
app.on("error", errHandler);

module.exports = app;
