-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2021 at 09:06 PM
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
  `reason` varchar(128) NOT NULL,
  `isFinished` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(28, 'User', 'User', 'B', 'CS', 2, 8, '88888', 'Screenshot(20).jpg'),
(29, 'ivan', 'ivan', 'B', 'mat', 1, 1, '81611', 'Screenshot (4).png');

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
  `id` int(11) NOT NULL,
  `isFinished` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `waiting_room`
--
ALTER TABLE `waiting_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
