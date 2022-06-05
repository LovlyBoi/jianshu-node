// 初始化缓存目录
const path = require('path')
const fs = require("fs");
const DATA_PATH = '/var/lib/jianshu'

if (path.isAbsolute(DATA_PATH)) {
  console.log('abs')
} else {
  console.log('not')
}

const p = (async () => {
  // 判断平台是不是类unix系统
  const isLikeUnix = process.platform === "darwin" || "linux";
  if (!isLikeUnix) return;
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH) 
  }
  for (const p of ['html', 'image', 'markdown']) {
    if (!fs.existsSync(`${DATA_PATH}/${p}`)) {
      fs.mkdirSync(`${DATA_PATH}/${p}`)
    }
  }

})();

module.exports = {
  result: p,
}
