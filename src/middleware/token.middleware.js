const { verifyToken } = require("../utils/auth");
const emit = require("../utils/errorEmitter");

const checkToken = async (ctx, next) => {
  const token = ctx.header.authorization;
  // console.log(token)
  const { result, error } = await verifyToken(token);
  if (result) {
    await next();
  } else {
    emit(ctx, error.message, 401);
  }
};

module.exports = checkToken;
