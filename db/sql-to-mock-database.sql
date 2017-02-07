-- ---
-- See instructions in the file 'db/models/how-to-mock-database.txt'
--
-- ---


-- ---
-- Create user tony@tony.com
-- 
-- Must use imgr.com profile picture links instead of AWS bucket links because there were
-- inconsistent CORS errors in loading profile pics during the display of comments in our app.
-- ---
INSERT INTO `users` (`id`, `email`, `password`, `profilePic`, `firstName`, `lastName`, `lobbyPic`, `createdAt`, `updatedAt`)
VALUES
	(7, 'tony@tony.com', '$2a$10$5TqeWOK2GsKUyajuXZPoGu73Z8D2wAhAhD0dxVR4YeGDjFhSg457G', 'http://i.imgur.com/b47RMuI.jpg', 'Tony', 'Le', 'https://s3.amazonaws.com/vrpics/lr2.jpg', '2016-11-30 00:35:49', '2016-11-30 00:35:49');

-- ---
-- Create photos for tony@tony.com
-- 
-- ---
-- INSERT INTO `photos` (`id`, `title`, `imageLink`, `description`, `createdAt`, `updatedAt`, `poster_id`)
-- VALUES
-- 	(12, 'dolores-park_3584x17921480465350583.jpg', 'https://s3.amazonaws.com/vrpics/dolores-park_3584x17921480465350583.jpg', '', '2016-11-30 00:22:30', '2016-11-30 00:22:30', 7),
-- 	(13, 'twin-peakers-upper_3584x17921480465401065.jpg', 'https://s3.amazonaws.com/vrpics/twin-peakers-upper_3584x17921480465401065.jpg', '', '2016-11-30 00:23:21', '2016-11-30 00:23:21', 7);


-- ---
-- Create user franco@franco.com
-- 
-- ---
INSERT INTO `users` (`id`, `email`, `password`, `profilePic`, `firstName`, `lastName`, `lobbyPic`, `createdAt`, `updatedAt`)
VALUES
	(8, 'franco@franco.com', '$2a$10$PSgRZS5tj4eGN2TUO9bzmO05Oc/dOiDNX5Nq1oe/MeWn6hWvbAVVC', 'http://i.imgur.com/ApUbhYu.jpg', 'Franco', 'Abaroa', 'https://s3.amazonaws.com/vrpics/lr2.jpg',  '2016-11-30 01:17:00', '2016-11-30 01:17:00');

-- ---
-- Create photos for franco@franco.com
-- 
-- ---
INSERT INTO `photos` (`id`, `title`, `imageLink`, `description`, `createdAt`, `updatedAt`, `poster_id`)
VALUES
	(17, 'IMG_7877-niceSFstreet_4096x20481480469899430.jpg', 'https://s3.amazonaws.com/vrpics/IMG_7877-niceSFstreet_4096x20481480469899430.jpg', '', '2016-11-30 01:38:19', '2016-11-30 01:38:19', 8),
	(18, 'IMG_7878-hayesValPark_4096x20481480470054798.jpg', 'https://s3.amazonaws.com/vrpics/IMG_7878-hayesValPark_4096x20481480470054798.jpg', '', '2016-11-30 01:40:54', '2016-11-30 01:40:54', 8),
	(19, 'IMG_7894-sfCityCenter_4096x20481480470133413.jpg', 'https://s3.amazonaws.com/vrpics/IMG_7894-sfCityCenter_4096x20481480470133413.jpg', '', '2016-11-30 01:42:13', '2016-11-30 01:42:13', 8),
	(20, 'IMG_7900-sfTrainStation_4096x20481480470178646.jpg', 'https://s3.amazonaws.com/vrpics/IMG_7900-sfTrainStation_4096x20481480470178646.jpg', '', '2016-11-30 01:42:58', '2016-11-30 01:42:58', 8);


-- ---
-- Create user carlos@carlos.com
-- 
-- ---
INSERT INTO `users` (`id`, `email`, `password`, `profilePic`, `firstName`, `lastName`, `lobbyPic`, `createdAt`, `updatedAt`)
VALUES
	(9, 'carlos@carlos.com', '$2a$10$Y6qUvZ9zFwAWnAVzn4vpXeGSnyv.ZD2FKvKRbZYSKzrB7aETn15pe', 'http://i.imgur.com/mlAx8Xb.jpg', 'Carlos', 'Portillo ', 'https://s3.amazonaws.com/vrpics/lr2.jpg',  '2016-12-01 19:56:18', '2016-12-01 19:56:18');


