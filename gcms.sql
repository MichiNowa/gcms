-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2024 at 05:19 AM
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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminID` int(11) NOT NULL,
  `adminuser` varchar(30) NOT NULL,
  `adminpass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assessmentform`
--

CREATE TABLE `assessmentform` (
  `assessmentID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `questID` int(11) NOT NULL,
  `answer` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `calledslip`
--

CREATE TABLE `calledslip` (
  `calledID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `studentfname` varchar(30) NOT NULL,
  `studentlname` varchar(30) NOT NULL,
  `formdate` date NOT NULL,
  `scheduledate` date NOT NULL,
  `scheduletime` time NOT NULL,
  `remarks` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `casenotes`
--

CREATE TABLE `casenotes` (
  `caseID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `studentfname` varchar(30) NOT NULL,
  `studentlname` varchar(30) NOT NULL,
  `casedate` date NOT NULL,
  `casetime` time NOT NULL,
  `casepax` varchar(30) NOT NULL,
  `casetype` varchar(30) NOT NULL,
  `caseproblem` text NOT NULL,
  `casesolution` text NOT NULL,
  `casedecision` text NOT NULL,
  `caseobservation` text NOT NULL,
  `contractID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contractform`
--

CREATE TABLE `contractform` (
  `contractID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `studentfname` varchar(30) NOT NULL,
  `studentlname` varchar(30) NOT NULL,
  `contractdate` date NOT NULL,
  `imageID` int(11) NOT NULL,
  `calledID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `educID` int(11) NOT NULL,
  `profileID` int(11) DEFAULT NULL,
  `doctoralprogram` varchar(50) DEFAULT NULL,
  `doctoralschool` varchar(50) DEFAULT NULL,
  `doctoralyear` varchar(50) DEFAULT NULL,
  `doctoralhonors` varchar(50) DEFAULT NULL,
  `masteralprogram` varchar(50) DEFAULT NULL,
  `masteralschool` varchar(50) DEFAULT NULL,
  `masteralyear` varchar(50) DEFAULT NULL,
  `masteralhonors` varchar(50) DEFAULT NULL,
  `collegeprogram` varchar(50) DEFAULT NULL,
  `collegeschool` varchar(50) DEFAULT NULL,
  `collegeyear` varchar(50) DEFAULT NULL,
  `collegehonors` varchar(50) DEFAULT NULL,
  `techvocschool` varchar(50) DEFAULT NULL,
  `techvocyear` varchar(50) DEFAULT NULL,
  `techvochonors` varchar(50) DEFAULT NULL,
  `highschoolschool` varchar(50) DEFAULT NULL,
  `highschoolyear` varchar(50) DEFAULT NULL,
  `highschoolhonors` varchar(50) DEFAULT NULL,
  `alsschool` varchar(50) DEFAULT NULL,
  `alsyear` varchar(50) DEFAULT NULL,
  `alshonors` varchar(50) DEFAULT NULL,
  `elemschool` varchar(50) DEFAULT NULL,
  `elemyear` varchar(50) DEFAULT NULL,
  `elemhonors` varchar(50) DEFAULT NULL,
  `studiessupport` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `family`
--

CREATE TABLE `family` (
  `familyID` int(11) NOT NULL,
  `profileID` int(11) DEFAULT NULL,
  `numberathome` int(11) DEFAULT NULL,
  `numberofchildren` int(11) DEFAULT NULL,
  `homelife` varchar(50) DEFAULT NULL,
  `workathome` varchar(50) DEFAULT NULL,
  `whatwork` varchar(50) DEFAULT NULL,
  `sleeptime` time DEFAULT NULL,
  `discipline` varchar(50) DEFAULT NULL,
  `disciplinetype` varchar(50) DEFAULT NULL,
  `friends` varchar(100) DEFAULT NULL,
  `subjectlikes` varchar(100) DEFAULT NULL,
  `likeswhy` varchar(100) DEFAULT NULL,
  `subjecthate` varchar(100) DEFAULT NULL,
  `hatewhy` varchar(100) DEFAULT NULL,
  `leadership` varchar(10) DEFAULT NULL,
  `honor` varchar(100) DEFAULT NULL,
  `hobbies` varchar(100) DEFAULT NULL,
  `enjoy` varchar(100) DEFAULT NULL,
  `organization` varchar(50) DEFAULT NULL,
  `mannerism` varchar(50) DEFAULT NULL,
  `operation` varchar(50) DEFAULT NULL,
  `allergies` varchar(50) DEFAULT NULL,
  `indigenous` varchar(50) DEFAULT NULL,
  `indigenousspecify` varchar(50) DEFAULT NULL,
  `differentlyabled` varchar(50) DEFAULT NULL,
  `differentlyspecify` varchar(50) DEFAULT NULL,
  `soloparent` varchar(50) DEFAULT NULL,
  `soloparentspecify` varchar(50) DEFAULT NULL,
  `imageID` int(11) DEFAULT NULL,
  `profiledate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedbackID` int(11) NOT NULL,
  `studentID` int(11) DEFAULT NULL,
  `caseID` int(11) DEFAULT NULL,
  `a1` int(1) DEFAULT NULL,
  `a2` int(1) DEFAULT NULL,
  `a3` int(1) DEFAULT NULL,
  `a4` int(1) DEFAULT NULL,
  `a5` int(1) DEFAULT NULL,
  `a6` int(1) DEFAULT NULL,
  `a7` int(1) DEFAULT NULL,
  `a8` int(1) DEFAULT NULL,
  `a9` int(1) DEFAULT NULL,
  `a10` int(1) DEFAULT NULL,
  `b11` int(1) DEFAULT NULL,
  `b12` int(1) DEFAULT NULL,
  `c13` int(1) DEFAULT NULL,
  `c14` int(1) DEFAULT NULL,
  `d15` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `health`
--

CREATE TABLE `health` (
  `healthID` int(11) NOT NULL,
  `profileID` int(11) DEFAULT NULL,
  `frequentcolds` tinyint(1) DEFAULT NULL,
  `chickenpox` tinyint(1) DEFAULT NULL,
  `migraine` tinyint(1) DEFAULT NULL,
  `soreeyes` tinyint(1) DEFAULT NULL,
  `poorsleep` tinyint(1) DEFAULT NULL,
  `pneumonia` tinyint(1) DEFAULT NULL,
  `cough` tinyint(1) DEFAULT NULL,
  `sorethroats` tinyint(1) DEFAULT NULL,
  `measles` tinyint(1) DEFAULT NULL,
  `vision` tinyint(1) DEFAULT NULL,
  `heart` tinyint(1) DEFAULT NULL,
  `polio` tinyint(1) DEFAULT NULL,
  `ear` tinyint(1) DEFAULT NULL,
  `typhoid` tinyint(1) DEFAULT NULL,
  `kidney` tinyint(1) DEFAULT NULL,
  `epilepsy` tinyint(1) DEFAULT NULL,
  `asthma` tinyint(1) DEFAULT NULL,
  `restlessness` tinyint(1) DEFAULT NULL,
  `others` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `imageform`
--

CREATE TABLE `imageform` (
  `imageID` int(11) NOT NULL,
  `imagename` varchar(30) DEFAULT NULL,
  `imagepath` varchar(30) DEFAULT NULL,
  `imagetype` varchar(30) DEFAULT NULL,
  `syID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `to_user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `from_user_id` int(11) DEFAULT NULL,
  `read_status` int(11) DEFAULT NULL,
  `called_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `parental`
--

CREATE TABLE `parental` (
  `parentalID` int(11) NOT NULL,
  `profileID` int(11) DEFAULT NULL,
  `fathername` varchar(30) DEFAULT NULL,
  `fathernumber` varchar(30) DEFAULT NULL,
  `fatheroccupation` varchar(30) DEFAULT NULL,
  `fatheremployment` varchar(30) DEFAULT NULL,
  `fathereducation` varchar(30) DEFAULT NULL,
  `fatheraddress` varchar(100) DEFAULT NULL,
  `mothername` varchar(30) DEFAULT NULL,
  `mothernumber` varchar(30) DEFAULT NULL,
  `motheroccupation` varchar(30) DEFAULT NULL,
  `motheremployment` varchar(30) DEFAULT NULL,
  `mothereducation` varchar(30) DEFAULT NULL,
  `motheraddress` varchar(100) DEFAULT NULL,
  `parentstatus` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `questID` int(11) NOT NULL,
  `questdetails` text DEFAULT NULL,
  `questcategory` varchar(100) DEFAULT NULL,
  `syID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referralform`
--

CREATE TABLE `referralform` (
  `referralID` int(11) NOT NULL,
  `studentID` int(11) DEFAULT NULL,
  `studentfname` varchar(30) DEFAULT NULL,
  `studentlname` varchar(30) DEFAULT NULL,
  `referraldate` date DEFAULT NULL,
  `imageID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schoolyear`
--

CREATE TABLE `schoolyear` (
  `syID` int(11) NOT NULL,
  `sy1` int(11) DEFAULT NULL,
  `sy2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sibling`
--

CREATE TABLE `sibling` (
  `siblingID` int(11) NOT NULL,
  `profileID` int(11) DEFAULT NULL,
  `siblingname` varchar(50) DEFAULT NULL,
  `siblingage` int(11) DEFAULT NULL,
  `siblingoccupation` varchar(50) DEFAULT NULL,
  `siblingeducation` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `studentprofile`
--

CREATE TABLE `studentprofile` (
  `profileID` int(11) NOT NULL,
  `studentID` int(11) DEFAULT NULL,
  `imageID` int(11) DEFAULT NULL,
  `semester` varchar(30) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `gender` varchar(30) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `citizenship` varchar(30) DEFAULT NULL,
  `contactnumber` varchar(30) DEFAULT NULL,
  `religion` varchar(30) DEFAULT NULL,
  `bloodtype` varchar(3) DEFAULT NULL,
  `height` varchar(10) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `emergperson` varchar(30) DEFAULT NULL,
  `emergnumber` varchar(30) DEFAULT NULL,
  `emergrelation` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `studentID` int(11) NOT NULL,
  `schoolID` varchar(20) DEFAULT NULL,
  `studentfname` varchar(30) DEFAULT NULL,
  `studentmname` varchar(30) DEFAULT NULL,
  `studentlname` varchar(30) DEFAULT NULL,
  `studentlevel` varchar(30) DEFAULT NULL,
  `studentsection` varchar(30) DEFAULT NULL,
  `studentadviser` varchar(30) DEFAULT NULL,
  `syID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `superuser`
--

CREATE TABLE `superuser` (
  `superID` int(11) NOT NULL,
  `superuser` varchar(30) DEFAULT NULL,
  `superpass` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `tempID` int(11) NOT NULL,
  `studentID` int(11) DEFAULT NULL,
  `temptoken` varchar(6) DEFAULT NULL,
  `temptime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `studentid` varchar(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `profpic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `studentid`, `fname`, `lname`, `email`, `pass`, `profpic`) VALUES
(1, '202150179', 'Michi Nowa', 'Bataluna', 'michinowa_bataluna@smccnasipit.edu.ph', 'f5f611f43b3d8ef59e85c693c4a02097', '4b85883ea99412274a18ceab5d66c9e0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminID`);

--
-- Indexes for table `assessmentform`
--
ALTER TABLE `assessmentform`
  ADD PRIMARY KEY (`assessmentID`);

--
-- Indexes for table `calledslip`
--
ALTER TABLE `calledslip`
  ADD PRIMARY KEY (`calledID`);

--
-- Indexes for table `casenotes`
--
ALTER TABLE `casenotes`
  ADD PRIMARY KEY (`caseID`);

--
-- Indexes for table `contractform`
--
ALTER TABLE `contractform`
  ADD PRIMARY KEY (`contractID`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`educID`);

--
-- Indexes for table `family`
--
ALTER TABLE `family`
  ADD PRIMARY KEY (`familyID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedbackID`);

--
-- Indexes for table `health`
--
ALTER TABLE `health`
  ADD PRIMARY KEY (`healthID`);

--
-- Indexes for table `imageform`
--
ALTER TABLE `imageform`
  ADD PRIMARY KEY (`imageID`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parental`
--
ALTER TABLE `parental`
  ADD PRIMARY KEY (`parentalID`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`questID`);

--
-- Indexes for table `referralform`
--
ALTER TABLE `referralform`
  ADD PRIMARY KEY (`referralID`);

--
-- Indexes for table `schoolyear`
--
ALTER TABLE `schoolyear`
  ADD PRIMARY KEY (`syID`);

--
-- Indexes for table `sibling`
--
ALTER TABLE `sibling`
  ADD PRIMARY KEY (`siblingID`);

--
-- Indexes for table `studentprofile`
--
ALTER TABLE `studentprofile`
  ADD PRIMARY KEY (`profileID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentID`);

--
-- Indexes for table `superuser`
--
ALTER TABLE `superuser`
  ADD PRIMARY KEY (`superID`);

--
-- Indexes for table `temp`
--
ALTER TABLE `temp`
  ADD PRIMARY KEY (`tempID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
