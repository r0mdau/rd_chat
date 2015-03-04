-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mar 29 Janvier 2013 à 21:32
-- Version du serveur: 5.5.28-1
-- Version de PHP: 5.4.4-11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `rd_chat`
--

-- --------------------------------------------------------

--
-- Structure de la table `big_chat`
--

CREATE TABLE IF NOT EXISTS `big_chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenu` text CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `date` datetime NOT NULL,
  `id_etudiant` int(11) NOT NULL,
  `salon` int(11) NOT NULL DEFAULT '1',
  `time` int(11) NOT NULL DEFAULT '1354438900',
  PRIMARY KEY (`id`),
  KEY `id_etudiant` (`id_etudiant`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3334 ;

-- --------------------------------------------------------

--
-- Structure de la table `chat`
--

CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from` varchar(50) NOT NULL DEFAULT '',
  `to` varchar(50) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `sent` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `recd` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `from` (`from`),
  KEY `to` (`to`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2412 ;

-- --------------------------------------------------------

--
-- Structure de la table `compte_etudiant`
--

CREATE TABLE IF NOT EXISTS `compte_etudiant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) CHARACTER SET latin1 NOT NULL,
  `id_chat` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pseudo` (`pseudo`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=197 ;

-- --------------------------------------------------------

--
-- Structure de la table `en_ligne`
--

CREATE TABLE IF NOT EXISTS `en_ligne` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `temps` int(11) NOT NULL DEFAULT '0',
  `id_etudiant` int(11) NOT NULL,
  `salon` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_etudiant` (`id_etudiant`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

-- --------------------------------------------------------

--
-- Structure de la table `gmail`
--

CREATE TABLE IF NOT EXISTS `gmail` (
  `i` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(200) NOT NULL,
  `pass` varchar(200) NOT NULL,
  PRIMARY KEY (`i`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `preferences`
--

CREATE TABLE IF NOT EXISTS `preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_etudiant` int(11) NOT NULL,
  `notif` int(11) NOT NULL DEFAULT '1',
  `people` int(11) NOT NULL DEFAULT '0',
  `scroll` int(11) NOT NULL DEFAULT '1',
  `pause` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_etudiant` (`id_etudiant`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `big_chat`
--
ALTER TABLE `big_chat`
  ADD CONSTRAINT `big_chat_ibfk_1` FOREIGN KEY (`id_etudiant`) REFERENCES `compte_etudiant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `en_ligne`
--
ALTER TABLE `en_ligne`
  ADD CONSTRAINT `en_ligne_ibfk_1` FOREIGN KEY (`id_etudiant`) REFERENCES `compte_etudiant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `preferences`
--
ALTER TABLE `preferences`
  ADD CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`id_etudiant`) REFERENCES `compte_etudiant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
