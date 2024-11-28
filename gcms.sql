-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 02:56 PM
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
-- Database: `gcms`
--

-- --------------------------------------------------------

--
-- Table structure for table `agreementform`
--

CREATE TABLE `agreementform` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `guidance_id` bigint(20) NOT NULL,
  `schoolyear_id` bigint(20) NOT NULL,
  `case_note_id` bigint(20) DEFAULT NULL,
  `called_slip_id` bigint(20) DEFAULT NULL,
  `agreement_pic` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assessment`
--

CREATE TABLE `assessment` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `assessment_form_id` bigint(20) NOT NULL,
  `assessment_response` text NOT NULL DEFAULT '[]',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessment`
--

INSERT INTO `assessment` (`id`, `user_id`, `assessment_form_id`, `assessment_response`, `created_at`, `updated_at`) VALUES
(1, 15, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":true},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":false},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":false}]', '2024-11-22 10:41:57', '2024-11-22 10:41:57'),
(2, 15, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":false},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":false},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-22 10:41:57', '2024-11-22 10:41:57'),
(3, 15, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":false},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":false},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":false}]', '2024-11-22 10:41:57', '2024-11-22 10:41:57'),
(4, 15, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":false}]', '2024-11-22 10:41:57', '2024-11-22 10:41:57'),
(5, 15, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-22 10:41:57', '2024-11-22 10:41:57'),
(6, 15, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-22 10:41:57', '2024-11-22 10:41:57'),
(7, 14, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":true},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":false},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":false}]', '2024-11-22 10:52:40', '2024-11-22 10:52:40'),
(8, 14, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":true},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":false},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-22 10:52:40', '2024-11-22 10:52:40'),
(9, 14, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":false},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":false},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":false}]', '2024-11-22 10:52:40', '2024-11-22 10:52:40'),
(10, 14, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":false}]', '2024-11-22 10:52:40', '2024-11-22 10:52:40'),
(11, 14, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-22 10:52:40', '2024-11-22 10:52:40'),
(12, 14, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-22 10:52:40', '2024-11-22 10:52:40'),
(13, 11, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":true},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":true},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":true}]', '2024-11-22 11:02:01', '2024-11-22 11:02:01'),
(14, 11, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":true},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":true},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":true}]', '2024-11-22 11:02:01', '2024-11-22 11:02:01'),
(15, 11, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":true},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":false},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":false}]', '2024-11-22 11:02:01', '2024-11-22 11:02:01'),
(16, 11, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":false}]', '2024-11-22 11:02:01', '2024-11-22 11:02:01'),
(17, 11, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-22 11:02:01', '2024-11-22 11:02:01'),
(18, 11, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-22 11:02:01', '2024-11-22 11:02:01'),
(19, 16, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":true},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":true},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":true}]', '2024-11-26 09:48:46', '2024-11-26 09:48:46'),
(20, 16, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":true},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":true},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":true}]', '2024-11-26 09:48:46', '2024-11-26 09:48:46'),
(21, 16, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":true},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":true},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":true}]', '2024-11-26 09:48:46', '2024-11-26 09:48:46'),
(22, 16, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":true},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":true},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":true}]', '2024-11-26 09:48:46', '2024-11-26 09:48:46'),
(23, 16, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-26 09:48:46', '2024-11-26 09:48:46'),
(24, 16, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-26 09:48:46', '2024-11-26 09:48:46'),
(25, 13, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":false},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":false},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":false}]', '2024-11-26 09:59:00', '2024-11-26 09:59:00'),
(26, 13, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":false},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":false},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-26 09:59:00', '2024-11-26 09:59:00'),
(27, 13, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":false},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":true},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":true}]', '2024-11-26 09:59:00', '2024-11-26 09:59:00'),
(28, 13, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":true},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":true}]', '2024-11-26 09:59:00', '2024-11-26 09:59:00'),
(29, 13, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":true}]', '2024-11-26 09:59:00', '2024-11-26 09:59:00'),
(30, 13, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":true},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":true},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":true}]', '2024-11-26 09:59:00', '2024-11-26 09:59:00'),
(31, 12, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":false},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":false},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":false}]', '2024-11-26 10:06:02', '2024-11-26 10:06:02'),
(32, 12, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":true},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":false},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-26 10:06:02', '2024-11-26 10:06:02'),
(33, 12, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":true},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":false},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":false}]', '2024-11-26 10:06:02', '2024-11-26 10:06:02'),
(34, 12, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":false}]', '2024-11-26 10:06:02', '2024-11-26 10:06:02'),
(35, 12, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-26 10:06:02', '2024-11-26 10:06:02'),
(36, 12, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-26 10:06:02', '2024-11-26 10:06:02'),
(37, 10, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":false},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":false},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":false}]', '2024-11-26 10:15:36', '2024-11-26 10:15:36'),
(38, 10, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":false},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":true},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-26 10:15:36', '2024-11-26 10:15:36'),
(39, 10, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":true},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":true},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":true}]', '2024-11-26 10:15:36', '2024-11-26 10:15:36'),
(40, 10, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":false}]', '2024-11-26 10:15:36', '2024-11-26 10:15:36'),
(41, 10, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-26 10:15:36', '2024-11-26 10:15:36'),
(42, 10, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":true},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":true},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":true}]', '2024-11-26 10:15:37', '2024-11-26 10:15:37'),
(43, 8, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":true},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":true},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":true}]', '2024-11-26 10:21:35', '2024-11-26 10:21:35'),
(44, 8, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":true},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":true},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":true}]', '2024-11-26 10:21:35', '2024-11-26 10:21:35'),
(45, 8, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":true},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":true},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":true}]', '2024-11-26 10:21:35', '2024-11-26 10:21:35'),
(46, 8, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":true},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":true},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":true}]', '2024-11-26 10:21:35', '2024-11-26 10:21:35'),
(47, 8, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-26 10:21:35', '2024-11-26 10:21:35'),
(48, 8, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-26 10:21:35', '2024-11-26 10:21:35'),
(49, 9, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":false},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":false},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":false}]', '2024-11-26 10:34:31', '2024-11-26 10:34:31'),
(50, 9, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":false},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":false},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-26 10:34:31', '2024-11-26 10:34:31'),
(51, 9, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":false},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":false},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":false}]', '2024-11-26 10:34:31', '2024-11-26 10:34:31'),
(52, 9, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":false}]', '2024-11-26 10:34:31', '2024-11-26 10:34:31'),
(53, 9, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":true}]', '2024-11-26 10:34:31', '2024-11-26 10:34:31'),
(54, 9, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-26 10:34:31', '2024-11-26 10:34:31'),
(55, 7, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":false},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":false},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":true}]', '2024-11-26 10:35:25', '2024-11-26 10:35:25'),
(56, 7, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":false},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":false},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-26 10:35:25', '2024-11-26 10:35:25'),
(57, 7, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":false},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":false},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":false}]', '2024-11-26 10:35:25', '2024-11-26 10:35:25'),
(58, 7, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":false}]', '2024-11-26 10:35:25', '2024-11-26 10:35:25'),
(59, 7, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":true},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":true},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":true}]', '2024-11-26 10:35:25', '2024-11-26 10:35:25'),
(60, 7, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-26 10:35:25', '2024-11-26 10:35:25'),
(61, 6, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":true},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":true},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":true}]', '2024-11-26 10:50:09', '2024-11-26 10:50:09'),
(62, 6, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":true},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":true},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":true}]', '2024-11-26 10:50:09', '2024-11-26 10:50:09'),
(63, 6, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":true},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":true},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":true}]', '2024-11-26 10:50:09', '2024-11-26 10:50:09'),
(64, 6, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":true},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":true},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":true}]', '2024-11-26 10:50:09', '2024-11-26 10:50:09'),
(65, 6, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-26 10:50:09', '2024-11-26 10:50:09'),
(66, 6, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":true},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":true},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":true}]', '2024-11-26 10:50:09', '2024-11-26 10:50:09'),
(67, 5, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":true},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":true},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":true}]', '2024-11-26 10:55:56', '2024-11-26 10:55:56'),
(68, 5, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":false},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":true},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-26 10:55:56', '2024-11-26 10:55:56'),
(69, 5, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":true},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":true},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":true}]', '2024-11-26 10:55:56', '2024-11-26 10:55:56'),
(70, 5, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":false}]', '2024-11-26 10:55:56', '2024-11-26 10:55:56'),
(71, 5, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-26 10:55:56', '2024-11-26 10:55:56'),
(72, 5, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-26 10:55:56', '2024-11-26 10:55:56'),
(73, 4, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":false},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":false},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":false}]', '2024-11-26 11:02:13', '2024-11-26 11:02:13'),
(74, 4, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":true},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":false},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-26 11:02:13', '2024-11-26 11:02:13'),
(75, 4, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":false},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":false},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":false}]', '2024-11-26 11:02:13', '2024-11-26 11:02:13'),
(76, 4, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":false}]', '2024-11-26 11:02:13', '2024-11-26 11:02:13'),
(77, 4, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-26 11:02:13', '2024-11-26 11:02:13'),
(78, 4, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":true},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":false}]', '2024-11-26 11:02:13', '2024-11-26 11:02:13'),
(79, 3, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":true},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":true},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":true}]', '2024-11-26 11:20:00', '2024-11-26 11:20:00'),
(80, 3, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":true},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":true},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":true}]', '2024-11-26 11:20:00', '2024-11-26 11:20:00'),
(81, 3, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":false},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":false},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":false}]', '2024-11-26 11:20:00', '2024-11-26 11:20:00'),
(82, 3, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":true},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":true},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":true}]', '2024-11-26 11:20:00', '2024-11-26 11:20:00'),
(83, 3, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-26 11:20:00', '2024-11-26 11:20:00'),
(84, 3, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":true},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":true},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":true}]', '2024-11-26 11:20:00', '2024-11-26 11:20:00'),
(85, 2, 1, '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"response\":true},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"response\":true},{\"id\":\"item_5302172f8560e9d655e9899d\",\"response\":true}]', '2024-11-26 11:23:34', '2024-11-26 11:23:34'),
(86, 2, 2, '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"response\":false},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"response\":false},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"response\":false}]', '2024-11-26 11:23:34', '2024-11-26 11:23:34'),
(87, 2, 3, '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"response\":true},{\"id\":\"item_e195672c7132148c7529b9de\",\"response\":true},{\"id\":\"item_1354e34f24192866c5624979\",\"response\":true}]', '2024-11-26 11:23:34', '2024-11-26 11:23:34'),
(88, 2, 4, '[{\"id\":\"item_2186603392495ec1361184da\",\"response\":true},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"response\":true},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"response\":true}]', '2024-11-26 11:23:34', '2024-11-26 11:23:34'),
(89, 2, 5, '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"response\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"response\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"response\":false}]', '2024-11-26 11:23:35', '2024-11-26 11:23:35'),
(90, 2, 6, '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"response\":true},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"response\":true},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"response\":true}]', '2024-11-26 11:23:35', '2024-11-26 11:23:35');

-- --------------------------------------------------------

--
-- Table structure for table `assessmentform`
--

CREATE TABLE `assessmentform` (
  `id` bigint(20) NOT NULL,
  `schoolyear_id` bigint(20) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `items` text NOT NULL DEFAULT '[]',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessmentform`
--

INSERT INTO `assessmentform` (`id`, `schoolyear_id`, `category_name`, `items`, `created_at`, `updated_at`) VALUES
(1, 1, 'ACADEMIC', '[{\"id\":\"item_5264408754c8bc73c80dd19e\",\"item\":\"i am slow in mathematics\",\"alarming\":false},{\"id\":\"item_93b245c5e80a5b3c0347fd34\",\"item\":\"i am slow in reading\",\"alarming\":false},{\"id\":\"item_5302172f8560e9d655e9899d\",\"item\":\"i am afraid of failing in school\",\"alarming\":false}]', '2024-11-22 10:39:58', '2024-11-22 10:39:58'),
(2, 1, 'PHYSICAL HEALTH', '[{\"id\":\"item_b1a8c16d6060953e43f213ae\",\"item\":\"i easily get tired\",\"alarming\":false},{\"id\":\"item_1793d1df3a37699e96f66ab2\",\"item\":\"i am overweight\",\"alarming\":false},{\"id\":\"item_4179b03ca30fa5589927e6ae\",\"item\":\"i am underweight\",\"alarming\":false}]', '2024-11-22 10:39:58', '2024-11-22 10:39:58'),
(3, 1, 'RELATIONSHIPS', '[{\"id\":\"item_5bfa68becdd3fb77ba51b853\",\"item\":\"i am disappointed in love\",\"alarming\":false},{\"id\":\"item_e195672c7132148c7529b9de\",\"item\":\"the person i love does not love me\",\"alarming\":false},{\"id\":\"item_1354e34f24192866c5624979\",\"item\":\"i need advice about love\",\"alarming\":false}]', '2024-11-22 10:39:59', '2024-11-22 10:39:59'),
(4, 1, 'FAMILY', '[{\"id\":\"item_2186603392495ec1361184da\",\"item\":\"my parents do not trust me\",\"alarming\":false},{\"id\":\"item_ad75e94d481f70920d1aa505\",\"item\":\"my parents are separated\",\"alarming\":false},{\"id\":\"item_09c726dd44c44b4dd806d218\",\"item\":\"my parents do not love me\",\"alarming\":false}]', '2024-11-22 10:39:59', '2024-11-22 10:39:59'),
(5, 1, 'PERSONALITY', '[{\"id\":\"item_f5e7593897b549e6650ce7f9\",\"item\":\"others make fun of me\",\"alarming\":false},{\"id\":\"item_79f656b324bec4dc63c56d11\",\"item\":\"others talk about me\",\"alarming\":false},{\"id\":\"item_6b74b70bfeb067a3fc7f36b7\",\"item\":\"i am having thought of suicide\",\"alarming\":true}]', '2024-11-22 10:39:59', '2024-11-22 10:39:59'),
(6, 1, 'FINANCIAL', '[{\"id\":\"item_c94c486794fa78ec63a7d2cd\",\"item\":\"lack of money\",\"alarming\":false},{\"id\":\"item_53b92c6d49042e0de99b7a9c\",\"item\":\"i need to  find job\",\"alarming\":false},{\"id\":\"item_1a2bf970b6ba1659bd7cba4c\",\"item\":\"i dislike my parents job\",\"alarming\":false}]', '2024-11-22 10:39:59', '2024-11-22 10:39:59');

-- --------------------------------------------------------

--
-- Table structure for table `basicstatus`
--

CREATE TABLE `basicstatus` (
  `id` bigint(20) NOT NULL,
  `basic_id` bigint(20) NOT NULL,
  `status` enum('pending','completed','rejected') DEFAULT 'pending',
  `reason` text DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basicstatus`
--

INSERT INTO `basicstatus` (`id`, `basic_id`, `status`, `reason`, `created_at`, `updated_at`) VALUES
(1, 1, 'completed', '', '2024-11-22 10:30:31', '2024-11-22 10:33:38'),
(2, 2, 'completed', '', '2024-11-22 10:50:56', '2024-11-22 10:51:40'),
(3, 3, 'completed', '', '2024-11-22 10:57:35', '2024-11-22 11:01:07'),
(4, 4, 'completed', '', '2024-11-22 11:06:14', '2024-11-26 09:17:41'),
(5, 5, 'completed', '', '2024-11-26 09:56:55', '2024-11-26 09:57:38'),
(6, 6, 'completed', '', '2024-11-26 10:02:24', '2024-11-26 10:04:05'),
(7, 7, 'completed', '', '2024-11-26 10:10:42', '2024-11-26 10:13:56'),
(8, 8, 'completed', '', '2024-11-26 10:17:52', '2024-11-26 10:19:08'),
(9, 9, 'completed', '', '2024-11-26 10:29:36', '2024-11-26 10:32:36'),
(10, 10, 'completed', '', '2024-11-26 10:32:10', '2024-11-26 10:33:39');

-- --------------------------------------------------------

--
-- Table structure for table `calledinslip`
--

CREATE TABLE `calledinslip` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `guidance_id` bigint(20) NOT NULL,
  `schoolyear_id` bigint(20) NOT NULL,
  `scheduled_date` date NOT NULL,
  `scheduled_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `casenote`
--

CREATE TABLE `casenote` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `guidance_id` bigint(20) NOT NULL,
  `schoolyear_id` bigint(20) NOT NULL,
  `called_slip_id` bigint(20) DEFAULT NULL,
  `interaction_type` enum('Individual','Group','Called-in','Walked-in','Referred','Follow-up') NOT NULL DEFAULT 'Individual',
  `details` text NOT NULL DEFAULT '',
  `information_by_counselor` text NOT NULL DEFAULT '',
  `client_decision` text NOT NULL DEFAULT '',
  `behavioral_observation` text NOT NULL DEFAULT '',
  `case_note_img` text DEFAULT '[]',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collegestatus`
--

CREATE TABLE `collegestatus` (
  `id` bigint(20) NOT NULL,
  `college_id` bigint(20) NOT NULL,
  `status` enum('pending','completed','rejected') DEFAULT 'pending',
  `reason` text DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collegestatus`
--

INSERT INTO `collegestatus` (`id`, `college_id`, `status`, `reason`, `created_at`, `updated_at`) VALUES
(1, 1, 'completed', '', '2024-11-26 10:45:57', '2024-11-26 10:49:03'),
(2, 2, 'completed', '', '2024-11-26 10:53:32', '2024-11-26 10:54:45'),
(3, 3, 'completed', '', '2024-11-26 10:59:58', '2024-11-26 11:00:42'),
(4, 4, 'completed', '', '2024-11-26 11:06:59', '2024-11-26 11:13:42'),
(5, 5, 'completed', '', '2024-11-26 11:19:09', '2024-11-26 11:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `feedbackform`
--

CREATE TABLE `feedbackform` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `guidance_id` bigint(20) NOT NULL,
  `schoolyear_id` bigint(20) NOT NULL,
  `case_note_id` bigint(20) DEFAULT NULL,
  `ratings` text NOT NULL DEFAULT '[]',
  `comments` text NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `href` varchar(255) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otptoken`
--

CREATE TABLE `otptoken` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `otp_expiry` datetime NOT NULL,
  `otp_verified` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referralform`
--

CREATE TABLE `referralform` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `guidance_id` bigint(20) NOT NULL,
  `schoolyear_id` bigint(20) NOT NULL,
  `case_note_id` bigint(20) DEFAULT NULL,
  `called_slip_id` bigint(20) DEFAULT NULL,
  `referral_a` text NOT NULL,
  `referral_b` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schoolyear`
--

CREATE TABLE `schoolyear` (
  `id` bigint(20) NOT NULL,
  `year` year(4) NOT NULL,
  `editable` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schoolyear`
--

INSERT INTO `schoolyear` (`id`, `year`, `editable`, `created_at`, `updated_at`) VALUES
(1, '2024', 0, '2024-11-22 10:26:02', '2024-11-22 10:40:51');

-- --------------------------------------------------------

--
-- Table structure for table `studentbasic`
--

CREATE TABLE `studentbasic` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `schoolyear_id` bigint(20) NOT NULL,
  `student_profile_id` bigint(20) NOT NULL,
  `gradelevel` int(2) NOT NULL,
  `section` varchar(255) NOT NULL,
  `adviser` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentbasic`
--

INSERT INTO `studentbasic` (`id`, `user_id`, `schoolyear_id`, `student_profile_id`, `gradelevel`, `section`, `adviser`, `created_at`, `updated_at`) VALUES
(1, 15, 1, 1, 7, 'St. Anne', 'Ms. Anna', '2024-11-22 10:30:31', '2024-11-22 10:30:31'),
(2, 14, 1, 2, 7, 'St. Catherine', 'Ms Catherine', '2024-11-22 10:50:56', '2024-11-22 10:50:56'),
(3, 11, 1, 3, 7, 'St. Marta', 'Ms. Marta', '2024-11-22 10:57:35', '2024-11-22 10:57:35'),
(4, 16, 1, 4, 8, 'St. Cecile', 'Ms. Cecile', '2024-11-22 11:06:13', '2024-11-22 11:06:13'),
(5, 13, 1, 5, 8, 'St. Lucy', 'Ms. Lucy', '2024-11-26 09:56:55', '2024-11-26 09:56:55'),
(6, 12, 1, 6, 11, 'Acountancy and Business Management', 'Mr. ArGunz', '2024-11-26 10:02:24', '2024-11-26 10:02:24'),
(7, 10, 1, 7, 11, 'Humanities and Social Sciences', 'Janna Bataluna', '2024-11-26 10:10:42', '2024-11-26 10:10:42'),
(8, 8, 1, 8, 12, 'Home Economics and TLE', 'Marichu Mendoza', '2024-11-26 10:17:52', '2024-11-26 10:17:52'),
(9, 9, 1, 9, 12, 'Science Technology and Engineering Mathematics', 'Lhil John', '2024-11-26 10:29:36', '2024-11-26 10:29:36'),
(10, 7, 1, 10, 12, 'Maritime', 'Anne Curtis', '2024-11-26 10:32:10', '2024-11-26 10:32:10');

-- --------------------------------------------------------

--
-- Table structure for table `studentcollege`
--

CREATE TABLE `studentcollege` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `schoolyear_id` bigint(20) NOT NULL,
  `student_profile_id` bigint(20) NOT NULL,
  `department` varchar(255) NOT NULL,
  `yearlevel` int(2) NOT NULL,
  `course` varchar(255) NOT NULL,
  `semester` enum('1st Semester','2nd Semester','Summer') NOT NULL DEFAULT '1st Semester',
  `dean` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentcollege`
--

INSERT INTO `studentcollege` (`id`, `user_id`, `schoolyear_id`, `student_profile_id`, `department`, `yearlevel`, `course`, `semester`, `dean`, `created_at`, `updated_at`) VALUES
(1, 6, 1, 11, 'College of Business Management and Accountancy', 4, 'Bachelor of Science in Business Administration Major in Financial Management', '1st Semester', 'Daisa O. Gupit', '2024-11-26 10:45:57', '2024-11-26 10:45:57'),
(2, 5, 1, 12, 'College of Computing and Information Sciences', 4, 'Bachelor of Science in Information Technology', '2nd Semester', 'Marlon Timogan', '2024-11-26 10:53:32', '2024-11-26 10:53:32'),
(3, 4, 1, 13, 'College of Computing and Information Sciences', 4, 'Bachelor of Science in Computer Science', '1st Semester', 'Daisa O. Gupit, MIT', '2024-11-26 10:59:58', '2024-11-26 10:59:58'),
(4, 3, 1, 14, 'College of Criminal Justice Education', 4, 'Bachelor of Science in Criminology', '1st Semester', 'Arvin Lhil Bataluna', '2024-11-26 11:06:59', '2024-11-26 11:06:59'),
(5, 2, 1, 15, 'College of Teacher Education', 4, 'Bachelor of Technical Vocational Teacher Education', '1st Semester', 'Jun Villarmia', '2024-11-26 11:19:09', '2024-11-26 11:19:09');

-- --------------------------------------------------------

--
-- Table structure for table `studentprofile`
--

CREATE TABLE `studentprofile` (
  `id` bigint(20) NOT NULL,
  `profile_pic` text NOT NULL,
  `middle_name` varchar(255) DEFAULT '',
  `suffix_name` varchar(255) DEFAULT '',
  `age` int(2) NOT NULL,
  `bloodtype` varchar(10) NOT NULL,
  `height` decimal(5,2) NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `civil_status` varchar(255) NOT NULL,
  `citizenship` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `birthdate` date NOT NULL,
  `contact` varchar(15) NOT NULL,
  `religion` varchar(255) NOT NULL,
  `emergency_name` varchar(255) NOT NULL,
  `emergency_relationship` varchar(255) NOT NULL,
  `emergency_contact` varchar(15) NOT NULL,
  `father_last_name` varchar(255) NOT NULL,
  `father_first_name` varchar(255) NOT NULL,
  `father_middle_name` varchar(255) DEFAULT '',
  `father_contact` varchar(15) NOT NULL,
  `father_occupation` varchar(255) NOT NULL,
  `father_employee_type` varchar(255) NOT NULL,
  `father_education_attainment` varchar(255) NOT NULL,
  `mother_last_name` varchar(255) NOT NULL,
  `mother_first_name` varchar(255) NOT NULL,
  `mother_middle_name` varchar(255) DEFAULT '',
  `mother_contact` varchar(15) NOT NULL,
  `mother_occupation` varchar(255) NOT NULL,
  `mother_employee_type` varchar(255) NOT NULL,
  `mother_education_attainment` varchar(255) NOT NULL,
  `parent_address` text NOT NULL,
  `parent_marital_status` varchar(255) NOT NULL,
  `doctoral` varchar(255) DEFAULT '',
  `doctoral_graduated` varchar(255) DEFAULT '',
  `doctoral_honors` varchar(255) DEFAULT '',
  `doctoral_program` varchar(255) DEFAULT '',
  `masteral` varchar(255) DEFAULT '',
  `masteral_graduated` varchar(255) DEFAULT '',
  `masteral_honors` varchar(255) DEFAULT '',
  `masteral_program` varchar(255) DEFAULT '',
  `college` varchar(255) DEFAULT '',
  `college_graduated` varchar(255) DEFAULT '',
  `college_honors` varchar(255) DEFAULT '',
  `college_program` varchar(255) DEFAULT '',
  `techvoc` varchar(255) DEFAULT '',
  `techvoc_graduated` varchar(255) DEFAULT '',
  `techvoc_honors` varchar(255) DEFAULT '',
  `highschool` varchar(255) DEFAULT '',
  `highschool_graduated` varchar(255) DEFAULT '',
  `highschool_honors` varchar(255) DEFAULT '',
  `als` varchar(255) DEFAULT '',
  `als_graduated` varchar(255) DEFAULT '',
  `als_honors` varchar(255) DEFAULT '',
  `elementary` varchar(255) DEFAULT '',
  `elementary_graduated` varchar(255) DEFAULT '',
  `elementary_honors` varchar(255) DEFAULT '',
  `support` varchar(255) NOT NULL,
  `number_of_siblings` int(2) NOT NULL,
  `siblings` text DEFAULT NULL,
  `home_persons_living` int(3) NOT NULL,
  `home_children` int(3) NOT NULL,
  `homelife` varchar(50) NOT NULL,
  `workathome` varchar(3) NOT NULL,
  `work` text DEFAULT NULL,
  `discipline_type` text NOT NULL,
  `discipline_handle` text NOT NULL,
  `sleep_time` varchar(255) NOT NULL,
  `have_friends` varchar(3) NOT NULL,
  `why_friend` text DEFAULT NULL,
  `hobbies` text NOT NULL,
  `enjoy` text NOT NULL,
  `organization_out_of_school` text DEFAULT '',
  `health_history` text NOT NULL,
  `health_exhibit_mannerisms` text DEFAULT '',
  `health_past_operations` text DEFAULT '',
  `health_allergies` text DEFAULT '',
  `indigenous_group` varchar(3) NOT NULL,
  `indigenous_group_specify` text DEFAULT '',
  `differently_abled` varchar(3) NOT NULL,
  `differently_abled_specify` text DEFAULT '',
  `solo_parent` varchar(3) NOT NULL,
  `solo_parent_specify` text DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentprofile`
--

INSERT INTO `studentprofile` (`id`, `profile_pic`, `middle_name`, `suffix_name`, `age`, `bloodtype`, `height`, `weight`, `civil_status`, `citizenship`, `address`, `birthdate`, `contact`, `religion`, `emergency_name`, `emergency_relationship`, `emergency_contact`, `father_last_name`, `father_first_name`, `father_middle_name`, `father_contact`, `father_occupation`, `father_employee_type`, `father_education_attainment`, `mother_last_name`, `mother_first_name`, `mother_middle_name`, `mother_contact`, `mother_occupation`, `mother_employee_type`, `mother_education_attainment`, `parent_address`, `parent_marital_status`, `doctoral`, `doctoral_graduated`, `doctoral_honors`, `doctoral_program`, `masteral`, `masteral_graduated`, `masteral_honors`, `masteral_program`, `college`, `college_graduated`, `college_honors`, `college_program`, `techvoc`, `techvoc_graduated`, `techvoc_honors`, `highschool`, `highschool_graduated`, `highschool_honors`, `als`, `als_graduated`, `als_honors`, `elementary`, `elementary_graduated`, `elementary_honors`, `support`, `number_of_siblings`, `siblings`, `home_persons_living`, `home_children`, `homelife`, `workathome`, `work`, `discipline_type`, `discipline_handle`, `sleep_time`, `have_friends`, `why_friend`, `hobbies`, `enjoy`, `organization_out_of_school`, `health_history`, `health_exhibit_mannerisms`, `health_past_operations`, `health_allergies`, `indigenous_group`, `indigenous_group_specify`, `differently_abled`, `differently_abled_specify`, `solo_parent`, `solo_parent_specify`, `created_at`, `updated_at`) VALUES
(1, '/images/profile/65b693100bc423aed31538d3fe184f73.jpg', 'V', '', 24, 'O+', 143.00, 44.00, 'Single', 'FILIPINO', 'Kinabjangan', '0000-00-00', '8798798798', 'jjbjb', 'jjjh', 'jhjh', 'jhj', 'hj', 'hjh', 'jhjh', 'hj', 'jh', 'Entreprenuer', 'Postgraduate (Master’s Degree)', 'hjhj', 'jhjh', 'hjjh', 'hjhj', 'jh', 'Government', 'Junior High School', 'hj', 'Father Remarried', 'jh', 'jh', 'jh', 'jh', 'jh', 'jh', 'jh', 'jh', 'jh', 'jh', 'h', 'j', 'h', 'jh', 'h', 'h', 'h', 'h', 'h', 'hh', 'h', 'h', 'h', 'h', 'Brother/Sister', 1, '[{\"name\":\"fefe\",\"age\":\"1\",\"occupation\":\"yytyt\",\"educational_attainment\":\"y\"}]', 1, 1, 'Very Happy', 'Yes', 'h', 'h', 'hj', 'hjh', 'Yes', 'h', 'h', 'h', 'h', '[\"Pneumonia\"]', 'u', 'u', 'u', 'Yes', 'u', 'Yes', 'u', 'Yes', 'u', '2024-11-22 10:30:30', '2024-11-22 10:30:30'),
(2, '/images/profile/969ed13339825877809af632a6158276.jpg', 'S', '', 22, 'B+', 130.00, 42.00, 'Legally Separated', 'FILIPINO', 'cwefd', '0000-00-00', '09161661616', 'drrdrdr', 'u', 'uhh', 'y', 'yu', 'y', 'y', 'y', 'ytytytyt', '9`', 'Vocational or TESDA (Diploma)', 'y', 'y', 'ytytyty', 'y', 'ytytyty', 'OFW', 'Undergraduate (Bachelor’s Degree)', 'y', 'i', 'y', 'y', 'h', 'h', 'h', 'h', 'hh', 'h', 'h', 'h', 'h', 'h', 'h', 'hh', 'h', 'h', 'h', 'h', 'h', '', '', '', '', '', 'Brother/Sister', 1, '[{\"name\":\"Fatima Ellaine Guno\",\"age\":\"213\",\"occupation\":\"u\",\"educational_attainment\":\"u\"}]', 7, 2, 'Very Happy', 'Yes', 'j', 'u', 'jh', 'u', 'Yes', 'uy', 'u', 'uy', 'u', '[\"Heart Diseases\"]', 'i', 'u', 'u', 'Yes', 'u', 'Yes', 'u', 'Yes', 'u', '2024-11-22 10:50:56', '2024-11-22 10:50:56'),
(3, '/images/profile/713d73ed2850e2fb7cfbfb2e96df8909.jpg', 'M', '', 12, 'B-', 134.00, 77.00, 'Legally Separated', 't', 't', '0000-00-00', '09161661616', 'u', 'u', 'uhh', 'u', 'u', 'uhuhuh', 'uhuhh', 'u', 'u', 'Government', 'Secondary School', 'u', 'uhuhh', 'u', 'u', 'u', 'Government', 'Primary School', 'kinabjangan', 'Married in Church', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', '', '', '', '', '', '', '', '', '', '', '', 'Working Student', 1, '[{\"name\":\"u\",\"age\":\"8\",\"occupation\":\"u\",\"educational_attainment\":\"jijij\"}]', 1, 2, 'Very Happy', 'Yes', 'j', 'jjh', 'j', 'jbhjb', 'Yes', 'j', 'j', 'j', 'j', '[\"Heart Diseases\"]', 'jiji', 'u', 'u', 'Yes', 'u', 'Yes', 'u', 'Yes', 'u', '2024-11-22 10:57:35', '2024-11-22 10:57:35'),
(4, '/images/profile/df003724f51570f2f18d10e36feb37f9.jpg', 'S', '', 10, 'B+', 135.00, 35.00, 'Married', 'i', 'Kinabjangan', '0696-07-09', '09672042713', 'iu', 'hui', 'hui', 'u', 'u', 'y', 'y', 'y', 'y', 'Entreprenuer', 'Undergraduate (Bachelor’s Degree)', 'u', 'y', 'y', 'y', 'y', 'Entreprenuer', 'Vocational or TESDA (Diploma)', 'h', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Lola/Lolo', 1, '[{\"name\":\"y\",\"age\":\"1\",\"occupation\":\"y\",\"educational_attainment\":\"h\"}]', 1, 1, 'Very Happy', 'Yes', 'u', 'h', 'h', 'h', 'Yes', 'h', 'h', 'h', 'hh', '[\"Heart Diseases\"]', 'y', 'y', 'y', 'Yes', 'y', 'Yes', 'u', 'Yes', 'u', '2024-11-22 11:06:13', '2024-11-22 11:06:13'),
(5, '/images/profile/d9dfeec3db3475f9740f601ec698a829.jpg', 'M', '', 10, 'B+', 120.00, 20.00, 'Married', 'u', 'u', '0008-08-07', '876', 'hn', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'Entreprenuer', 'Primary School', 'g', 'g', 'g', 'g', 'g', 'Government', 'Secondary School', 'H', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"y\",\"age\":\"9\",\"occupation\":\"h\",\"educational_attainment\":\"jj\"}]', 1, 1, 'Very Happy', 'Yes', 'K', 'i', 'i', 'i', 'Yes', 'i', 'ii', 'i', 'i', '[\"Pneumonia\"]', 'iIiIIiiiIi', 'I', 'I', 'Yes', 'I', 'Yes', 'I', 'Yes', 'I', '2024-11-26 09:56:55', '2024-11-26 09:56:55'),
(6, '/images/profile/5a2e30be1cba4947ac5d77729149f0a3.jpg', 'R', '', 10, 'B-', 120.00, 20.00, 'Single', 'huh', 'hHhH', '0787-08-08', '89', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'Self-Employed', 'Postgraduate (Master’s Degree)', 'y', 'y', 'ytytyty', 'y', 'y', 'Private', 'Vocational or TESDA (Diploma)', 'y', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"h\",\"age\":\"8\",\"occupation\":\"gfg\",\"educational_attainment\":\"g\"}]', 2, 1, 'Very Happy', 'Yes', 'o', 'h', 'h', 'h', 'Yes', 'h', 'h', 'h', 'h', '[\"Heart Diseases\"]', 'hjb', 'hb', 'h', 'Yes', 'h', 'Yes', 'hjhjh', 'Yes', 'h', '2024-11-26 10:02:24', '2024-11-26 10:02:24'),
(7, '/images/profile/9b61100c59f07b632707e5b1081d776d.jpg', 'H', '', 10, 'O-', 120.00, 20.00, 'Married', 'h', 'h', '0999-09-09', 'h', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'Self-Employed', 'Primary School', 'j', 'j', 'j', 'j', 'j', 'Private', 'Junior High School', 'k', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"j\",\"age\":\"9\",\"occupation\":\"JU\",\"educational_attainment\":\"9\"}]', 1, 1, 'Very Happy', 'Yes', 'I', 'I', 'I', 'I', 'Yes', 'I', 'I', 'I', 'I', '[\"Kidney Infection\"]', 'I', 'I', 'I', 'Yes', 'I', 'Yes', 'I', 'Yes', 'I', '2024-11-26 10:10:42', '2024-11-26 10:10:42'),
(8, '/images/profile/6eb402bd151f505bee9b03a8a3e3c48d.jpg', 'L', '', 10, 'AB+', 120.00, 20.00, 'Married', 'ij', 'jhbhjb', '0009-09-09', 'i', 'INC', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'Government', 'Vocational or TESDA (Diploma)', 'y', 'y', 'ytytyty', 'y', 'y', 'Government', 'Junior High School', 'j', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"bY\",\"age\":\"8\",\"occupation\":\"gfg\",\"educational_attainment\":\"k\"}]', 1, 1, 'Very Happy', 'Yes', 'hhHhHh', 'bn ', 'b', 'b', 'Yes', 'b', 'b', 'b', 'b', '[\"Asthma\"]', 'hHh', 'hb', 'h', 'Yes', 'h', 'Yes', 'h', 'Yes', 'h', '2024-11-26 10:17:52', '2024-11-26 10:17:52'),
(9, '/images/profile/06ce1620dbb7ec3cbff439be48447cb8.jpg', 'C', '', 10, 'AB+', 120.00, 20.00, 'Married', 'h', 'hh', '0087-08-07', 'h8', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'NGO', 'Undergraduate (Bachelor’s Degree)', 'u', 'u', 'u', 'u', 'u', 'Private', 'Vocational or TESDA (Diploma)', 'u', 'Married in Church', 'u', '', 'u', 'uuu', 'u', 'uu', 'uu', 'u', 'uu', 'u', 'u', 'u', 'uuu', 'u', 'u', '', 'uu', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'Mother', 1, '[{\"name\":\"g\",\"age\":\"9\",\"occupation\":\"h\",\"educational_attainment\":\"h\"}]', 1, 1, 'Very Happy', 'Yes', 'u', 'u', 'u', 'u', 'Yes', 'u', 'u', 'u', 'u', '[\"Heart Diseases\"]', 'y', 'y', 'y`y`yy', 'Yes', 'y', 'Yes', 'y', 'Yes', 'y', '2024-11-26 10:29:36', '2024-11-26 10:29:36'),
(10, '/images/profile/bc7bd2adc96de1048d46d29c6f2390cd.jpg', 'A', '', 10, 'O+', 120.00, 20.00, 'Married', 'j', 'Kinabjangan', '0006-08-03', 'G87', 'HG', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'Government', 'Junior High School', 'G', 'G', 'G', 'G', 'G', 'Government', 'Junior High School', 'I', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"G\",\"age\":\"8\",\"occupation\":\"g\",\"educational_attainment\":\"8g\"}]', 1, 1, 'Very Happy', 'Yes', 'b', 'n', 'n', 'n', 'Yes', 'n', 'n', 'n', 'n', '[\"Restlessness\"]', 'j', 'n', 'b', 'Yes', 'b', 'Yes', 'b', 'Yes', 'b', '2024-11-26 10:32:10', '2024-11-26 10:32:10'),
(11, '/images/profile/050b7a8f5db1bf0c8cf79de01f9a771e.jpg', 'G', '', 22, 'O+', 120.00, 26.00, 'Single', 'h', 'Kinabjangan district 4 nasipit agusan del norte', '2003-07-09', '0959435679', 'BORN AGAIN CHRISTIAN', 'Leonito Benliro', 'FATHER', '0900909099', 'MACABINGUEL', 'CLEOPAS', 'SOJOR', '09912178128278', 'DRIVER', 'Private', 'Vocational or TESDA (Diploma)', 'ARRIOLA', 'MARICEL', 'CABONCE', '09511231312', 'Government Worker', 'Government', 'Undergraduate (Bachelor’s Degree)', 'Alubihid, Buenavista', 'Married in Church', 'Nasipit National Vocational School', '1990-1992', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"Jef Labadan\",\"age\":\"9\",\"occupation\":\"STUDENT\",\"educational_attainment\":\"College\"}]', 1, 1, 'Very Happy', 'No', NULL, 'Attitude', 'FATHER', '2 AM', 'No', NULL, 'Dancing', 'Singing', 'NONE', '[\"Cough\"]', 'NONE', 'NONE', 'NONE', 'No', NULL, 'No', NULL, 'No', NULL, '2024-11-26 10:45:57', '2024-11-26 10:45:57'),
(12, '/images/profile/25496598a7cc33e042d7b87443e71aa9.jpg', 'P', '', 10, 'AB-', 120.00, 20.00, 'Single', 'h', 'h', '0987-09-07', 'u', 'h', 'g', 'g', 'g', 'g', 'i', 'i', 'i', 'i', 'Self-Employed', 'Junior High School', 'p', 'i', 'i', 'i', 'i', 'Government', 'Doctoral (PhD)', 'k', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"y\",\"age\":\"7\",\"occupation\":\"y\",\"educational_attainment\":\"u\"}]', 1, 1, 'Very Happy', 'Yes', 'h', 'h', 'h', 'h', 'Yes', 'h', 'h', 'h', 'h', '[\"Kidney Infection\"]', 'u', 'u', 'u', 'Yes', 'u', 'Yes', 'u', 'Yes', 'u', '2024-11-26 10:53:32', '2024-11-26 10:53:32'),
(13, '/images/profile/6ee0a7479d495bef62d5103be1787a53.jpg', 'R', '', 10, 'O+', 120.00, 20.00, 'Single', 'f', 'w', '0002-02-22', '3', 't', 'w', 'w', '3', 'e', 'w', 'w', 'w', 'w', 'Entreprenuer', 'Undergraduate (Bachelor’s Degree)', 'w', 'w', 'w', 'w', 'w', 'Government', 'Postgraduate (Master’s Degree)', 'dfbdnr', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"Jef Labadan\",\"age\":\"2\",\"occupation\":\"Macho Dancer\",\"educational_attainment\":\"COLLEGE\"}]', 1, 1, 'Very Happy', 'Yes', 'w', 'w', 'w', 'w', 'Yes', 'w', 'w', 'w', 'w', '[\"Kidney Infection\"]', 'w', 'w', 'w', 'Yes', 'w', 'Yes', 'w', 'Yes', 'w', '2024-11-26 10:59:58', '2024-11-26 10:59:58'),
(14, '/images/profile/ce53e9aaad17dacefc4ec8d6b9ef91c6.jpg', 'M', '', 15, 'AB+', 120.00, 20.00, 'Single', 'y', 'y', '0897-08-07', '9', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'Government', 'Postgraduate (Master’s Degree)', 'h', 'h', 'h', 'h', 'h', 'Government', 'Senior High School', 'ii', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"h\",\"age\":\"7\",\"occupation\":\"h\",\"educational_attainment\":\"h\"}]', 1, 1, 'Very Happy', 'Yes', 'h', 'p', 'o', 'o', 'Yes', 'o', 'o', 'o', 'o', '[\"Heart Diseases\"]', 'i', 'i', 'i', 'Yes', 'i', 'Yes', 'ii', 'Yes', 'i', '2024-11-26 11:06:59', '2024-11-26 11:06:59'),
(15, '/images/profile/87c35121bce48ae561a0ed25d3a15106.jpg', 'O', '', 10, 'AB+', 120.00, 20.00, 'Married', 'y', 'y', '0007-07-07', '7', 't', 't', 't', '7', 't', 't', 't', 't', 't', 'Government', 'Primary School', 't', 't', 't', 't', 't', 'Government', 'Secondary School', 'j', 'Married in Church', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mother', 1, '[{\"name\":\"y\",\"age\":\"8\",\"occupation\":\"h\",\"educational_attainment\":\"h\"}]', 1, 1, 'Very Happy', 'Yes', 'u', 'u', 'u', 'u', 'Yes', 'u', 'u', 'u', 'u', '[\"Kidney Infection\"]', 'i', 'i', 'i', 'Yes', 'i', 'Yes', 'i', 'Yes', 'i', '2024-11-26 11:19:09', '2024-11-26 11:19:09');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_initial` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT 'Male',
  `email` varchar(255) NOT NULL,
  `profile_pic` varchar(255) DEFAULT '',
  `role` enum('superadmin','admin','student') DEFAULT 'student',
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `middle_initial`, `last_name`, `gender`, `email`, `profile_pic`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'superadmin', '$2y$10$tH6ssRR9h4eW.49XKqbXHOvlP/XVlezrw1ApPmzEa5WNpT7irr4Im', 'EDP', '', 'Office', 'Male', 'edp@smccnasipit.edu.ph', '/images/default-user.png', 'superadmin', 1, '2024-11-22 10:07:40', '2024-11-22 10:07:40'),
(2, '201901451', '$2y$10$UyWbje9PkQ/2hWam8JSKi.0EwN1x3R8qud5fPxkQP1byPYWpw/UY.', 'JOHN MICHAEL', 'O', 'NAKILA', 'Male', 'johnmichael_nakila@smccnasipit.edu.ph', '/images/profile/87c35121bce48ae561a0ed25d3a15106.jpg', 'student', 1, '2024-11-22 10:10:15', '2024-11-26 11:19:09'),
(3, '202151492', '$2y$10$.Iu4WRAWDwIi.JxQWtyi6.9LH6SO4Rt.SXn/bydIhtBCDpwXNr0Jy', 'VICFEL CHAMP', 'M', 'ABUAN', 'Male', 'vicfelchamp_abuan@smccnasipit.edu.ph', '/images/profile/ce53e9aaad17dacefc4ec8d6b9ef91c6.jpg', 'student', 1, '2024-11-22 10:11:49', '2024-11-26 11:06:59'),
(4, '202150036', '$2y$10$tN/QOrjpN44nkqNv47OFuO91bOF0.5Gfswsec1FFlfThDBoXnHj5m', 'PETER JOHN', 'R', 'SANTOS', 'Male', 'peterjohn_santos@smccnasipit.edu.ph', '/images/profile/6ee0a7479d495bef62d5103be1787a53.jpg', 'student', 1, '2024-11-22 10:12:42', '2024-11-26 10:59:58'),
(5, '201500986', '$2y$10$aOXOvy7KiwXKm6PJt00rQeBA.bd0yOAG9eRKhZCJKdk3Hy4CiIdHe', 'ROAN JOSEPH', 'P', 'TAMPOS', 'Male', 'roanjoseph_tampos@smccnasipit.edu.ph', '/images/profile/25496598a7cc33e042d7b87443e71aa9.jpg', 'student', 1, '2024-11-22 10:13:25', '2024-11-26 10:53:32'),
(6, '202151178', '$2y$10$FMVeLeVX9Kdjvn4PAVg/EuNFUVRYTzVHhHUPFC2QqGBroxZwDUl1e', 'YNAH', 'G', 'SALVAÑA', 'Female', 'ynah_salvana@smccnasipit.edu.ph', '/images/profile/050b7a8f5db1bf0c8cf79de01f9a771e.jpg', 'student', 1, '2024-11-22 10:14:23', '2024-11-26 10:45:57'),
(7, '202151218', '$2y$10$jskazrp6B.XnDhWtPBG54OPyzLCDjfRqsDGPj1..4qrRAHW6A7uN2', 'KENZO JADE', 'A', 'MORES', 'Male', 'kenzojade_mores@smccnasipit.edu.ph', '/images/profile/bc7bd2adc96de1048d46d29c6f2390cd.jpg', 'student', 1, '2024-11-22 10:15:05', '2024-11-26 10:32:10'),
(8, '202150458', '$2y$10$H.5dAkcssAZXU8Cts74tNOUvd9ZZIZp88oAv0.Qg3RgW43EUgD766', 'JORICA', 'L', 'YOSORES', 'Female', 'jorica_yosores@smccnasipit.edu.ph', '/images/profile/6eb402bd151f505bee9b03a8a3e3c48d.jpg', 'student', 1, '2024-11-22 10:15:41', '2024-11-26 10:17:52'),
(9, '202150818', '$2y$10$bbw48z4NKDkPjgRxWsDG1O1Spo1GLx3M/MLnvTyWlh0FEeaAvXlvG', 'KATE', 'C', 'PEPITO', 'Female', 'kate_pepito@smccnasipit.edu.ph', '/images/profile/06ce1620dbb7ec3cbff439be48447cb8.jpg', 'student', 1, '2024-11-22 10:16:24', '2024-11-26 10:29:36'),
(10, '202150804', '$2y$10$lkAUtkmp4uCLI3F09VlbG.PwGKd7UmL5Tmd7fMx4WC2v5Bu.2aGr2', 'ROXANNE', 'H', 'BONAYOG', 'Female', 'roxanne_bonayog@smccnasipit.edu.ph', '/images/profile/9b61100c59f07b632707e5b1081d776d.jpg', 'student', 1, '2024-11-22 10:17:00', '2024-11-26 10:10:42'),
(11, '202051119', '$2y$10$RmYkESsqVvWVCsP.4EFukuInItXKzYGcJQq7lbGTDWOTluAyU3Zv2', 'ERIKA SHANE', 'M', 'LABOR', 'Female', 'erikashane_labor@smccnasipit.edu.ph', '/images/profile/713d73ed2850e2fb7cfbfb2e96df8909.jpg', 'student', 1, '2024-11-22 10:17:35', '2024-11-26 09:06:58'),
(12, '202150077', '$2y$10$y0spLsSE9/ZHKNj1jeE27eSmmIcPPwZdmUuDUWV8gmZ9oEf0xkS6m', 'JULIOS', 'R', 'FELISILDA', 'Male', 'julios_felisilda@smccnasipit.edu.ph', '/images/profile/5a2e30be1cba4947ac5d77729149f0a3.jpg', 'student', 1, '2024-11-22 10:18:41', '2024-11-26 10:02:24'),
(13, '202151188', '$2y$10$5xnFwePL1Eke4Poga9u7x.5zpaebr/Lfn59L8JfWqj1blBPg78Fli', 'JEF', 'M', 'LABADAN', 'Male', 'jef_labadan@smccnasipit.edu.ph', '/images/profile/d9dfeec3db3475f9740f601ec698a829.jpg', 'student', 1, '2024-11-22 10:19:28', '2024-11-26 09:56:55'),
(14, '202150179', '$2y$10$1PvkJjA1323XoxHsvzeVgOJ37ocK3xKJ7/LMnQfUNq3bPuT9YIF4O', 'MICHI NOWA', 'S', 'BATALUNA', 'Female', 'michinowa_bataluna@smccnasipit.edu.ph', '/images/profile/969ed13339825877809af632a6158276.jpg', 'student', 1, '2024-11-22 10:20:09', '2024-11-26 09:07:18'),
(15, '202151763', '$2y$10$aW2NNCHPHl5NIVCMJMX95.LiXLkNixgEfA7eXtUSvnH1bZA02f5CW', 'ARVIN JAY', 'V', 'GUNO', 'Male', 'arvinjay_guno@smccnasipit.edu.ph', '/images/profile/65b693100bc423aed31538d3fe184f73.jpg', 'student', 1, '2024-11-22 10:20:48', '2024-11-22 10:30:31'),
(16, '202151033', '$2y$10$fs6kPhfiwMxXB.5K2u5AI.gCPNexSVOzxtynIGtSVIShZkSLRA5wO', 'LHIL KIM', 'S', 'MENDOZA', 'Female', 'lhilkim_mendoza@smccnasipit.edu.ph', '/images/profile/df003724f51570f2f18d10e36feb37f9.jpg', 'student', 1, '2024-11-22 10:21:54', '2024-11-26 09:07:35'),
(17, '2003', '$2y$10$s7Merv8zoiTfJOL4ZXUFfu2rGR8ws/ewRp/eiuahP6DUQhCCtae2a', 'kate', 'V', 'padre', 'Female', 'argunzgwapo@gmail.com', '/images/default-user.png', 'admin', 1, '2024-11-22 10:32:29', '2024-11-22 10:32:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agreementform`
--
ALTER TABLE `agreementform`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_agreementform_user_id_users_id` (`user_id`),
  ADD KEY `fk_agreementform_guidance_id_users_id` (`guidance_id`),
  ADD KEY `fk_agreementform_schoolyear_id_schoolyear_id` (`schoolyear_id`),
  ADD KEY `fk_agreementform_case_note_id_casenote_id` (`case_note_id`),
  ADD KEY `fk_agreementform_called_slip_id_calledinslip_id` (`called_slip_id`);

--
-- Indexes for table `assessment`
--
ALTER TABLE `assessment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`assessment_form_id`),
  ADD KEY `fk_assessment_assessment_form_id_assessmentform_id` (`assessment_form_id`);

--
-- Indexes for table `assessmentform`
--
ALTER TABLE `assessmentform`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `schoolyear_id` (`schoolyear_id`,`category_name`);

--
-- Indexes for table `basicstatus`
--
ALTER TABLE `basicstatus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_basicstatus_basic_id_studentbasic_id` (`basic_id`);

--
-- Indexes for table `calledinslip`
--
ALTER TABLE `calledinslip`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_calledinslip_user_id_users_id` (`user_id`),
  ADD KEY `fk_calledinslip_guidance_id_users_id` (`guidance_id`),
  ADD KEY `fk_calledinslip_schoolyear_id_schoolyear_id` (`schoolyear_id`);

--
-- Indexes for table `casenote`
--
ALTER TABLE `casenote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_casenote_user_id_users_id` (`user_id`),
  ADD KEY `fk_casenote_guidance_id_users_id` (`guidance_id`),
  ADD KEY `fk_casenote_schoolyear_id_schoolyear_id` (`schoolyear_id`),
  ADD KEY `fk_casenote_called_slip_id_calledinslip_id` (`called_slip_id`);

--
-- Indexes for table `collegestatus`
--
ALTER TABLE `collegestatus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_collegestatus_college_id_studentcollege_id` (`college_id`);

--
-- Indexes for table `feedbackform`
--
ALTER TABLE `feedbackform`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_feedbackform_user_id_users_id` (`user_id`),
  ADD KEY `fk_feedbackform_guidance_id_users_id` (`guidance_id`),
  ADD KEY `fk_feedbackform_schoolyear_id_schoolyear_id` (`schoolyear_id`),
  ADD KEY `fk_feedbackform_case_note_id_casenote_id` (`case_note_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notification_user_id_users_id` (`user_id`);

--
-- Indexes for table `otptoken`
--
ALTER TABLE `otptoken`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_otptoken_user_id_users_id` (`user_id`);

--
-- Indexes for table `referralform`
--
ALTER TABLE `referralform`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_referralform_user_id_users_id` (`user_id`),
  ADD KEY `fk_referralform_guidance_id_users_id` (`guidance_id`),
  ADD KEY `fk_referralform_schoolyear_id_schoolyear_id` (`schoolyear_id`),
  ADD KEY `fk_referralform_case_note_id_casenote_id` (`case_note_id`),
  ADD KEY `fk_referralform_called_slip_id_calledinslip_id` (`called_slip_id`);

--
-- Indexes for table `schoolyear`
--
ALTER TABLE `schoolyear`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studentbasic`
--
ALTER TABLE `studentbasic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_studentbasic_user_id_users_id` (`user_id`),
  ADD KEY `fk_studentbasic_schoolyear_id_schoolyear_id` (`schoolyear_id`),
  ADD KEY `fk_studentbasic_student_profile_id_studentprofile_id` (`student_profile_id`);

--
-- Indexes for table `studentcollege`
--
ALTER TABLE `studentcollege`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_studentcollege_user_id_users_id` (`user_id`),
  ADD KEY `fk_studentcollege_schoolyear_id_schoolyear_id` (`schoolyear_id`),
  ADD KEY `fk_studentcollege_student_profile_id_studentprofile_id` (`student_profile_id`);

--
-- Indexes for table `studentprofile`
--
ALTER TABLE `studentprofile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agreementform`
--
ALTER TABLE `agreementform`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assessment`
--
ALTER TABLE `assessment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `assessmentform`
--
ALTER TABLE `assessmentform`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `basicstatus`
--
ALTER TABLE `basicstatus`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `calledinslip`
--
ALTER TABLE `calledinslip`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `casenote`
--
ALTER TABLE `casenote`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collegestatus`
--
ALTER TABLE `collegestatus`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `feedbackform`
--
ALTER TABLE `feedbackform`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otptoken`
--
ALTER TABLE `otptoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referralform`
--
ALTER TABLE `referralform`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schoolyear`
--
ALTER TABLE `schoolyear`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `studentbasic`
--
ALTER TABLE `studentbasic`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `studentcollege`
--
ALTER TABLE `studentcollege`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `studentprofile`
--
ALTER TABLE `studentprofile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agreementform`
--
ALTER TABLE `agreementform`
  ADD CONSTRAINT `fk_agreementform_called_slip_id_calledinslip_id` FOREIGN KEY (`called_slip_id`) REFERENCES `calledinslip` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_agreementform_case_note_id_casenote_id` FOREIGN KEY (`case_note_id`) REFERENCES `casenote` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_agreementform_guidance_id_users_id` FOREIGN KEY (`guidance_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_agreementform_schoolyear_id_schoolyear_id` FOREIGN KEY (`schoolyear_id`) REFERENCES `schoolyear` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_agreementform_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assessment`
--
ALTER TABLE `assessment`
  ADD CONSTRAINT `fk_assessment_assessment_form_id_assessmentform_id` FOREIGN KEY (`assessment_form_id`) REFERENCES `assessmentform` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_assessment_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assessmentform`
--
ALTER TABLE `assessmentform`
  ADD CONSTRAINT `fk_assessmentform_schoolyear_id_schoolyear_id` FOREIGN KEY (`schoolyear_id`) REFERENCES `schoolyear` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `basicstatus`
--
ALTER TABLE `basicstatus`
  ADD CONSTRAINT `fk_basicstatus_basic_id_studentbasic_id` FOREIGN KEY (`basic_id`) REFERENCES `studentbasic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `calledinslip`
--
ALTER TABLE `calledinslip`
  ADD CONSTRAINT `fk_calledinslip_guidance_id_users_id` FOREIGN KEY (`guidance_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_calledinslip_schoolyear_id_schoolyear_id` FOREIGN KEY (`schoolyear_id`) REFERENCES `schoolyear` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_calledinslip_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `casenote`
--
ALTER TABLE `casenote`
  ADD CONSTRAINT `fk_casenote_called_slip_id_calledinslip_id` FOREIGN KEY (`called_slip_id`) REFERENCES `calledinslip` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_casenote_guidance_id_users_id` FOREIGN KEY (`guidance_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_casenote_schoolyear_id_schoolyear_id` FOREIGN KEY (`schoolyear_id`) REFERENCES `schoolyear` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_casenote_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `collegestatus`
--
ALTER TABLE `collegestatus`
  ADD CONSTRAINT `fk_collegestatus_college_id_studentcollege_id` FOREIGN KEY (`college_id`) REFERENCES `studentcollege` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedbackform`
--
ALTER TABLE `feedbackform`
  ADD CONSTRAINT `fk_feedbackform_case_note_id_casenote_id` FOREIGN KEY (`case_note_id`) REFERENCES `casenote` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_feedbackform_guidance_id_users_id` FOREIGN KEY (`guidance_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_feedbackform_schoolyear_id_schoolyear_id` FOREIGN KEY (`schoolyear_id`) REFERENCES `schoolyear` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_feedbackform_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk_notification_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `otptoken`
--
ALTER TABLE `otptoken`
  ADD CONSTRAINT `fk_otptoken_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `referralform`
--
ALTER TABLE `referralform`
  ADD CONSTRAINT `fk_referralform_called_slip_id_calledinslip_id` FOREIGN KEY (`called_slip_id`) REFERENCES `calledinslip` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_referralform_case_note_id_casenote_id` FOREIGN KEY (`case_note_id`) REFERENCES `casenote` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_referralform_guidance_id_users_id` FOREIGN KEY (`guidance_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_referralform_schoolyear_id_schoolyear_id` FOREIGN KEY (`schoolyear_id`) REFERENCES `schoolyear` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_referralform_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `studentbasic`
--
ALTER TABLE `studentbasic`
  ADD CONSTRAINT `fk_studentbasic_schoolyear_id_schoolyear_id` FOREIGN KEY (`schoolyear_id`) REFERENCES `schoolyear` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentbasic_student_profile_id_studentprofile_id` FOREIGN KEY (`student_profile_id`) REFERENCES `studentprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentbasic_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `studentcollege`
--
ALTER TABLE `studentcollege`
  ADD CONSTRAINT `fk_studentcollege_schoolyear_id_schoolyear_id` FOREIGN KEY (`schoolyear_id`) REFERENCES `schoolyear` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentcollege_student_profile_id_studentprofile_id` FOREIGN KEY (`student_profile_id`) REFERENCES `studentprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentcollege_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
