-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: hcf_delivery
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prefer_time` time DEFAULT NULL,
  `prefer_shift` varchar(2) DEFAULT NULL,
  `delivery_duration` int DEFAULT '30',
  `order_priority` int DEFAULT '0',
  `order_type` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text,
  `order_created_date` date DEFAULT NULL,
  `order_status` int DEFAULT '0',
  `items` text,
  `price` decimal(10,2) DEFAULT NULL,
  `delivery_fee` decimal(10,2) DEFAULT NULL,
  `truck_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1645 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1635,'00:00:00','',30,1,1,'sususandi','9123456789','hlaing','2024-06-17',4,'rice,curry',4500.00,500.00,'MH-6857'),(1636,'00:00:00','',30,0,1,'cho zin','9123456789','bar tar ','2024-06-17',3,'rice,curry',5000.00,700.00,'MH-6857'),(1637,'00:00:00','',30,0,1,'pyae phyo','9123456789','no.20, kyaung kone street,Hlaing','2024-06-17',3,'rice,curry',9000.00,900.00,'MH-6857'),(1638,'00:00:00','',30,0,1,'de de','9123456789','no.42 malzigone street , Hlaing','2024-06-17',4,'rice,curry',2500.00,1500.00,'MH-6857'),(1639,'00:00:00','',30,0,1,'may chit','9123456789','no.455 shwe pyi thar , Hlaing Thar Yar.','2024-06-17',3,'rice,curry',8300.00,2000.00,'MH-6857'),(1640,'00:00:00','',30,0,0,'phyu phyu ','9123456789','Thu kha,22 Street','2024-06-17',3,'rice,curry',12000.00,3000.00,'MH-685'),(1641,'00:00:00','',30,1,0,'nyein aye','9123456789','hlaing','2024-06-17',3,'rice,curry',5500.00,1700.00,'MH-685'),(1642,'00:00:00','',30,0,0,'thet zin','9123456789','hlaing','2024-06-17',3,'rice,curry',32000.00,2200.00,'new-truck'),(1643,'00:00:00','',30,1,0,'nyein aye','9123456789','hlaing','2024-06-17',3,'rice,curry',5500.00,1700.00,'new-truck'),(1644,'00:00:00','',30,0,0,'thet zin','9123456789','hlaing','2024-06-17',3,'rice,curry',32000.00,2200.00,'new-truck');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `truck_id` varchar(20) DEFAULT NULL,
  `plan_date` date DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `delivery_start_time` time DEFAULT NULL,
  `delivered_time` datetime DEFAULT NULL,
  `delivery_end_time` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trucks`
--

DROP TABLE IF EXISTS `trucks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trucks` (
  `truck_id` varchar(20) NOT NULL,
  `truck_type` varchar(50) DEFAULT NULL,
  `shift` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`truck_id`),
  UNIQUE KEY `idx_truck_id` (`truck_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trucks`
--

LOCK TABLES `trucks` WRITE;
/*!40000 ALTER TABLE `trucks` DISABLE KEYS */;
INSERT INTO `trucks` VALUES ('MH-685','0','0'),('MH-6857','1','1'),('new-truck','0','0');
/*!40000 ALTER TABLE `trucks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22  0:49:08
