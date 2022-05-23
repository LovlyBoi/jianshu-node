const path = require("path");
const multer = require("koa-multer");

function makeStorage(destination) {
  return multer.diskStorage({
    destination: async (req, file, cb) => {
      cb(null, path.resolve(__dirname, destination));
    },
    filename: async (req, file, cb) => {
      // 文件原名称+时间戳
      const filename = `${file.originalname.substring(
        0,
        file.originalname.lastIndexOf(".")
      )}-${Date.now()}${path.extname(file.originalname)}`;
      console.log(filename);
      cb(null, filename);
    },
  });
}

const uploader = {
  imageUploader: multer({ storage: makeStorage("../cache/image/") }).array(
    "file"
  ),
};

module.exports = uploader;
