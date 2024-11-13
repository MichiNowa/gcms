-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2024 at 07:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `michi`
--

-- --------------------------------------------------------

--
-- Table structure for table `block_list`
--

CREATE TABLE `block_list` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `blocked_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `block_list`
--

INSERT INTO `block_list` (`id`, `user_id`, `blocked_user_id`) VALUES
(1, 4, 8),
(2, 4, 9);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `comment`, `created_at`) VALUES
(1, 1, 4, 'so cool', '2024-05-12 02:12:22'),
(2, 2, 4, 'i love one piece', '2024-05-12 05:20:57'),
(3, 4, 2, 'great picture', '2024-05-12 11:36:03'),
(4, 4, 3, 'great quality', '2024-05-12 11:36:51'),
(5, 4, 3, 'amazing', '2024-05-12 11:36:59'),
(7, 6, 3, 'hey', '2024-05-13 14:06:59'),
(11, 7, 4, 'sdsd', '2024-05-16 12:24:52'),
(12, 8, 3, 'you are missing a semi colon in line #', '2024-05-16 12:46:54'),
(13, 8, 2, 'you also mispelled a function at line #', '2024-05-16 12:47:41'),
(14, 8, 8, 'amazing code', '2024-05-16 17:37:04'),
(15, 10, 9, 'play with me', '2024-05-16 17:52:40'),
(16, 8, 9, 'amazing', '2024-05-16 17:53:59');

-- --------------------------------------------------------

--
-- Table structure for table `follow_list`
--

CREATE TABLE `follow_list` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follow_list`
--

INSERT INTO `follow_list` (`id`, `follower_id`, `user_id`) VALUES
(2, 3, 2),
(4, 4, 3),
(5, 2, 4),
(6, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_id`) VALUES
(1, 1, 4),
(2, 2, 2),
(3, 2, 4),
(5, 4, 2),
(6, 4, 3),
(8, 6, 3),
(9, 7, 4),
(10, 8, 3),
(11, 8, 2),
(12, 8, 8),
(13, 8, 9),
(14, 10, 4);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `msg` text NOT NULL,
  `read_status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `from_user_id`, `to_user_id`, `msg`, `read_status`, `created_at`) VALUES
(1, 4, 2, 'hey', 1, '2024-05-12 01:53:10'),
(2, 2, 4, 'hiiii', 1, '2024-05-12 04:06:17'),
(3, 4, 2, 'how are you doing?', 1, '2024-05-12 05:21:17'),
(4, 3, 4, 'i like your picture', 1, '2024-05-12 11:37:16'),
(5, 4, 3, 'sgdhasgdsa', 1, '2024-05-12 11:51:02'),
(6, 4, 2, 'sdsad', 0, '2024-05-12 11:51:10'),
(7, 3, 4, 'hey', 1, '2024-05-13 13:57:42'),
(8, 4, 3, 'how are you doing?', 1, '2024-05-13 13:58:03'),
(9, 4, 3, 'hey there', 0, '2024-05-16 09:25:39'),
(10, 8, 4, 'hey', 1, '2024-05-16 17:37:24'),
(11, 4, 8, 'hey how are you', 1, '2024-05-16 17:38:57'),
(12, 8, 4, 'i am fine thanks', 1, '2024-05-16 17:39:11'),
(13, 9, 4, 'hey lolli', 1, '2024-05-16 17:53:19'),
(14, 4, 9, 'hey snorlax', 1, '2024-05-16 17:55:10'),
(15, 9, 4, 'can you teach me how to code?', 1, '2024-05-16 17:55:30');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `from_user_id` int(11) NOT NULL,
  `read_status` int(11) NOT NULL DEFAULT 0,
  `post_id` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `to_user_id`, `message`, `created_at`, `from_user_id`, `read_status`, `post_id`) VALUES
