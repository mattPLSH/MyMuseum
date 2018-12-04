-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 04, 2018 at 07:25 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mymuseum`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `favoriteid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `artid` varchar(200) NOT NULL,
  `imgurl` varchar(200) NOT NULL,
  `author` varchar(60) DEFAULT NULL,
  `title` varchar(60) DEFAULT NULL,
  `date` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`favoriteid`, `userid`, `artid`, `imgurl`, `author`, `title`, `date`) VALUES
(1, 4, '515cc2bcb5907b33b10001c2', 'https://d32dm0rphc51dk.cloudfront.net/Y3tlpvdXGTMJ3J9LvuZoVg/medium.jpg', '\" \" 00100011 0331Ñ 0331Ñ and Grisha ', 'Christ Carrying the Cross', '1512'),
(2, 4, '515b9656cd4b8ef7fd000ebb', 'https://d32dm0rphc51dk.cloudfront.net/VDg1koD6QR8KGxzww32KUw/medium.jpg', '\" \" 00100011 0331Ñ 0331Ñ and Grisha ', 'Landscape with Travelers', ''),
(3, 4, '515ccb25b5907b33b1000553', 'https://d32dm0rphc51dk.cloudfront.net/A2DpBwo_DLG8Gaci_NuKkA/medium.jpg', '\" \" 00100011 0331Ñ 0331Ñ and Grisha ', 'Damophila amabilis (Blue-breasted Hummingbird)', ''),
(4, 3, '515d026d7696593fde00208c', 'https://d32dm0rphc51dk.cloudfront.net/-UuawuOmx-kQ8R-hlL7CNw/medium.jpg', '\" \" 00100011 0331Ñ 0331Ñ and Grisha ', 'Fortitude', ''),
(5, 3, '516cb955078b321478000f12', 'https://d32dm0rphc51dk.cloudfront.net/udPmTNJJCiwU9O3ryu4O_Q/medium.jpg', '\" \" 00100011 0331Ñ 0331Ñ and Grisha ', 'Guillaume de Lamoignon', '1676'),
(6, 3, '53288d130bb6d6e860000820', 'https://d32dm0rphc51dk.cloudfront.net/_ymcYBoNeoNt8QKKrra0qw/medium.jpg', '\" \" 00100011 0331Ñ 0331Ñ and Grisha ', 'Combat with Dagger', '1410'),
(7, 3, '515b31d505635113a5001b6f', 'https://d32dm0rphc51dk.cloudfront.net/UwWkYFArUHVe8OxCf_Pofg/medium.jpg', NULL, 'Ecce Homo', '1522');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `usertype` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `password`, `usertype`) VALUES
(1, 'trev', 'pass1', 1),
(2, 'trev2', 'pass1', 1),
(3, 'admin', 'soopersafepswd', 0),
(4, 'trev3', '3', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`favoriteid`),
  ADD KEY `FK_Favorites_User` (`userid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `favoriteid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FK_Favorites_User` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
