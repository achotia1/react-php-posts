-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2023 at 07:02 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo-posts`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL COMMENT 'md5 encrypt',
  `email` varchar(50) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `status` smallint(6) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `token`, `status`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin@admin.com', 'testtoken', 1),
(2, 'amit', '0cb1eb413b8f7cee17701a37a1d74dc3', 'amit@amit.com', 'amit', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_has_posts`
--

CREATE TABLE `user_has_posts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT 1 COMMENT '1=>Active,2=>Delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_has_posts`
--

INSERT INTO `user_has_posts` (`id`, `userId`, `name`, `description`, `status`) VALUES
(1, 1, 'item oneaa', 'item one descriptionaa', 2),
(2, 1, 'Item two', 'Item two description', 1),
(3, 1, 'Item three', 'Item three description', 1),
(4, 1, 'Item four', 'Item four description', 1),
(5, 1, 'Item five', 'Item five description', 1),
(6, 1, 'item six1', 'item six description1', 1),
(7, 1, 'item seven', 'item seven description test', 1),
(8, 1, 'item eight', 'item eight description test', 1),
(9, 1, 'item nine', 'item nine descr', 1),
(10, 1, 'item ten', 'item ten desc', 1),
(11, 1, 'aa', 'aa', 1),
(12, 1, 'Amit', 'test', 1),
(13, 1, 'itemmdssmdk', ',LD,VLD,V', 1),
(14, 1, 'JKJB', 'GHFGHF', 1),
(15, 1, 'DSSDEEEEEE', 'SDSDSDSD', 1),
(16, 2, 'Amit', 'Amit new', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_has_posts`
--
ALTER TABLE `user_has_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_has_posts`
--
ALTER TABLE `user_has_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
