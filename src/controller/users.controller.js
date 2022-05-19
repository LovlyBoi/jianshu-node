const usersService = require("../service/users.service");

// 业务逻辑
class UsersController {
  async register(ctx, next) {
    const { username, password } = ctx.request.body;
    const result = await usersService.register(username, password);
    console.log(result)
    ctx.body = {
      username,
      password,
      result: result,
    };
    next();
  }
  async login() {

  }
}

module.exports = new UsersController();
