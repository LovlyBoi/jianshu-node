// 初始化缓存目录
const path = require('path')
const fs = require("fs");
const { DATA_PATH } = require('./config')

const CACHE_PATH = path.resolve(DATA_PATH, './cache')
console.log(CACHE_PATH)

const p = (async () => {
  // 判断平台是不是linux系统
  const isLinux = process.platform === "linux";
  if (!isLinux) return;
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH)
  }
  if (!fs.existsSync(CACHE_PATH)) {
    fs.mkdirSync(CACHE_PATH)
  }
  for (const p of ['html', 'image', 'markdown']) {
    if (!fs.existsSync(`${CACHE_PATH}/${p}`)) {
      fs.mkdirSync(`${CACHE_PATH}/${p}`)
    }
  }
})();

module.exports = {
  result: p,
}
