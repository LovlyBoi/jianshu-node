const emit = require("../utils/errorEmitter");

const verifyBlog = async (ctx, next) => {
  const blog = ctx.request.body.blog
  if (!blog.userId || !blog.username) {
    return emit(ctx, '作者信息不全！', 400)
  }
  const description = blog.article.replace(/<[^<>]+>/g,"").replace(/\n/g, ' ')
  blog.description = description
  await next();
}

module.exports = verifyBlog;
