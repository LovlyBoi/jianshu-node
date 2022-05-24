const path = require("path");
const fs = require("fs");
const { APP_HOSTNAME, APP_PORT } = require("../app/config");
const blogService = require("../service/blogs.service");
const md5 = require("md5");
const emit = require("../utils/errorEmitter");

// 去除都是null的子评论
function handleComments(result) {
  for (const comment of result) {
    comment.children = comment.children.filter((reply) => {
      return reply.comment_id !== null;
    });
  }
  return result;
}

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

class BlogsController {
  // 通过博客id拿到博客评论
  async getCommentsById(ctx, next) {
    try {
      const { id: blogId } = ctx.params;
      const { ps: limit, pn: offset } = ctx.query;
      const result = await blogService.getComments(blogId, limit, offset);
      ctx.body = handleComments(result);
    } catch (e) {
      console.log(e);
      return emit(ctx, "服务器查询错误", 500);
    }
    await next();
  }
  // 获取全部博客，分页查询
  async getBlogs(ctx, next) {
    try {
      const { ps: limit, pn: offset } = ctx.query;
      limit ??= 10;
      offset ??= 0;
      const result = await blogService.getBlogs(limit, offset);
      ctx.body = result;
    } catch (e) {
      console.log(e);
      return emit(ctx, "服务器查询错误", 500);
    }
    await next();
  }
  // 发布博客
  async publishBlog(ctx, next) {
    const blog = ctx.request.body.blog;
    // 存储文章
    const filename = await cacheArticle(blog.article);
    // 定制 blog 对象
    blog.location = `cache/html/${filename}`;
    blog.type ??= "随笔";
    blog.url = `${APP_HOSTNAME}:${APP_PORT}/article/${filename}`;
    console.log(blog);
    try {
      // blog信息持久化
      await blogService.publishBlog(blog);
    } catch (e) {
      console.log(e);
      return emit(ctx, "服务器查询错误", 500);
    }
    ctx.body = {
      msg: "发布成功",
    };
    await next();
  }
}

module.exports = new BlogsController();
