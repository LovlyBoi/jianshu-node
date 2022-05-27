const connection = require("../app/database");

// 操作数据库逻辑
class UsersService {
  // 用户注册
  async register(username, password) {
    // 将username和password存储到数据库
    const statement = `INSERT INTO users (username, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [username, password]);
    return result[0];
  }
  // 用户登录
  async login(username) {
    const statement = `SELECT username, password, id, avatar FROM users WHERE username = ?;`;
    const result = await connection.execute(statement, [username]);
    return result[0];
  }
  // 查看用户名
  async getUserByName(username) {
    const statement = `SELECT * FROM users WHERE username = ?;`;
    const result = await connection.execute(statement, [username]);
    return result[0];
  }
  // 获取用户信息
  async getUserInfo(username) {
    const statement = `SELECT * FROM users WHERE username = ?;`;
    const result = await connection.execute(statement, [username]);
    return result[0];
  }
}

module.exports = new UsersService();
