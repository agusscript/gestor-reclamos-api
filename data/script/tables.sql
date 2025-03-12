-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Server: 127.0.0.1
-- Generation Time: 2024-08-29 at 03:43:20
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `complaint`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `total_complaint_status` (OUT `description` CHAR, OUT `quantity` INT)
SELECT cs.description, count(c.id) as quantity
FROM `complaint` as c
INNER JOIN `complaint_status` AS cs ON cs.id = c.idComplaintStatus
GROUP by cs.description$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `idComplaintType` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `id` int(11) NOT NULL,
  `subject` varchar(256) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `createdDate` datetime NOT NULL,
  `finishedDate` datetime DEFAULT NULL,
  `canceledDate` datetime DEFAULT NULL,
  `idComplaintStatus` int(11) NOT NULL,
  `idComplaintType` int(11) NOT NULL,
  `idCreatorUser` int(11) NOT NULL,
  `idFinisherUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `complaint_status`
--

CREATE TABLE `complaint_status` (
  `id` int(11) NOT NULL,
  `description` varchar(256) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `complaint_type`
--

CREATE TABLE `complaint_type` (
  `id` int(11) NOT NULL,
  `description` varchar(256) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `lastname` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `idUserType` int(11) NOT NULL,
  `image` varchar(256) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_office`
--

CREATE TABLE `user_office` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idOffice` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `description` varchar(256) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `office_fk2` (`idComplaintType`);

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `complaint_fk6` (`idComplaintStatus`),
  ADD KEY `complaint_fk7` (`idComplaintType`),
  ADD KEY `complaint_fk8` (`idCreatorUser`),
  ADD KEY `complaint_fk9` (`idFinisherUser`);

--
-- Indexes for table `complaint_status`
--
ALTER TABLE `complaint_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `complaint_type`
--
ALTER TABLE `complaint_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_fk5` (`idUserType`);

--
-- Indexes for table `user_office`
--
ALTER TABLE `user_office`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `userOffice_fk1` (`idUser`),
  ADD KEY `userOffice_fk2` (`idOffice`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `complaint`
--
ALTER TABLE `complaint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `complaint_status`
--
ALTER TABLE `complaint_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `complaint_type`
--
ALTER TABLE `complaint_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_office`
--
ALTER TABLE `user_office`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `office`
--
ALTER TABLE `office`
  ADD CONSTRAINT `office_fk2` FOREIGN KEY (`idComplaintType`) REFERENCES `complaint_type` (`id`);

--
-- Constraints for table `complaint`
--
ALTER TABLE `complaint`
  ADD CONSTRAINT `complaint_fk6` FOREIGN KEY (`idComplaintStatus`) REFERENCES `complaint_status` (`id`),
  ADD CONSTRAINT `complaint_fk7` FOREIGN KEY (`idComplaintType`) REFERENCES `complaint_type` (`id`),
  ADD CONSTRAINT `complaint_fk8` FOREIGN KEY (`idCreatorUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `complaint_fk9` FOREIGN KEY (`idFinisherUser`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_fk5` FOREIGN KEY (`idUserType`) REFERENCES `user_type` (`id`);

--
-- Constraints for table `user_office`
--
ALTER TABLE `user_office`
  ADD CONSTRAINT `userOffice_fk1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `userOffice_fk2` FOREIGN KEY (`idOffice`) REFERENCES `office` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
