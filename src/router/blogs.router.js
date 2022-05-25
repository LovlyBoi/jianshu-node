const KoaRouter = require("koa-router");
const checkToken = require("../middleware/token.middleware");
const blogsController = require("../controller/blogs.controller");
const verifyBlog = require("../middleware/blogs.midddleware");

const blogsRouter = new KoaRouter({ prefix: "/n/blogs" });

// 拿到id对应博客正文
blogsRouter.get("/:id", checkToken, blogsController.getBlogContent);

// 拿到id对应博客评论
blogsRouter.get("/:id/comments", checkToken, blogsController.getCommentsById);

// 拿到所有博客信息
blogsRouter.get("/", checkToken, blogsController.getBlogs);

// 发布博客
blogsRouter.post(
  "/publishBlog",
  checkToken,
  verifyBlog,
  blogsController.publishBlog
);

module.exports = blogsRouter;
