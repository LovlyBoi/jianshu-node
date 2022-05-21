const path = require("path");
const multer = require("koa-multer");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../cache/image/"));
  },
  filename: async (req, file, cb) => {
    const filename = `${file.originalname.substring(
      0,
      file.originalname.lastIndexOf(".")
    )}-${Date.now()}${path.extname(file.originalname)}`;
    console.log(filename);
    cb(null, filename);
  },
});

const uploader = {
  imageUploader: multer({ storage }).array("file"),
};

module.exports = uploader;
