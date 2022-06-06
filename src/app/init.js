// 初始化缓存目录
const path = require("path");
const fs = require("fs");
let { DATA_PATH } = require("./config");

// 判断平台是不是linux系统
const isLinux = process.platform === "linux";
// 是linux系统，cache放在 /usr/share/jianshu
if (isLinux) {
  DATA_PATH = '/usr/share/jianshu'
}
// 不是linux系统，说明在本地开发，cahce放在自定义位置
let CACHE_PATH = path.resolve(DATA_PATH, "./cache");

const p = (async () => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
  }
  if (!fs.existsSync(CACHE_PATH)) {
    fs.mkdirSync(CACHE_PATH);
  }
  for (const p of ["html", "image", "markdown"]) {
    if (!fs.existsSync(`${CACHE_PATH}/${p}`)) {
      fs.mkdirSync(`${CACHE_PATH}/${p}`);
    }
  }
})();

console.log("文件缓存路径:", CACHE_PATH);

module.exports = {
  result: p,
  DATA_PATH,
  CACHE_PATH,
};
