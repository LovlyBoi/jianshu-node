const fs = require("fs");
const path = require("path");
const md5 = require("md5");

// 存储文章，md5摘要防止重复上传
async function cacheArticle(article) {
  const filename = md5(article);
  console.log(filename);
  await fs.promises.writeFile(
    path.resolve(__dirname, `../cache/html/${filename}`),
    article
  );
  return filename;
}

// 从文件中读取文章
async function getArticle(location) {
  const filePath = path.resolve(__dirname, "../", location);
  return fs.promises.readFile(filePath);
}

module.exports = {
  cacheArticle,
  getArticle,
};
