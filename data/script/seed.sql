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

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`id`, `name`, `idComplaintType`, `active`) VALUES
(1, 'Dpto. de Taller y Servicio Técnico', 1, 1),
(2, 'Dpto. de Garantías', 4, 1),
(3, 'Dpto. de Repuestos y Partes', 6, 1),
(4, 'Dpto. de Facturación', 9, 1);

-- --------------------------------------------------------

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`id`, `subject`, `description`, `createdDate`, `finishedDate`, `canceledDate`, `idComplaintStatus`, `idComplaintType`, `idCreatorUser`, `idFinisherUser`) VALUES
(5, 'ruido en motor', NULL, '2024-08-19 06:00:00', NULL, NULL, 1, 1, 9, NULL),
(6, 'rotura de motor', NULL, '2024-08-19 07:00:00', NULL, NULL, 4, 1, 8, NULL),
(7, 'no frena', NULL, '2024-08-15 07:15:00', NULL, NULL, 1, 2, 8, NULL),
(8, 'ruidos extraños', NULL, '2024-08-15 08:00:00', NULL, NULL, 1, 3, 7, NULL),
(9, 'cristales rayados', NULL, '2024-08-15 09:30:00', NULL, NULL, 1, 4, 7, NULL),
(10, 'matafuego vencido', NULL, '2024-08-15 09:00:00', NULL, NULL, 2, 4, 7, NULL),
(11, 'suspensión lado izq fallada', NULL, '2024-08-15 15:00:00', NULL, NULL, 2, 3, 8, NULL),
(15, 'falla tren delantero', 'empece a notar ruidos molestos', '2024-08-28 19:26:12', NULL, NULL, 1, 1, 9, NULL);

-- --------------------------------------------------------

--
-- Dumping data for table `complaint_status`
--

INSERT INTO `complaint_status` (`id`, `description`, `active`) VALUES
(1, 'Creado', 1),
(2, 'En Proceso', 1),
(3, 'Cancelado', 1),
(4, 'Finalizado', 1);

-- --------------------------------------------------------

--
-- Dumping data for table `complaint_type`
--

INSERT INTO `complaint_type` (`id`, `description`, `active`) VALUES
(1, 'Falla de motor', 1),
(2, 'Falla de frenos', 1),
(3, 'Falla de suspensión', 1),
(4, 'Aprobación de cobertura', 1),
(5, 'Verificación de términos', 1),
(6, 'Reemplazo de piezas', 1),
(7, 'Reinstalación correcta', 0),
(9, 'Reembolso', 1);

-- --------------------------------------------------------

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `lastname`, `email`, `password`, `idUserType`, `image`, `active`) VALUES
(1, 'Agustin', 'Sanchez', 'agus@gmail.com', '$2b$10$7HtSXlZz6PA3Ls.prypvu.XxHze2K4wkyVEBGio2zOA7WC4HHtDDa', 1, NULL, 1),
(2, 'Lara', 'Alegre', 'lara@gmail.com', '$2b$10$rZeI4w236ysneDwwhEFL8uRRQ2fGpOFTR3Ah0U3u2bNuxpEar7vp6', 1, NULL, 1),
(3, 'Lucas', 'Ruiz', 'lucas@gmail.com', '$2b$10$8nFCGXQMjjOoJ2QGXCDpA.MeRWYzHiPQRbDFuoMZtVqY1.D6KR.NG', 2, NULL, 1),
(4, 'Julian', 'Annoni', 'julian@gmail.com', '$2b$10$Dy04i3WU1T.eg/EHBPfjE./aaaX.xpL5qJYEQq.a.uCUxaXansqNq', 2, NULL, 1),
(5, 'Giovanni', 'Percara', 'gio@gmail.com', '$2b$10$rQf8ptHHdAxrvdKBfbdLN.K80G6l2tvR6tITEVM/foCfiDOm7TmPm', 3, NULL, 1),
(6, 'Daniela', 'Sanchez', 'daniela@gmail.com', '$2b$10$ThoYGvlZJI/jGmhocCr3a.zS0nAevlmiKtbTLavz69N5Q/O6fqLX6', 3, NULL, 1),
(7, 'Cristian', 'Faure', 'cristian.faure@uner.edu.ar', '$2b$10$ThoYGvlZJI/jGmhocCr3a.zS0nAevlmiKtbTLavz69N5Q/O6fqLX6', 3, NULL, 1),
(8, 'Ignacio', 'Novello', 'ignacio.novello@uner.edu.ar', '$2b$10$ekbE.gKz9gdercHiRVAN4uv7ZtuY/BDhePBTux3EczyV05iB3RXHy', 3, NULL, 1),
(9, 'Pipo', 'Gorosito', 'pipo@gmail.com', '$2b$10$qfCGIE4ClfGj6iuRgo8eFeU8igAOnSeQR09u1aTdF.KiIESkDOT16', 3, NULL, 1),
(10, 'Cliente', '1', 'test1@gmail.com', '$2b$10$UNCfoUEg4bbTpkocfd0lo.lviV//wfwYYtwjbAb8puKNxXvFDUQt6', 3, NULL, 1),
(11, 'Cliente', '2', 'test2@gmail.com', '$2b$10$vLEuzrlyxG6dF9.8vGO.cOmdj31LS4xu1L3oEpY2wMV6BU5B7vpCq', 3, NULL, 1),
(12, 'Empleado', '1', 'test3@gmail.com', '$2b$10$0b4zj0TeQ3mCe2.y9rE7BOkFiszpT8M4fMQinwq/GKDv6bVawFhqC', 2, NULL, 1),
(13, 'Empleado', '2', 'test4@gmail.com', '$2b$10$rNrJNlwTX5JDeRH6gATL7edw217ED0IRRo5wzk4mLXoCqcbQONrd.', 2, NULL, 1),
(14, 'Administrador', '1', 'test5@gmail.com', '$2b$10$8Wz.3RPwVhRRzjXnypvRNud4SObYxlWETDFHpf2z2L0AH7f1s3RNW', 1, NULL, 1),
(15, 'Administrador', '2', 'test6@gmail.com', '$2b$10$fJo2A74wKWJoP9XWbaE7OO1bMKq4S2moIhrtbnZ0hBA1wg5bV0oPu', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Dumping data for table `user_office`
--

INSERT INTO `user_office` (`id`, `idUser`, `idOffice`, `active`) VALUES
(1, 3, 1, 1),
(2, 4, 2, 1),
(3, 8, 3, 1),
(4, 9, 4, 1);

-- --------------------------------------------------------

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `description`, `active`) VALUES
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Cliente', 1);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
