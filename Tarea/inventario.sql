-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2024 a las 14:09:42
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--
CREATE DATABASE IF NOT EXISTS `inventario` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `inventario`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aulas`
--

DROP TABLE IF EXISTS `aulas`;
CREATE TABLE `aulas` (
  `id_aula` int(11) NOT NULL,
  `num_aula` varchar(5) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesordenador`
--

DROP TABLE IF EXISTS `detallesordenador`;
CREATE TABLE `detallesordenador` (
  `id_detalle` int(11) NOT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  `procesador` varchar(50) DEFAULT NULL,
  `memoria_ram` varchar(20) DEFAULT NULL,
  `disco_duro` varchar(20) DEFAULT NULL,
  `tarjeta_grafica` varchar(100) DEFAULT NULL,
  `sistema_operativo` varchar(50) DEFAULT NULL,
  `licencia` varchar(50) DEFAULT NULL,
  `otros_detalles` varchar(100) DEFAULT NULL,
  `usuario_admin` varchar(20) NOT NULL,
  `password_admin` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equiposelectronicos`
--

DROP TABLE IF EXISTS `equiposelectronicos`;
CREATE TABLE `equiposelectronicos` (
  `id_equipo` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `numero_de_serie` varchar(50) DEFAULT NULL,
  `estado` enum('activo','mantenimiento','estropeado') DEFAULT NULL,
  `id_aula` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `imagen_producto` blob DEFAULT NULL,
  `qr_code` blob DEFAULT NULL,
  `ano_adquisicion` int(11) DEFAULT NULL,
  `ultima_actualizacion` date DEFAULT NULL,
  `codigo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

DROP TABLE IF EXISTS `incidencias`;
CREATE TABLE `incidencias` (
  `id_incidencia` int(11) NOT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  `fecha_reporte` date DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `estado` enum('abierta','en_proceso','cerrada') DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aulas`
--
ALTER TABLE `aulas`
  ADD PRIMARY KEY (`id_aula`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `detallesordenador`
--
ALTER TABLE `detallesordenador`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `equiposelectronicos`
--
ALTER TABLE `equiposelectronicos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `id_aula` (`id_aula`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`id_incidencia`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aulas`
--
ALTER TABLE `aulas`
  MODIFY `id_aula` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallesordenador`
--
ALTER TABLE `detallesordenador`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `equiposelectronicos`
--
ALTER TABLE `equiposelectronicos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `id_incidencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallesordenador`
--
ALTER TABLE `detallesordenador`
  ADD CONSTRAINT `detallesordenador_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equiposelectronicos` (`id_equipo`);

--
-- Filtros para la tabla `equiposelectronicos`
--
ALTER TABLE `equiposelectronicos`
  ADD CONSTRAINT `equiposelectronicos_ibfk_1` FOREIGN KEY (`id_aula`) REFERENCES `aulas` (`id_aula`),
  ADD CONSTRAINT `equiposelectronicos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD CONSTRAINT `incidencias_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equiposelectronicos` (`id_equipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
