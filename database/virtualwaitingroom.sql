-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2021 at 11:09 AM
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
(1, 'sg', 'sdfsdf', 'B', 'mat', 1, 1, '81611', 'Screenshot (13).png'),
(2, 'Iwan', 'Ivan', 'B', 'mat', 1, 1, '81611', 'Screenshot (18).png'),
(18, '324324', '234324', 'B', 'mat', 1, 1, '23434', NULL);

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
(1, 'ivan45', '$2y$10$VB.RUwanSB9Eaha0GB8reOBlaF2kiJhDI6x99QNOKPBoyqvfMgfT2', 'ggb98@abv.bg', 'Student'),
(2, 'ivan454', '$2y$10$cYizTtsYj2VWvKxCZNLRhunpfijyunLNrrwxCOAIsnKirf8gBWpue', 'ggb98@abv.bg', 'Student'),
(3, 'ivan4544', '$2y$10$NZSJpMiVsqF4IDKhfpt4d.XaPJoDP0YWL/EymRd7QfnbpT524LFai', 'ggb98@abv.bg', 'Student'),
(5, 'dsfdssdf', '$2y$10$BuqDbj.dOtLAERft2K/UAu4VmQ5FhFwWp.BJEHlRUFiyX3FI3.44S', 'ggb98@abv.bg', 'Student'),
(6, 'dsfdssdfsdf', '$2y$10$Hq.YnyPrlo8giZq/wf6/M.4ykvTpIvuqW4Y/Q6b.zjGT96exO45DG', 'ggb98@abv.bg', 'Student'),
(7, 'dsfdssdfsdfsad', '$2y$10$dv2WQF1uukcvKtLOADf7quEyXx7/./pJM1Cl9VB0JJBHPrMnakP9y', 'ggb98@abv.bg', 'Student'),
(8, 'dsfdssdfsdfsadzdcf', '$2y$10$wcKHVT0jBVZF03IWBD/tF.ipwP609UV06.70Er/bI9IGupC.aCv2.', 'ggb98@abv.bg', 'Student'),
(9, 'asfsdf', '$2y$10$K0gMgB6ywwsxHTpth3o2iefH/lD1Co28.6kDva3lkYZLgvQfhp5my', 'ggb98@abv.bg', 'Student'),
(10, 'sedfsdfsdf', '$2y$10$XNa3q1Z0walVW5t54scSO.oHDsAfEYICwmyyy.FuTBfXFTgA863pq', 'ggb98@abv.bg', 'Student'),
(11, 'dsfsdfgdsg', '$2y$10$kzHtbJZ3RopbbpvUaj.BROQ4qm5WsuDkcepVv1XtXFmccfX13HoJy', 'ggb98@abv.bg', 'Student'),
(12, 'ivan75', '$2y$10$Rk/KPUXP6wGyZVVZdTZip.1CqIhFoLHGjPWKbADalvPIz8jKvjScW', 'ggb98@abv.bg', 'Student'),
(13, 'srxdtcfyvgubhinj', '$2y$10$OOGQZLBcIjF.YhUMsQkcOegO50MbduY0UMhDBdJdA5vbAfe/Lp9vG', 'ggb98@abv.bg', 'Student'),
(14, 'jkbhihb', '$2y$10$aOjQUp2KHX7Ue3Io58hRkuYl.OA9Gbh2D/CaS4ODXDcn07S.nk46G', 'ggb98@abv.bg', 'Student'),
(15, 'srxdtcfyvgu', '$2y$10$nLu0Zjcaqfn6hUdnWGmc7exOs4VPMSDn0SrQVNMfb2QfrQqjqdoNO', 'ggb98@abv.bg', 'Student'),
(16, 'nkbhb55', '$2y$10$eaQ/jj0oqR53KTg8Mg70DuWux6Vjx3IxOLo9s1TKRoElwR73zrzjC', 'ggb98@abv.bg', 'Student'),
(17, 'sdfsdfsd', '$2y$10$clsQarEKoDBR264W9f7n7udl/aQMy8dSKOsz9O/ldmcx6jyw11xDO', 'ggb98@abv.bg', 'Student'),
(18, 'georgi12', '$2y$10$ZqJikORbeIkE3ym2xB4YWu858kOKfeIIRjzQCF/4yINl7pt3yQ0z.', 'ggb98@abv.bg', 'Student');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
