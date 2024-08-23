-- Adminer 4.8.1 MySQL 9.0.1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `fakeAPI`;
CREATE DATABASE `fakeAPI` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fakeAPI`;

DROP TABLE IF EXISTS `chat_list`;
CREATE TABLE `chat_list` (
  `id` bigint NOT NULL,
  `last_message` varchar(255) DEFAULT NULL,
  `number_of_message` int NOT NULL,
  `target_id` bigint DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `chat_list` (`id`, `last_message`, `number_of_message`, `target_id`, `time`, `user_id`) VALUES
(1,	'hello salim ...',	1,	4,	'12:08 PM',	3),
(2,	' ...',	1,	1,	'13:08 PM',	3),
(3,	'hey world ...',	2,	2,	'10:08 PM',	3),
(4,	'hey mehdi ...',	2,	4,	'10:08 PM',	3);

DROP TABLE IF EXISTS `chat_list_seq`;
CREATE TABLE `chat_list_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `chat_list_seq` (`next_val`) VALUES
(101);

DROP TABLE IF EXISTS `conversations`;
CREATE TABLE `conversations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `receiver_id` bigint DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `conversations` (`id`, `message`, `receiver_id`, `sender_id`, `time`) VALUES
(1,	'Hey Anna, how\'s it going?',	2,	1,	'24-07-2024 11:13:02:132'),
(2,	'Hey John! I\'m good, thanks. How about you?',	1,	2,	'24-07-2024 11:13:02:132'),
(3,	'I\'m doing well! Just finished a project at work.',	2,	1,	'24-07-2024 11:13:02:132'),
(4,	'That\'s awesome! What was the project about?',	1,	2,	'24-07-2024 11:13:02:132'),
(5,	'It was a website redesign for a local business. Took a lot of effort, but it turned out great.',	2,	1,	'24-07-2024 11:13:02:132'),
(6,	'Wow, that sounds like a lot of work. Congrats on finishing it!',	1,	2,	'24-07-2024 11:13:02:132'),
(7,	'Thanks! How\'s your latest project going?',	2,	1,	'24-07-2024 11:13:02:132'),
(8,	'It\'s going well, but there\'s still a lot to do. I\'m hoping to wrap it up by the end of the month.It\'s going well,',	2,	1,	'24-07-2024 11:13:02:132'),
(9,	'Good luck with that! If you need any help, let me know.',	2,	1,	'24-07-2024 11:13:02:132'),
(10,	'Thanks, John! I\'ll definitely reach out if I do.',	1,	2,	'24-07-2024 11:13:02:132');

DROP TABLE IF EXISTS `stats`;
CREATE TABLE `stats` (
  `id` bigint NOT NULL,
  `league` varchar(255) DEFAULT NULL,
  `loss` bigint NOT NULL,
  `next_league` varchar(255) DEFAULT NULL,
  `progress_bar` int NOT NULL,
  `user_rank` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `win` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK8sddg875832ckda3cmynpouxx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `stats` (`id`, `league`, `loss`, `next_league`, `progress_bar`, `user_rank`, `user_id`, `win`) VALUES
(1,	'gold',	11,	'platinum',	89,	200,	1,	89),
(2,	'silver',	25,	'gold',	75,	150,	2,	75),
(3,	'legendary',	0,	'legendary',	100,	1,	3,	100),
(4,	'bronze',	40,	'silver',	60,	500,	4,	60),
(5,	'gold',	15,	'platinum',	85,	180,	5,	85),
(6,	'silver',	30,	'gold',	70,	300,	6,	70),
(7,	'legendary',	5,	'legendary',	95,	50,	7,	95),
(8,	'bronze',	45,	'silver',	55,	600,	8,	55),
(9,	'gold',	18,	'platinum',	82,	220,	9,	82),
(10,	'silver',	32,	'gold',	68,	350,	10,	68),
(11,	'platinum',	8,	'legendary',	92,	120,	11,	92),
(12,	'gold',	22,	'platinum',	78,	275,	12,	78),
(13,	'bronze',	37,	'silver',	63,	480,	13,	63),
(14,	'platinum',	12,	'legendary',	88,	140,	14,	88),
(15,	'gold',	26,	'platinum',	74,	290,	15,	74),
(16,	'bronze',	47,	'silver',	53,	620,	16,	53),
(17,	'platinum',	9,	'legendary',	91,	110,	17,	91),
(18,	'silver',	35,	'gold',	65,	440,	18,	65),
(19,	'gold',	23,	'platinum',	77,	260,	19,	77),
(20,	'legendary',	4,	'legendary',	96,	30,	20,	96),
(21,	'bronze',	39,	'silver',	61,	500,	21,	61),
(22,	'gold',	17,	'platinum',	83,	205,	22,	83),
(23,	'silver',	34,	'gold',	66,	410,	23,	66),
(24,	'legendary',	2,	'legendary',	98,	10,	24,	98),
(25,	'bronze',	43,	'silver',	57,	580,	25,	57),
(26,	'gold',	20,	'platinum',	80,	240,	26,	80),
(27,	'silver',	28,	'gold',	72,	320,	27,	72),
(28,	'platinum',	13,	'legendary',	87,	160,	28,	87),
(29,	'silver',	36,	'gold',	64,	450,	29,	64),
(30,	'platinum',	7,	'legendary',	93,	90,	30,	93),
(31,	'silver',	33,	'gold',	67,	370,	31,	67),
(32,	'gold',	19,	'platinum',	81,	230,	32,	81),
(33,	'legendary',	1,	'legendary',	99,	5,	33,	99);

DROP TABLE IF EXISTS `stats_seq`;
CREATE TABLE `stats_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `stats_seq` (`next_val`) VALUES
(101);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `active` bit(1) NOT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `friend` bit(1) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `join_date` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `active`, `birthday`, `cover`, `email`, `friend`, `full_name`, `gender`, `join_date`, `phone`, `profile_image`, `user_name`) VALUES
(1,	CONV('1', 2, 10) + 0,	'15 MAR 1990',	'/frontend/images/xxxxxx.png',	'alice.johnson@example.com',	CONV('0', 2, 10) + 0,	'Alice Johnson',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/1.jpg',	'khalid'),
(2,	CONV('0', 2, 10) + 0,	'22 AUG 1985',	'/frontend/images/xxxxxx.png',	'bob.smith@example.com',	CONV('1', 2, 10) + 0,	'Bob Smith',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/1.jpg',	'bobsmith'),
(3,	CONV('1', 2, 10) + 0,	'10 DEC 1992',	'/frontend/images/xxxxxx.png',	'charlie.brown@example.com',	CONV('1', 2, 10) + 0,	'Charlie Brown',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/2.jpg',	'charlieb'),
(4,	CONV('0', 2, 10) + 0,	'1 JAN 1988',	'/frontend/images/xxxxxx.png',	'diana.prince@example.com',	CONV('0', 2, 10) + 0,	'Diana Prince',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/2.jpg',	'diana'),
(5,	CONV('1', 2, 10) + 0,	'18 JUN 1995',	'/frontend/images/xxxxxx.png',	'evan.davis@example.com',	CONV('1', 2, 10) + 0,	'Evan Davis',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/3.jpg',	'evand'),
(6,	CONV('0', 2, 10) + 0,	'27 JUL 1993',	'/frontend/images/xxxxxx.png',	'fiona.green@example.com',	CONV('1', 2, 10) + 0,	'Fiona Green',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/3.jpg',	'fionag'),
(7,	CONV('1', 2, 10) + 0,	'11 NOV 1991',	'/frontend/images/xxxxxx.png',	'george.wilson@example.com',	CONV('0', 2, 10) + 0,	'George Wilson',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/4.jpg',	'georgew'),
(8,	CONV('0', 2, 10) + 0,	'23 APR 1989',	'/frontend/images/xxxxxx.png',	'hannah.white@example.com',	CONV('1', 2, 10) + 0,	'Hannah White',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/4.jpg',	'hannahw'),
(9,	CONV('1', 2, 10) + 0,	'7 FEB 1994',	'/frontend/images/xxxxxx.png',	'ian.thomas@example.com',	CONV('1', 2, 10) + 0,	'Ian Thomas',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/5.jpg',	'iant'),
(10,	CONV('0', 2, 10) + 0,	'3 MAY 1996',	'/frontend/images/xxxxxx.png',	'julia.roberts@example.com',	CONV('0', 2, 10) + 0,	'Julia Roberts',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/5.jpg',	'juliar'),
(11,	CONV('1', 2, 10) + 0,	'13 SEP 1986',	'/frontend/images/xxxxxx.png',	'kevin.lee@example.com',	CONV('1', 2, 10) + 0,	'Kevin Lee',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/6.jpg',	'kevinl'),
(12,	CONV('0', 2, 10) + 0,	'30 OCT 1990',	'/frontend/images/xxxxxx.png',	'laura.king@example.com',	CONV('1', 2, 10) + 0,	'Laura King',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/6.jpg',	'laurak'),
(13,	CONV('1', 2, 10) + 0,	'5 JUN 1988',	'/frontend/images/xxxxxx.png',	'michael.brown@example.com',	CONV('0', 2, 10) + 0,	'Michael Brown',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/7.jpg',	'michaelb'),
(14,	CONV('0', 2, 10) + 0,	'12 DEC 1991',	'/frontend/images/xxxxxx.png',	'nina.harris@example.com',	CONV('1', 2, 10) + 0,	'Nina Harris',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/7.jpg',	'ninah'),
(15,	CONV('1', 2, 10) + 0,	'18 JAN 1987',	'/frontend/images/xxxxxx.png',	'oscar.miller@example.com',	CONV('1', 2, 10) + 0,	'Oscar Miller',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/8.jpg',	'oscarm'),
(16,	CONV('0', 2, 10) + 0,	'6 APR 1995',	'/frontend/images/xxxxxx.png',	'paula.brown@example.com',	CONV('0', 2, 10) + 0,	'Paula Brown',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/8.jpg',	'paulab'),
(17,	CONV('1', 2, 10) + 0,	'14 AUG 1990',	'/frontend/images/xxxxxx.png',	'quincy.moore@example.com',	CONV('1', 2, 10) + 0,	'Quincy Moore',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/9.jpg',	'quincym'),
(18,	CONV('0', 2, 10) + 0,	'2 OCT 1985',	'/frontend/images/xxxxxx.png',	'rachel.adams@example.com',	CONV('1', 2, 10) + 0,	'Rachel Adams',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/9.jpg',	'rachela'),
(19,	CONV('1', 2, 10) + 0,	'19 NOV 1992',	'/frontend/images/xxxxxx.png',	'samuel.anderson@example.com',	CONV('0', 2, 10) + 0,	'Samuel Anderson',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/10.jpg',	'samuela'),
(20,	CONV('0', 2, 10) + 0,	'8 MAY 1991',	'/frontend/images/xxxxxx.png',	'tina.harris@example.com',	CONV('1', 2, 10) + 0,	'Tina Harris',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/10.jpg',	'tinah'),
(21,	CONV('1', 2, 10) + 0,	'20 JUL 1987',	'/frontend/images/xxxxxx.png',	'ulysses.scott@example.com',	CONV('1', 2, 10) + 0,	'Ulysses Scott',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/11.jpg',	'ulyssess'),
(22,	CONV('0', 2, 10) + 0,	'4 MAR 1994',	'/frontend/images/xxxxxx.png',	'victoria.evans@example.com',	CONV('0', 2, 10) + 0,	'Victoria Evans',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/11.jpg',	'victoriae'),
(23,	CONV('1', 2, 10) + 0,	'29 SEP 1989',	'/frontend/images/xxxxxx.png',	'william.brown@example.com',	CONV('1', 2, 10) + 0,	'William Brown',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/12.jpg',	'williamb'),
(24,	CONV('0', 2, 10) + 0,	'17 APR 1993',	'/frontend/images/xxxxxx.png',	'xena.collins@example.com',	CONV('1', 2, 10) + 0,	'Xena Collins',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/12.jpg',	'xenac'),
(25,	CONV('1', 2, 10) + 0,	'13 FEB 1990',	'/frontend/images/xxxxxx.png',	'yannis.clark@example.com',	CONV('0', 2, 10) + 0,	'Yannis Clark',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/13.jpg',	'yannisc'),
(26,	CONV('0', 2, 10) + 0,	'22 JUN 1986',	'/frontend/images/xxxxxx.png',	'zoe.roberts@example.com',	CONV('1', 2, 10) + 0,	'Zoe Roberts',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/13.jpg',	'zoer'),
(27,	CONV('1', 2, 10) + 0,	'9 NOV 1988',	'/frontend/images/xxxxxx.png',	'aaron.lewis@example.com',	CONV('1', 2, 10) + 0,	'Aaron Lewis',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/14.jpg',	'aaronl'),
(28,	CONV('0', 2, 10) + 0,	'5 DEC 1992',	'/frontend/images/xxxxxx.png',	'bella.white@example.com',	CONV('0', 2, 10) + 0,	'Bella White',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/14.jpg',	'bellaw'),
(29,	CONV('1', 2, 10) + 0,	'14 JUL 1987',	'/frontend/images/xxxxxx.png',	'chris.martin@example.com',	CONV('1', 2, 10) + 0,	'Chris Martin',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/15.jpg',	'chrism'),
(30,	CONV('0', 2, 10) + 0,	'27 MAY 1994',	'/frontend/images/xxxxxx.png',	'dana.lee@example.com',	CONV('1', 2, 10) + 0,	'Dana Lee',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/15.jpg',	'danal'),
(31,	CONV('1', 2, 10) + 0,	'3 SEP 1989',	'/frontend/images/xxxxxx.png',	'ethan.young@example.com',	CONV('0', 2, 10) + 0,	'Ethan Young',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/16.jpg',	'ethany'),
(32,	CONV('0', 2, 10) + 0,	'15 MAR 1991',	'/frontend/images/xxxxxx.png',	'faith.scott@example.com',	CONV('1', 2, 10) + 0,	'Faith Scott',	'female',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/women/16.jpg',	'faiths'),
(33,	CONV('1', 2, 10) + 0,	'8 JAN 1990',	'/frontend/images/xxxxxx.png',	'gavin.cooper@example.com',	CONV('1', 2, 10) + 0,	'Gavin Cooper',	'male',	'24-07-2024 11:12:02:122',	NULL,	'https://randomuser.me/api/portraits/men/17.jpg',	'gavinc');

DROP TABLE IF EXISTS `users_seq`;
CREATE TABLE `users_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users_seq` (`next_val`) VALUES
(101);

-- 2024-07-25 10:10:48
