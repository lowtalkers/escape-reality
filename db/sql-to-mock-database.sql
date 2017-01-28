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
-- Create user amad@amad.com
-- 
-- ---
INSERT INTO `users` (`id`, `email`, `password`, `profilePic`, `firstName`, `lastName`, `lobbyPic`, `createdAt`, `updatedAt`)
VALUES
	(10, 'carlos@carlos.com', '$2a$10$rQ4JP/aLLeWYPBu4TD6zR.7MZU040sM8QbdzjSssqpt2QSMJ2SgtK', 'http://i.imgur.com/mlAx8Xb.jpg', 'Amad', 'Khan ', 'https://s3.amazonaws.com/vrpics/lr2.jpg',  '2016-12-01 19:56:19', '2016-12-01 19:56:19');


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
	(4,'carlos@carlos.com','Two Door Cinema Club playing here this weekend!','5.7981178918963625 1.3936172203403887 -4.489940011603292','Carlos','2016-12-01 22:02:57','2016-12-01 22:02:57',19),(32,'carlos@carlos.com','big brother is watching you!','-5.292959401956591 3.668474619006562 3.7733343793720526','Carlos','2016-12-02 21:44:00','2016-12-02 21:44:00',21),(33,'franco@franco.com','look at these guys mean Muggin','5.146560731275428 -1.366580980337109 5.226224649463703','Franco','2016-12-02 21:45:10','2016-12-02 21:45:10',21),(35,'amad@amad.com','no bro thats a sick jersey!','6.0143855937955575 -4.0328875144973635 1.6403603810569212','Amad','2016-12-02 21:47:28','2016-12-02 21:47:28',21),(37,'amad@amad.com','Teach us, master','-0.04908676461895657 1.3107333895704976 7.378716613471221','Amad','2016-12-02 21:49:48','2016-12-02 21:49:48',22),(45,'amad@amad.com','check out that painting','-2.869228519408723 5.077961493684454 -4.534812118630419','Amad','2016-12-02 21:51:59','2016-12-02 21:51:59',22),(46,'carlos@carlos.com','I love this jersey','-7.16577028693148 -1.4972795012760647 -1.4128587497059355','Carlos','2016-12-02 21:52:53','2016-12-02 21:52:53',22),(47,'franco@franco.com','this jersey sucks','-6.0787490146823755 0.18988689831456884 -4.146844470203234','Franco','2016-12-02 21:53:43','2016-12-02 21:53:43',22),(51,'tony@tony.com','what kind of beer is that','-4.928174147827135 -1.190592719378702 5.4775413177185195','Tony','2016-12-02 21:58:37','2016-12-02 21:58:37',22),(53,'tony@tony.com','Ben, Woah!','7.384596011308232 -0.1491940420354187 0.01671432387230311','Tony','2016-12-02 21:59:25','2016-12-02 21:59:25',22),(54,'carlos@carlos.com','Woah, Ben!','5.840987887399085 1.4778669758195857 -4.375457004011097','Carlos','2016-12-02 22:00:25','2016-12-02 22:00:25',22),(55,'franco@franco.com','finally you have a head','6.113025117475751 -0.3845181775706442 -4.097893126440918','Franco','2016-12-02 22:13:30','2016-12-02 22:13:30',25),(56,'franco@franco.com','finally your head is showing','6.383961164879618 0.814052780752839 -3.7109563829604872','Franco','2016-12-02 22:25:02','2016-12-02 22:25:02',25),(57,'franco@franco.com','you look very happy!','2.223111250068787 -0.4735105391261233 -7.021831424747999','Franco','2016-12-02 23:52:10','2016-12-02 23:52:10',26),(58,'franco@franco.com','this is awesome','5.883494833305862 0.08687373225577837 -4.425696316669226','Franco','2016-12-13 04:17:23','2016-12-13 04:17:23',18),(59,'carlos@carlos.com','nice hat there Carlos','7.100204552795153 -1.4093257097548066 -1.7807699179632404','Carlos','2016-12-14 04:41:35','2016-12-14 04:41:35',26),(60,'carlos@carlos.com','hello','-5.850744691298034 0.3818122660549857 -4.472468362760757','Carlos','2016-12-14 05:21:05','2016-12-14 05:21:05',26),(63,'carlos@carlos.com','that\'s a pretty large whiteboard','5.097025132815344 0.9606563231680211 -5.308690332730309','Carlos','2016-12-19 06:57:57','2016-12-19 06:57:57',26),(68,'carlos@carlos.com','McHale stats','7.205139211155345 -0.15717213363219132 1.5389969533723469','Carlos','2017-01-02 23:21:37','2017-01-02 23:21:37',26),(76,'franco@franco.com','the sky is blue','2.418917737910747 4.41852480908574 -5.394824334912599','Franco','2017-01-14 00:16:17','2017-01-14 00:16:17',18),(77,'franco@franco.com','the grass is green','3.9865609357880594 -1.5850727216027334 -6.065842871858394','Franco','2017-01-14 00:18:15','2017-01-14 00:18:15',18),(82,'franco@franco.com','my friend lives there','-6.687555550692162 0.6269708648659136 -3.0688883498135016','Franco','2017-01-14 00:20:09','2017-01-14 00:20:09',18),(86,'franco@franco.com','is that the library','1.4890637725827758 1.2273142299051494 -7.218518760278954','Franco','2017-01-14 00:23:05','2017-01-14 00:23:05',19),(91,'franco@franco.com','nice shirt','-4.036645383977397 1.5340560692067848 -6.053355107975826','Franco','2017-01-26 01:22:02','2017-01-26 01:22:02',22);