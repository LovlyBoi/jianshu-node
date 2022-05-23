-- 查询所有博客，一次查10条
SELECT
  blogs.id blog_id,
  blogs.type blog_type,
  users.username author,
  blogs.createAt,
  blogs.updateAt
FROM
  blogs
  JOIN users ON blogs.author_id = users.id
LIMIT
  10 OFFSET ?;

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

-- 查询某篇博客的评论
# 查询 blog_id 的全部评论。(包括顶级+非顶级评论)  表关联，肯定存在冗余字段。
SELECT
  A.offer_comment_id,
  A.offer_user_id,
  A.offer_content,
  A.like offer_like,
  B.own_user_id own_user_id,
  B.content own_content,
  B.like own_like
FROM
  (
    SELECT
      id offer_comment_id,
      author_id offer_user_id,
      content offer_content,
      like
    FROM
      comments
    WHERE
      # 替换blog_id
      blog_id = ?
  ) AS A
  RIGHT JOIN (
    SELECT
      own_user_id,
      content,
      like,
      offer_user_id
    FROM
      comments
    WHERE
      blog_id = ?
  ) AS B ON A.offer_comment_id = B.father_id
LIMIT
  10 OFFSET ?;