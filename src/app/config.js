const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  APP_HOSTNAME,
  APP_PORT,
  APP_PROXY_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  DATA_PATH,
} = process.env
