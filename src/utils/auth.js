const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { privateKey, publicKey } = require("../../secret");

class Auth {
  // 密码bcrypt加密
  async hash(password) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  // 判断密码是否相同
  async verify(password, hash) {
    return bcrypt.compare(password, hash);
  }
  // 生成token
  async signToken(payload, expiresIn = 60 * 60 * 24) {
    return jwt.sign(payload, privateKey, { expiresIn, algorithm: "RS256" }); // 一天失效
  }
  // token校验
  async verifyToken(token) {
    const result = {
      result: false,
      error: null,
      payload: {},
    }
    if (!token) {
      result.result = false;
      result.error = new Error('token为空');
    }
    let decoded;
    try {
      decoded = jwt.verify(token, publicKey);
      console.log(decoded, '----')
    } catch (e) {
      result.result = false;
      result.error = e;
      return result;
    }
    if (decoded.exp < Date.now() / 1000) {
      result.result = false;
      result.error = new Error('token过期');
      result.payload = decoded;
    } else {
      result.result = true;
      result.error = null;
      result.payload = decoded;
    }
    return result;
  }
}

module.exports = new Auth();

// test
// ;(async () => {
//   const auth = new Auth()
//   const token = await auth.signToken({username: 'siven'})
//   console.log(await auth.verifyToken(token))
// })();
