const { off } = require("../app");
const blogService = require("../service/blogs.service");
const emmit = require("../utils/errorEmitter");

// 去除都是null的子评论
function handleComments(result) {
  for (const comment of result) {
    comment.children = comment.children.filter((reply) => {
      return reply.comment_id !== null;
    });
  }
  return result;
}

class BlogsController {
  async getCommentsById(ctx, next) {
    try {
      const { id: blogId } = ctx.params;
      const { ps: limit, pn: offset } = ctx.query;
      const result = await blogService.getComments(blogId, limit, offset);
      ctx.body = handleComments(result);
    } catch (e) {
      console.log(e);
      return emmit(ctx, "服务器查询错误", 500);
    }
    await next();
  }
  async getBlogs(ctx, next) {
    try {
      const { ps: limit, pn: offset } = ctx.query;
      const result = await blogService.getBlogs(limit, offset);
      ctx.body = result;
    } catch (e) {
      console.log(e);
      return emmit(ctx, "服务器查询错误", 500);
    }
    await next();
  }
}

module.exports = new BlogsController();