(1, 2, 'started following you !', '2024-05-11 15:55:42', 3, 1, '0'),
(2, 2, 'Unfollowed you !', '2024-05-11 15:57:59', 3, 1, '0'),
(3, 2, 'started following you !', '2024-05-11 15:58:10', 3, 1, '0'),
(4, 2, 'started following you !', '2024-05-12 01:52:47', 4, 1, '0'),
(5, 3, 'started following you !', '2024-05-12 01:52:47', 4, 0, '0'),
(6, 2, 'liked your post !', '2024-05-12 05:11:17', 4, 1, '2'),
(7, 2, 'commented on your post', '2024-05-12 05:20:57', 4, 1, '2'),
(8, 4, 'started following you !', '2024-05-12 11:35:42', 2, 1, '0'),
(9, 4, 'liked your post !', '2024-05-12 11:35:51', 2, 1, '4'),
(10, 4, 'commented on your post', '2024-05-12 11:36:03', 2, 1, '4'),
(11, 4, 'started following you !', '2024-05-12 11:36:38', 3, 1, '0'),
(12, 4, 'liked your post !', '2024-05-12 11:36:43', 3, 1, '4'),
(13, 4, 'commented on your post', '2024-05-12 11:36:51', 3, 1, '4'),
(14, 4, 'commented on your post', '2024-05-12 11:36:59', 3, 1, '4'),
(15, 4, 'liked your post !', '2024-05-13 14:06:18', 3, 1, '6'),
(16, 4, 'commented on your post', '2024-05-13 14:06:59', 3, 1, '6'),
(17, 4, 'liked your post !', '2024-05-16 12:46:33', 3, 1, '8'),
(18, 4, 'commented on your post', '2024-05-16 12:46:54', 3, 1, '8'),
(19, 4, 'liked your post !', '2024-05-16 12:47:16', 2, 1, '8'),
(20, 4, 'commented on your post', '2024-05-16 12:47:41', 2, 1, '8'),
(21, 2, 'Unfollowed you !', '2024-05-16 16:47:23', 4, 0, '0'),
(22, 4, 'started following you !', '2024-05-16 17:36:31', 8, 1, '0'),
(23, 4, 'liked your post !', '2024-05-16 17:36:45', 8, 1, '8'),
(24, 4, 'commented on your post', '2024-05-16 17:37:04', 8, 1, '8'),
(25, 8, 'blocked you', '2024-05-16 17:39:38', 4, 0, '0'),
(26, 4, 'started following you !', '2024-05-16 17:52:57', 9, 1, '0'),
(27, 4, 'liked your post !', '2024-05-16 17:53:48', 9, 1, '8'),
(28, 4, 'commented on your post', '2024-05-16 17:53:59', 9, 1, '8'),
(29, 9, 'started following you !', '2024-05-16 17:54:54', 4, 1, '0'),
(30, 9, 'liked your post !', '2024-05-16 17:54:59', 4, 1, '10'),
(31, 9, 'blocked you', '2024-05-16 17:55:43', 4, 1, '0');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_img` text NOT NULL,
  `post_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `post_img`, `post_text`, `created_at`) VALUES
(1, 4, '1715479896Screenshot (1).png', 'sandrock', '2024-05-12 02:11:36'),
(2, 2, '1715486685peakpx (1).jpg', '', '2024-05-12 04:04:45'),
(5, 4, '1715514616peakpx.jpg', 'naruto', '2024-05-12 11:50:16'),
(7, 4, '1715859902Screenshot (9).png', 'I love this game <3 ', '2024-05-16 11:45:02'),
(8, 4, '1715863260Screenshot (459).png', 'Please help me fix the bug', '2024-05-16 12:41:00'),
(9, 8, '1715880978Screenshot (3).png', 'great game', '2024-05-16 17:36:18'),
(10, 9, '1715881945Screenshot (3).png', 'its a great game', '2024-05-16 17:52:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` enum('male', 'female') NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `profile_pic` text NOT NULL DEFAULT 'default_profile.jpg',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `gender`, `email`, `username`, `password`, `profile_pic`, `created_at`, `updated_at`) VALUES
(2, 'Michi', 'Nowa', 2, 'michinowa13@gmail.com', 'michinowa', 'f5f611f43b3d8ef59e85c693c4a02097', 'default_profile.jpg', '2024-05-11 13:25:16', '2024-05-11 13:25:16'),
(3, 'Michi', 'Bataluna', 0, 'michibataluna13@gmail.com', 'ichimino', '856a75b1b3b99c42d0027d0433693b48', '1715443069Screenshot (4).png', '2024-05-11 15:49:38', '2024-05-11 15:57:49'),
(4, 'lolli', 'pop', 0, 'lolipop@sample.com', 'lolipop', '568fe0733df32240a4e83a1545f9e747', '1715515199Screenshot (111).png', '2024-05-11 16:06:57', '2024-05-16 14:23:17'),
(5, 'rich', 'hue', 1, 'richhue@sample.com', 'richue', '3715318f167fa93a326941c00157470c', 'default_profile.jpg', '2024-05-16 14:16:38', '2024-05-16 14:16:38'),
(6, 'keke', 'keke', 0, 'keke@sample.com', 'keke', '021371b392f0b42398630fd668adff5d', 'default_profile.jpg', '2024-05-16 14:18:05', '2024-05-16 14:18:05'),
(7, 'k', 'k', 0, 'kkk@sample.com', 'kkkkk', 'f25b8258b6f0865c460ce3107d6f0116', 'default_profile.jpg', '2024-05-16 14:29:05', '2024-05-16 14:29:05'),
(8, 'demo', 'demo', 0, 'demo@sample.com', 'demo', 'c514c91e4ed341f263e458d44b3bb0a7', '1715881073Screenshot (22).png', '2024-05-16 17:35:38', '2024-05-16 17:37:53'),
(9, 'snorlax', 'pokemon', 1, 'snor@sample.com', 'snorlax', '00996911aa2ad4513a180273c79569d8', '1715882065Screenshot (16).png', '2024-05-16 17:51:40', '2024-05-16 17:54:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `block_list`
--
ALTER TABLE `block_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follow_list`
--
ALTER TABLE `follow_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `block_list`
--
ALTER TABLE `block_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `follow_list`
--
ALTER TABLE `follow_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
