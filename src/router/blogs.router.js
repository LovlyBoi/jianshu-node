const KoaRouter = require("koa-router");
const checkToken = require("../middleware/token.middleware");
const blogsController = require("../controller/blogs.controller");

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

module.exports = blogsRouter;
