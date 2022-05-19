class UsersService {
  async login(username, password) {
    // 将username和password存储到数据库
    console.log(`将${username}和${password}存储到数据库`)
  }
}

module.exports = new UsersService()