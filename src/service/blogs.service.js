const connection = require("../app/database");

class BlogService {
  async getBlogById(id) {
    const statement = `SELECT
      blogs.id id,
      blogs.type type,
      blogs.title title,
      blogs.likes likes,
      blogs.location location,
      users.username author,
      users.id author_id,
      users.avatar author_avatar,
      blogs.createAt,
      blogs.updateAt
    FROM
      blogs
      JOIN users ON blogs.author_id = users.id
    WHERE
      blogs.id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  async getComments(id, limit, offset) {
    const statement = `SELECT
      cu.comment_id,
      cu.content,
      cu.like,
      cu.createAt,
      cu.updateAt,
      JSON_OBJECT(
        'author_id',
        cu.user_id,
        'author_name',
        cu.username,
        'avatar',
        cu.avatar
      ) author,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'comment_id',
          r.id,
          'content',
          r.content,
          'like',
          r.like,
          'createAt',
          r.createAt,
          'updateAt',
          r.updateAt,
          'author',
          JSON_OBJECT(
            'author_id',
            u.id,
            'author_name',
            u.username,
            'avatar',
            u.avatar
          )
        )
      ) children
    FROM
      (
        SELECT
          c.id comment_id,
          c.blog_id blog_id,
          c.content content,
          c.like,
          u.id user_id,
          u.username username,
          u.avatar avatar,
          c.createAt,
          c.updateAt
        FROM
          comments c
          JOIN users u ON c.author_id = u.id
        WHERE
          -- 替换 id
          c.blog_id = ?
        ORDER BY
          c.createAt DESC
      ) as cu
      LEFT JOIN reply r ON cu.comment_id = r.comment_id
      LEFT JOIN users u ON u.id = r.author_id
    GROUP BY
      cu.comment_id
    LIMIT ? OFFSET ?;`;
    const result = await connection.execute(statement, [
      id,
      limit + "",
      offset + "",
    ]);
    return result[0];
  }

  async getBlogs(limit, offset) {
    const statement = `SELECT
      blogs.id blog_id,
      blogs.type blog_type,
      blogs.title title,
      blogs.description description,
      blogs.url url,
      blogs.location location,
      count(comments.id) comments,
      blogs.likes likes,
      users.username author,
      blogs.createAt,
      blogs.updateAt
    FROM
      blogs
      JOIN users ON blogs.author_id = users.id
      LEFT JOIN comments ON blogs.id = comments.blog_id
    GROUP BY blogs.id
    ORDER BY
      blogs.updateAt DESC
    LIMIT
      ? OFFSET ?;`;
    const result = await connection.execute(statement, [
      limit + "",
      offset + "",
    ]);
    return result[0];
  }

  async publishBlog({
    type,
    title,
    description,
    url,
    location,
    userId: author_id,
  }) {
    const statement = `INSERT INTO
      blogs (
        type,
        title,
        description,
        url,
        location,
        author_id
      )
    VALUES
      (?, ?, ?, ?, ?, ?);`;

    const result = await connection.execute(statement, [
      type,
      title,
      description,
      url,
      location,
      author_id,
    ]);
    return result[0];
  }

  async publishComment({ blogId, authorId, content }) {
    const statement = `INSERT INTO
      comments (blog_id, author_id, content)
    VALUES
      (?, ?, ?);`;
    const result = await connection.execute(statement, [
      blogId,
      authorId,
      content,
    ]);
    return result[0];
  }

  async publishReply() {}
}

module.exports = new BlogService();
