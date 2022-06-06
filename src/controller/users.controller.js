const usersService = require("../service/users.service");
const { hash, verify, signToken } = require("../utils/auth");
const { APP_PROXY_PORT, APP_HOSTNAME } = require("../app/config")
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
      return emit(ctx, "注册失败", 500);
    }
    // 拿到用户信息
    let user;
    try {
      user = (await usersService.getUserInfo(username))[0];
    } catch (e) {
      console.log(e);
      return emit(ctx, "注册成功，用户id获取失败", 500);
    }
    // 生成token
    const token = await signToken({ username });
    ctx.body = {
      username,
      userId: user.id,
      avatar: user.avatar,
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
    const [{ password: crypted, id: userId, avatar }] = result;
    if (await verify(password, crypted)) {
      const token = await signToken({ username });
      ctx.body = {
        username,
        userId,
        avatar,
        token,
        msg: "登录成功！",
      };
    } else {
      return emit(ctx, "密码错误！", 403);
    }
    await next();
  }
  async modifyUsername(ctx, next) {
    const { username, id } = ctx.request.body;
    try {
      await usersService.modifyUsername(id, username);
    } catch (e) {
      console.log(e);
      emit(ctx, "数据库修改错误", 500);
    }
    ctx.body = {
      msg: "修改成功！",
      username,
    };
    await next();
  }
  async modifyAvatar(ctx, next) {
    if (ctx.req.files.length >= 1) {
      const url = ctx.req.files.map(
        (file) => `${APP_HOSTNAME}:${APP_PROXY_PORT}/image/${file.filename}`
      )[0];
      const { id } = ctx.request.query;
      try {
        await usersService.modifyAvatar(id, url);
      } catch (e) {
        console.log(e);
        emit(ctx, "数据库查询失败", 500);
      }
      ctx.body = {
        url,
        msg: "上传成功！",
      };
    } else {
      return emit(ctx, "上传失败", 500);
    }

    await next();
  }
}

module.exports = new UsersController();
