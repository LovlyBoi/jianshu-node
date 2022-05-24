const connection = require("../app/database");

class BlogService {
  async getComments(id, limit, offset) {
    const statement = 
    `SELECT
      cu.comment_id,
      cu.content,
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
          'author',
          JSON_OBJECT(
            'author_id',
            u.id,
            'author_name',
            u.username,
            'author_avatar',
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
    const statement = 
    `SELECT
      blogs.id blog_id,
      blogs.type blog_type,
      users.username author,
      blogs.createAt,
      blogs.updateAt
    FROM
      blogs
      JOIN users ON blogs.author_id = users.id
    ORDER BY blogs.updateAt DESC
    LIMIT
      ? OFFSET ?;`;
    const result = await connection.execute(statement, [
      limit + "",
      offset + "",
    ]);
    return result[0];
  }
}

module.exports = new BlogService();
