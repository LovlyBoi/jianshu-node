const { getUserByName } = require('../service/users.service')
const emit = require('../utils/errorEmitter')

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username) {
    return emit(ctx, '用户名不能为空', 400);
  } else if (!password) {
    return emit(ctx, '密码不能为空', 400);
  }

  const result = await getUserByName(username);
  
  if (result.length > 0) {
    return emit(ctx, '用户名已经注册', 409);
  }

  await next();
};

module.exports = {
  verifyUser,
};
