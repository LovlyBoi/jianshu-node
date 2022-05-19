const Koa = require("koa");
const koaBodyparser = require("koa-bodyparser");
require("./config");
const userRouter = require("../router/users.router");

const app = new Koa();

app.use(koaBodyparser());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

module.exports = app;
