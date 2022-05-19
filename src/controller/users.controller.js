const usersService = require("../service/users.service");

class UsersController {
  async login(ctx, next) {
    const { username, password } = ctx.request.body;
    await usersService.login(username, password);
    ctx.body = {
      username,
      password,
      msg: "ok",
    };
    next();
  }
}

module.exports = new UsersController();
