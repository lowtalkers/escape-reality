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
INSERT INTO `photos` (`id`, `title`, `imageLink`, `description`, `createdAt`, `updatedAt`, `poster_id`)
VALUES
	(9, 'thanksgiving-before_3584x17921480465178818.jpg', 'https://s3.amazonaws.com/vrpics/thanksgiving-before_3584x17921480465178818.jpg', '', '2016-11-30 00:19:38', '2016-11-30 00:19:38', 7);
INSERT INTO `photos` (`id`, `title`, `imageLink`, `description`, `createdAt`, `updatedAt`, `poster_id`)
VALUES
	(10, 'thanksgiving-after_3584x17921480465211709.jpg', 'https://s3.amazonaws.com/vrpics/thanksgiving-after_3584x17921480465211709.jpg', '', '2016-11-30 00:20:11', '2016-11-30 00:20:11', 7),
	(11, 'noe-valley-sanchez-street_3584x17921480465274422.jpg', 'https://s3.amazonaws.com/vrpics/noe-valley-sanchez-street_3584x17921480465274422.jpg', '', '2016-11-30 00:21:14', '2016-11-30 00:21:14', 7),
	(12, 'dolores-park_3584x17921480465350583.jpg', 'https://s3.amazonaws.com/vrpics/dolores-park_3584x17921480465350583.jpg', '', '2016-11-30 00:22:30', '2016-11-30 00:22:30', 7),
	(13, 'twin-peakers-upper_3584x17921480465401065.jpg', 'https://s3.amazonaws.com/vrpics/twin-peakers-upper_3584x17921480465401065.jpg', '', '2016-11-30 00:23:21', '2016-11-30 00:23:21', 7),
	(14, 'daybreaker-2nd-floor_4096x20481480465439315.jpg', 'https://s3.amazonaws.com/vrpics/daybreaker-2nd-floor_4096x20481480465439315.jpg', '', '2016-11-30 00:23:59', '2016-11-30 00:23:59', 7),
	(15, 'daybreaker-4096x20481480465471303.jpg', 'https://s3.amazonaws.com/vrpics/daybreaker-4096x20481480465471303.jpg', '', '2016-11-30 00:24:31', '2016-11-30 00:24:31', 7);


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
	(21, 'GoldenGateRoom_alt_4096x20481480624756099.jpg', 'https://s3.amazonaws.com/vrpics/GoldenGateRoom_alt_4096x20481480624756099.jpg', NULL, '2016-12-01 20:39:16', '2016-12-01 20:39:16', 9),
	(22, 'Mikkelers1_4096x20481480624773205.jpg', 'https://s3.amazonaws.com/vrpics/Mikkelers1_4096x20481480624773205.jpg', NULL, '2016-12-01 20:39:33', '2016-12-01 20:39:33', 9),
	(23, 'Mikkelers2_4096x20481480624786606.jpg', 'https://s3.amazonaws.com/vrpics/Mikkelers2_4096x20481480624786606.jpg', NULL, '2016-12-01 20:39:46', '2016-12-01 20:39:46', 9),
	(24, 'UnionSquareNight_4096x20481480624799552.jpg', 'https://s3.amazonaws.com/vrpics/UnionSquareNight_4096x20481480624799552.jpg', NULL, '2016-12-01 20:39:59', '2016-12-01 20:39:59', 9);


-- ---
-- Create comments
-- 
-- ---

INSERT INTO `comments` (`id`, `email`, `body`, `coordinates`, `firstName`, `createdAt`, `updatedAt`, `photo_id`)
VALUES
	(31, 'tony@tony.com', 'I remember my first beer, too', '-6.183361807916729 1.8617050379729136 3.6438539511087593', 'Tony', '2016-12-01 22:08:35', '2016-12-01 22:08:35', 22),
	(4, 'carlos@carlos.com', 'Two Door Cinema Club playing here this weekend', '5.7981178918963625 1.3936172203403887 -4.489940011603292', 'Carlos', '2016-12-01 22:02:57', '2016-12-01 22:02:57', 19);