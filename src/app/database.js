const mysql = require("mysql2");
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = require("./config");

// 建立连接池
const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

connections.getConnection((err, conn) => {
  if(err) {
    console.log(err)
    return
  }
  conn.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("连接成功");
  });
});

module.exports = connections.promise()
