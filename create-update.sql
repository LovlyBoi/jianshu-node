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
  -- 博客存储的位置
  `location` VARCHAR(50) NOT NULL,
  -- 作者id
  `author_id` INT NOT NULL,
  `createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO  blogs ( type, location, author_id ) VALUES(
  '笔记',
  'markdown/test.md',
  1 
);
INSERT INTO  blogs ( type, location, author_id ) VALUES(
  '随笔',
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

INSERT INTO  comments ( blog_id, author_id, content ) VALUES(
  1,
  2,
  '文章写得很好！'
);
INSERT INTO  comments ( blog_id, author_id, content ) VALUES(
  1,
  1,
  '写的什么破玩意！'
);

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

INSERT INTO reply ( comment_id, author_id, content ) VALUES(
  2,
  2,
  '写的明明很好！'
);
INSERT INTO reply ( comment_id, author_id, content ) VALUES(
  2,
  2,
  '你行你上啊'
);
