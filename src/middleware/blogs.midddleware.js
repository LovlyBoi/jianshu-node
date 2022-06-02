const emit = require("../utils/errorEmitter");

const verifyBlog = async (ctx, next) => {
  const blog = ctx.request.body.blog;
  if (!blog.userId || !blog.username) {
    return emit(ctx, "作者信息不全！", 400);
  }
  // 提取文本作为description
  const description = blog.article
    .replace(/<[^<>]+>/g, "")
    .replace(/\n/g, " ")
    .slice(0, 80);
  blog.description = description;
  await next();
};

const verifyReply = async (ctx, next) => {
  const reply = ctx.request.body.reply;
  if (!reply) {
    return emit(ctx, "回复为空", 400);
  }
  if (!reply.author_id) {
    return emit(ctx, "作者id为空！", 400);
  } else if (!reply.content) {
    return emit(ctx, "回复内容为空！", 400);
  } else if (!reply.comment_id) {
    return emit(ctx, "回复评论 id 为空！", 400);
  }
  await next();
};

module.exports = { verifyBlog, verifyReply };
