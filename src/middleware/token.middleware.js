const { verifyToken } = require("../utils/auth");
const emit = require("../utils/errorEmitter");

const checkToken = async (ctx, next) => {
  const token = ctx.header.authorization;
  const { result, error } = await verifyToken(token);
  if (result) {
    await next();
  } else {
    return emit(ctx, error.message, 401);
  }
};

module.exports = checkToken;
