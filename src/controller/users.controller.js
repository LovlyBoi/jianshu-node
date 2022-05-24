const usersService = require("../service/users.service");
const { hash, verify, signToken } = require("../utils/auth");
const emit = require("../utils/errorEmitter");

// 业务逻辑
class UsersController {
  async register(ctx, next) {
    const { username, password } = ctx.request.body;
    // 加密后存进数据库
    const crypted = await hash(password);
    try {
      await usersService.register(username, crypted);
    } catch (e) {
      console.log("注册失败：", e);
      return emit(ctx, "注册失败", 406);
    }
    // 拿到用户id
    let userId;
    try {
      userId = (await usersService.getUserId(username))[0].id;
    } catch(e) {
      console.log(e)
      return emit(ctx, "注册成功，用户id获取失败", 500);
    }
    // 生成token
    const token = await signToken({username});
    ctx.body = {
      username,
      userId,
      token,
      msg: "注册成功！",
    };
    await next();
  }
  async login(ctx, next) {
    const { username, password } = ctx.request.body;
    let result = null;
    // 去数据库拿数据
    try {
      result = await usersService.login(username);
    } catch (e) {
      console.log("登录失败：", e);
      return emit(ctx, "登录失败", 500);
    }
    // 未注册
    if (result.length < 1) {
      return emit(ctx, "用户未注册！", 403);
    }

    // 拿到数据库里的哈希去校验
    const [{ password: crypted, id: userId }] = result;
    if (await verify(password, crypted)) {
      const token = await signToken({username});
      ctx.body = {
        username,
        userId,
        token,
        msg: "登录成功！",
      };
    } else {
      return emit(ctx, "密码错误！", 403);
    }
    await next();
  }
}

module.exports = new UsersController();
