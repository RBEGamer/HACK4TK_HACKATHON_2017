-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 27. Jun 2017 um 11:29
-- Server Version: 5.5.55-0+deb8u1
-- PHP-Version: 5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `hack4tk`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `companies`
--

CREATE TABLE IF NOT EXISTS `companies` (
`id` int(11) NOT NULL,
  `company_name` text,
  `contact_name` text NOT NULL,
  `contact_phone` text NOT NULL,
  `company_location` text NOT NULL,
  `long` float NOT NULL,
  `company_lat` float NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='last';

--
-- Daten für Tabelle `companies`
--

INSERT INTO `companies` (`id`, `company_name`, `contact_name`, `contact_phone`, `company_location`, `long`, `company_lat`) VALUES
(1, 'Area 51 Inc', 'Sensoria HelpsYou', '2024561111', 'Area51', -111.901, 40.7594),
(2, 'Thyssenkrupp Quartier', 'Dr.-Ing. Heinrich Hiesinger', '00492018440', 'ThyssenKrupp Allee 1, 45143 Essen, Deutschland', 51.4623, 6.99032);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `machines`
--

CREATE TABLE IF NOT EXISTS `machines` (
`id` int(11) NOT NULL,
  `name` text NOT NULL,
  `location` text NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `machines`
--

INSERT INTO `machines` (`id`, `name`, `location`, `company_id`) VALUES
(1, 'VertikalMuehle', 'MalzSilo', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensors`
--

CREATE TABLE IF NOT EXISTS `sensors` (
`id` int(11) NOT NULL,
  `sensor_type` enum('TEMP','PRESSURE','VOLTAGE','CURRENT','RPM','NOT_SPECIFIED','HUM') NOT NULL DEFAULT 'NOT_SPECIFIED',
  `suid` text NOT NULL,
  `value` float NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `machine_id` int(11) NOT NULL,
  `min_value` float NOT NULL,
  `max_value` float NOT NULL,
  `warning_limit` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `sensors`
--

INSERT INTO `sensors` (`id`, `sensor_type`, `suid`, `value`, `last_update`, `machine_id`, `min_value`, `max_value`, `warning_limit`) VALUES
(11, 'TEMP', 'tempSensor', 23.4428, '2017-06-26 21:04:35', 1, 10, 90, 0),
(12, 'HUM', 'humSensor', 60.7, '2017-06-26 21:04:45', 1, 30, 80, 0),
(13, 'TEMP', 'tempSensor', 23.4428, '2017-06-26 21:13:59', 1, 10, 90, 0),
(14, 'HUM', 'humSensor', 60.7, '2017-06-26 21:14:09', 1, 30, 80, 0),
(15, 'TEMP', 'tempSensor', 34.4216, '2017-06-26 21:47:29', 1, 10, 90, 0),
(16, 'HUM', 'humSensor', 75.4351, '2017-06-26 21:47:39', 1, 30, 80, 0),
(17, 'TEMP', 'tempSensor', 23.4428, '2017-06-26 22:16:13', 1, 10, 90, 0),
(18, 'HUM', 'humSensor', 60.7, '2017-06-26 22:16:23', 1, 30, 80, 0),
(19, 'TEMP', 'tempSensor', 34.4216, '2017-06-26 22:49:43', 1, 10, 90, 0),
(20, 'HUM', 'humSensor', 75.4351, '2017-06-26 22:49:53', 1, 30, 80, 0),
(23, 'TEMP', 'tempSensor', 31.7453, '2017-06-26 23:23:13', 1, 10, 90, 0),
(24, 'HUM', 'humSensor', 67.985, '2017-06-26 23:23:23', 1, 30, 80, 0),
(25, 'TEMP', 'tempSensor', 3, '2017-06-27 06:02:51', 2, 10, 90, 0),
(26, 'TEMP', 'tempSensor', 300, '2017-06-27 06:03:18', 2, 10, 90, 0),
(27, 'TEMP', 'tempSensor', 12, '2017-06-27 08:48:03', 1, 10, 90, 0),
(28, '', 'tempSensor', 0, '2017-06-27 08:49:36', 1, -1, 10000, 1),
(29, '', 'tempSensor', 0, '2017-06-27 08:49:36', 1, -1, 10000, 0),
(30, 'TEMP', 'tempSensor', 23.4428, '2017-06-27 08:53:02', 1, 10, 90, 0),
(31, 'HUM', 'humSensor', 60.7, '2017-06-27 08:53:13', 1, 30, 80, 1),
(32, '', 'tempSensor', 0, '2017-06-27 08:54:35', 1, -1, 10000, 0),
(33, '', 'tempSensor', 40.0621, '2017-06-27 08:54:36', 1, -1, 10000, 0),
(34, '', 'tempSensor', 34, '2017-06-27 09:05:07', 1, -1, 10000, 1),
(35, '', 'tempSensor', 98, '2017-06-27 09:05:07', 1, -1, 10000, 1),
(36, 'TEMP', 'tempSensor', 52, '2017-06-27 09:26:33', 1, 10, 90, 1),
(37, '', 'tempSensor', 110, '2017-06-27 09:26:39', 1, -1, 10000, 1),
(38, '', 'tempSensor', 42, '2017-06-27 09:26:39', 1, -1, 10000, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `watched_sensors`
--

CREATE TABLE IF NOT EXISTS `watched_sensors` (
`id` int(11) NOT NULL,
  `suid` text NOT NULL,
  `warning_flag` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `watched_sensors`
--

INSERT INTO `watched_sensors` (`id`, `suid`, `warning_flag`) VALUES
(1, 'tempSensor', 1),
(2, 'humSensor', 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `companies`
--
ALTER TABLE `companies`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `machines`
--
ALTER TABLE `machines`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `sensors`
--
ALTER TABLE `sensors`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `watched_sensors`
--
ALTER TABLE `watched_sensors`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `companies`
--
ALTER TABLE `companies`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `machines`
--
ALTER TABLE `machines`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT für Tabelle `watched_sensors`
--
ALTER TABLE `watched_sensors`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
