-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2021 at 11:29 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `virtualwaitingroom`
--

-- --------------------------------------------------------

--
-- Table structure for table `meet_record`
--

CREATE TABLE `meet_record` (
  `roomID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `meetTime` datetime NOT NULL,
  `reason` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `meet_record`
--

INSERT INTO `meet_record` (`roomID`, `studentID`, `meetTime`, `reason`) VALUES
(3, 28, '2021-01-27 11:42:57', 'Изпит');

-- --------------------------------------------------------

--
-- Table structure for table `students_info`
--

CREATE TABLE `students_info` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(64) NOT NULL,
  `lastName` varchar(64) NOT NULL,
  `degree` varchar(32) NOT NULL,
  `speciality` varchar(32) NOT NULL,
  `course` int(11) DEFAULT NULL,
  `groupe` int(11) DEFAULT NULL,
  `facultyNumber` varchar(16) NOT NULL,
  `Image` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `students_info`
--

INSERT INTO `students_info` (`userID`, `firstName`, `lastName`, `degree`, `speciality`, `course`, `groupe`, `facultyNumber`, `Image`) VALUES
(28, 'User', 'User', 'B', 'CS', 2, 8, '88888', 'Screenshot (4).png');

-- --------------------------------------------------------

--
-- Table structure for table `teachers_info`
--

CREATE TABLE `teachers_info` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(64) NOT NULL,
  `lastName` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teachers_info`
--

INSERT INTO `teachers_info` (`userID`, `firstName`, `lastName`) VALUES
(27, 'Teacher', 'Teacher');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `userName` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(128) NOT NULL,
  `userType` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `userName`, `password`, `email`, `userType`) VALUES
(27, 'admin', '$2y$10$YCWi7ByYR9M2h1nT8wHdc.ZCkyDtG./4fHfBk4LaOlNcIuUorJlPK', 'admin@gmail.com', 'Teacher'),
(28, 'user99', '$2y$10$oFq7q/q/XbCycdPKrVnOy.fWO7K1z8/nZVAAzSgMWO1AkxZy4UuqK', 'user@gmail.com', 'Student');

-- --------------------------------------------------------

--
-- Table structure for table `waiting_room`
--

CREATE TABLE `waiting_room` (
  `teacherID` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `subject` varchar(64) NOT NULL,
  `avgDuration` int(11) NOT NULL,
  `message` varchar(512) DEFAULT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `meetType` tinyint(1) NOT NULL,
  `address` varchar(256) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `waiting_room`
--

INSERT INTO `waiting_room` (`teacherID`, `title`, `subject`, `avgDuration`, `message`, `startTime`, `endTime`, `meetType`, `address`, `id`) VALUES
(27, 'Изпит', 'WEB Технологии', 15, '', '2021-01-27 12:30:00', '2021-01-27 17:30:00', 0, 'https://meet.google.com/yon-myik-vvy', 3),
(27, 'Консултация за проект', 'WEB Технологии', 15, '', '2021-01-27 09:30:00', '2021-01-27 12:30:00', 0, 'https://meet.google.com/yon-myik-vvy', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students_info`
--
ALTER TABLE `students_info`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `waiting_room`
--
ALTER TABLE `waiting_room`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `waiting_room`
--
ALTER TABLE `waiting_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