-- ---
-- Create photos for carlos@carlos.com
-- 
-- ---
INSERT INTO `photos` (`id`, `title`, `imageLink`, `description`, `createdAt`, `updatedAt`, `poster_id`)
VALUES
	(22, 'Mikkelers1_4096x20481480624773205.jpg', 'https://s3.amazonaws.com/vrpics/Mikkelers1_4096x20481480624773205.jpg', NULL, '2016-12-15 20:39:35', '2016-12-01 20:39:35', 9),
	(30, 'tropical-island_4096x20481486347045397.jpg', 'http://i.imgur.com/Gb4f5Dn.jpg', NULL, '2016-12-01 20:49:33', '2016-12-01 20:49:33', 9),
	(35, 'church-interior_4096x20481486347086284.jpg', 'http://i.imgur.com/PKTJji3.jpg', NULL, '2016-12-01 20:59:34', '2016-12-01 20:59:34', 9),
	(38, 'ny-times-square_2377x7991486507444953.jpg', 'http://i.imgur.com/PmQy13p.jpg', NULL, '2016-12-01 20:59:35', '2016-11-15 20:59:35', 9);


-- ---
-- Create user amad@amad.com
-- 
-- ---
INSERT INTO `users` (`id`, `email`, `password`, `profilePic`, `firstName`, `lastName`, `lobbyPic`, `createdAt`, `updatedAt`)
VALUES
	(10, 'amad@amad.com', '$2a$10$rQ4JP/aLLeWYPBu4TD6zR.7MZU040sM8QbdzjSssqpt2QSMJ2SgtK', 'http://i.imgur.com/HGWwU6r.jpg', 'Amad', 'Khan ', 'https://s3.amazonaws.com/vrpics/lr2.jpg',  '2016-12-01 19:56:19', '2016-12-01 19:56:19');


-- ---
-- Create guest user
-- 
-- ---
INSERT INTO `users` (`id`, `email`, `password`, `profilePic`, `firstName`, `lastName`, `lobbyPic`, `createdAt`, `updatedAt`)
VALUES
  (5, 'guest@guest.com', '$2a$10$wBh6z7UpGPGcX9wn7Pv/6.nkcHsZ1Aq5ZeTWLrpDf205KmKBfToxC', 'http://i.imgur.com/aazLzwo.jpg', 'Guest', '', 'https://s3.amazonaws.com/vrpics/lr2.jpg', '2016-11-30 00:35:49', '2016-11-30 00:35:49');
  

-- ---
-- Create comments
-- 
-- ---
INSERT INTO `comments` (`id`, `email`, `body`, `coordinates`, `firstName`, `createdAt`, `updatedAt`, `photo_id`)
VALUES 
(4,'carlos@carlos.com','Two Door Cinema Club playing here this weekend!','5.7981178918963625 1.3936172203403887 -4.489940011603292','Carlos','2016-12-01 22:02:57','2016-12-01 22:02:57',19),
(46,'carlos@carlos.com','I love this jersey','-7.16577028693148 -1.4972795012760647 -1.4128587497059355','Carlos','2016-12-02 21:52:53','2016-12-02 21:52:53',22),
(47,'franco@franco.com','this jersey sucks','-6.0787490146823755 0.18988689831456884 -4.146844470203234','Franco','2016-12-02 21:53:43','2016-12-02 21:53:43',22),
(51,'tony@tony.com','what kind of beer is that','-4.928174147827135 -1.190592719378702 5.4775413177185195','Tony','2016-12-02 21:58:37','2016-12-02 21:58:37',22),
(53,'tony@tony.com','Ben, Woah!','7.384596011308232 -0.1491940420354187 0.01671432387230311','Tony','2016-12-02 21:59:25','2016-12-02 21:59:25',22),
(54,'carlos@carlos.com','Woah, Ben!','5.840987887399085 1.4778669758195857 -4.375457004011097','Carlos','2016-12-02 22:00:25','2016-12-02 22:00:25',22),
(58,'franco@franco.com','this is awesome','5.883494833305862 0.08687373225577837 -4.425696316669226','Franco','2016-12-13 04:17:23','2016-12-13 04:17:23',18),
(82,'franco@franco.com','my friend lives there','-6.687555550692162 0.6269708648659136 -3.0688883498135016','Franco','2017-01-14 00:20:09','2017-01-14 00:20:09',18),
(86,'franco@franco.com','is that the library','1.4890637725827758 1.2273142299051494 -7.218518760278954','Franco','2017-01-14 00:23:05','2017-01-14 00:23:05',19);