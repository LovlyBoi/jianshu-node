const { APP_HOSTNAME, APP_PORT } = require("../app/config");
const blogService = require("../service/blogs.service");
const emit = require("../utils/errorEmitter");
const { cacheArticle, getArticle } = require("../utils/cacheArticle");

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
  // 拿到id对应博客正文
  async getBlogContent(ctx, next) {
    const id = ctx.request.params.id;
    let blog;
    // 去数据库拿id对应的博客信息
    try {
      blog = await blogService.getBlogById(id);
      if (blog.length < 1) return emit(ctx, "没有这篇文章哦", 400);
      blog = blog[0];
    } catch (e) {
      console.log(e);
      return emit(ctx, "服务器查询错误", 500);
    }
    // 去文件系统读入文章信息
    const article = await getArticle(blog.location);
    ctx.body = {
      article: article.toString(),
      ...blog,
    }
    await next();
  }
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
