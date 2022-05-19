const app = require("./src/app");
require('./src/app/database')
const { APP_PORT } = require("./src/app/config");

app.listen(APP_PORT);
