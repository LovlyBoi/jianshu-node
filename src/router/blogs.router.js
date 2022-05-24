const KoaRouter = require("koa-router");
const checkToken = require("../middleware/token.middleware");
const blogsController = require("../controller/blogs.controller");
const verifyBlog = require("../middleware/blogs.midddleware")

const blogsRouter = new KoaRouter({ prefix: "/n/blogs" });

blogsRouter.get(
  "/:id",
  checkToken,
  blogsController.getCommentsById
);

blogsRouter.get(
  "/getBlogs",
  checkToken,
  blogsController.getBlogs
)

blogsRouter.post(
  "/publishBlog",
  checkToken,
  verifyBlog,
  blogsController.publishBlog
)

module.exports = blogsRouter;
