const KoaRouter = require('koa-router')
const { login } = require('../controller/users.controller')
const userRouter = new KoaRouter({ prefix: '/n/user' })

userRouter.post('/login', login)

module.exports = userRouter