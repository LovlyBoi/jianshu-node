-- 用户信息表
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL UNIQUE,
  `password` VARCHAR(80) NOT NULL,
  `avatar` VARCHAR(80) DEFAULT 'http://localhost:10000/avatar-1653271813785.jpeg',
  `createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 博客表
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  -- 博客类型
  `type` VARCHAR(20) NOT NULL,
  -- 博客题目
  `title` VARCHAR(50) NOT NULL,
  -- 博客的描述
  `description` VARCHAR(100) NOT NULL,
  -- 点赞数
  `likes` INT DEFAULT 0,
  -- 博客地址
  `url` VARCHAR(100) NOT NULL,
  -- 博客存储的位置
  `location` VARCHAR(50) NOT NULL,
  -- 作者id
  `author_id` INT NOT NULL,
  `createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

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
  (
    '笔记',
    '一切都是最好的安排',
    '重阳篇（一）早上半醒半梦间，伸手搂了个空，翻身起来看，真的只有我一人。李雪砚呢？卫生间门口的布帘子打着，也没人。房间里又暗又静，我打了个哆嗦',
    'https://www.jianshu.com/p/750084883e4d',
    'markdown/test.md',
    1
  );

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
  (
    '随笔',
    '风语||风声里，那碗昂贵的泡面',
    '01 四点半钟，我第五次走进洗漱间，对着镜子再次确认自己的妆容没问题，才换上精心挑选的米色风衣、黑色高跟鞋，拎着亮晶晶的链条小包出了门。 我打车',
    'https://www.jianshu.com/p/094d64910e97',
    'markdown/test1.md',
    1
  );

-- 评论表
CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `blog_id` INT NOT NULL,
  -- 本评论持有者id
  `author_id` INT NOT NULL,
  `content` VARCHAR(100) NOT NULL,
  `like` INT DEFAULT 0,
  `createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
  comments (blog_id, author_id, content)
VALUES
  (1, 2, '文章写得很好！');

INSERT INTO
  comments (blog_id, author_id, content)
VALUES
  (1, 1, '写的什么破玩意！');

-- 评论回复
CREATE TABLE IF NOT EXISTS `reply` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `comment_id` INT NOT NULL,
  -- 作者id
  `author_id` INT NOT NULL,
  `content` VARCHAR(100) NOT NULL,
  `like` INT DEFAULT 0,
  `createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
  reply (comment_id, author_id, content)
VALUES
  (2, 2, '写的明明很好！');

INSERT INTO
  reply (comment_id, author_id, content)
VALUES
  (2, 2, '你行你上啊');