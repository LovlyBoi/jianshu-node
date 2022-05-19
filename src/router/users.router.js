const KoaRouter = require('koa-router')
const userRouter = new KoaRouter({ prefix: '/n/user' })
const { login, register } = require('../controller/users.controller')
const { verifyUser } = require('../middleware/users.middleware')

userRouter.post('/register', verifyUser, register)
userRouter.post('/login', verifyUser, login)

module.exports = userRouter
