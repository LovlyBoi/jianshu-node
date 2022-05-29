-- 查询所有博客，一次查10条
SELECT
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
GROUP BY
  blogs.id
ORDER BY
  blogs.updateAt DESC
LIMIT
  ? OFFSET ?;

-- 查询某个博客具体信息
SELECT
  blogs.id blog_id,
  blogs.type blog_type,
  users.username author,
  blogs.location,
  blogs.createAt,
  blogs.updateAt
FROM
  blogs
  JOIN users ON blogs.author_id = users.id
WHERE
  blogs.id = ?;

-- 发布博客
INSERT INTO
  blogs (
    type,
    title,
    description,
    url,
    location,
    author_id
  )
VALUES
  (?, ?, ?, ?, ?, ?);

-- 拿到所有顶级评论
/* SELECT
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
 c.blog_id = 1
 ORDER BY
 c.createAt DESC; */

-- 拿到指定博客的所有评论（树）
SELECT
  cu.comment_id,
  cu.content,
  cu.like,
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
  )
FROM
  (
    SELECT
      c.id comment_id,
      c.blog_id blog_id,
      c.content content,
      c.like like,
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
      c.blog_id = 1
    ORDER BY
      c.createAt DESC
  ) as cu
  LEFT JOIN reply r ON cu.comment_id = r.comment_id
  LEFT JOIN users u ON u.id = r.author_id
GROUP BY
  cu.comment_id
LIMIT
  10 OFFSET 0;
 