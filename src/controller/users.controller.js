const usersService = require("../service/users.service");
const { hash, verify } = require("../utils/auth");
const emit = require("../utils/errorEmitter");

// 业务逻辑
class UsersController {
  async register(ctx, next) {
    const { username, password } = ctx.request.body;
    const crypted = await hash(password);
    try {
      await usersService.register(username, crypted);
    } catch (e) {
      console.log("注册失败：", e);
      return emit(ctx, "注册失败", 406);
    }
    ctx.body = {
      username,
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
    const [{ password: crypted }] = result;
    if (await verify(password, crypted)) {
      ctx.body = {
        msg: "登录成功！",
        token: "token",
      };
    } else {
      return emit(ctx, "密码错误！", 403);
    }
    await next();
  }
}

module.exports = new UsersController();