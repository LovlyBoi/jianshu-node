const bcrypt = require("bcryptjs");

class Auth {
  async hash(password) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  async verify(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = new Auth();
