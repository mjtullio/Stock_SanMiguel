-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-07-2021 a las 00:00:40
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `distribuidora_SanMiguel`
--
CREATE DATABASE IF NOT EXISTS `distribuidora_SanMiguel` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `distribuidora_SanMiguel`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedidos_productos`
--

CREATE TABLE `detalles_pedidos_productos` (
  `id_detalles_pedidos_productos` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_tipo` varchar(15) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Disparadores `detalles_pedidos_productos`
--
DELIMITER $$
CREATE TRIGGER `deleteDetalle_Stock` AFTER DELETE ON `detalles_pedidos_productos` FOR EACH ROW BEGIN
  IF OLD.id_tipo = 'PROV'
    THEN
      UPDATE stock SET stock.cantidad_producto = (stock.cantidad_producto - OLD.cantidad) WHERE stock.id_producto = OLD.id_producto;
      ELSEIF OLD.id_tipo = 'VENT'
      		THEN 
            	UPDATE stock SET stock.cantidad_producto = (stock.cantidad_producto + OLD.cantidad) WHERE stock.id_producto = OLD.id_producto;
      END IF ;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insertDetalle_Stock` BEFORE INSERT ON `detalles_pedidos_productos` FOR EACH ROW BEGIN
  IF NEW.id_tipo = 'PROV'
    THEN
      UPDATE stock SET stock.cantidad_producto = (stock.cantidad_producto + NEW.cantidad), stock.fecha_ultimo_ingreso = (SELECT fecha FROM pedidos_proveedores WHERE id_pedido= NEW.id_pedido) WHERE stock.id_producto = NEW.id_producto;
      ELSEIF NEW.id_tipo = 'VENT'
      		THEN 
            	UPDATE stock SET stock.cantidad_producto = (stock.cantidad_producto - NEW.cantidad), stock.fecha_ultimo_egreso = (SELECT fecha FROM pedidos_ventas WHERE id_pedido= NEW.id_pedido)  WHERE stock.id_producto = NEW.id_producto;
      END IF ;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateDetalle_Stock` BEFORE UPDATE ON `detalles_pedidos_productos` FOR EACH ROW BEGIN
  IF NEW.id_tipo = 'PROV'
    THEN
      UPDATE stock SET stock.cantidad_producto = (stock.cantidad_producto + NEW.cantidad)- OLD.CANTIDAD WHERE stock.id_producto = NEW.id_producto;
      ELSEIF NEW.id_tipo = 'VENT'
      		THEN 
            	UPDATE stock SET stock.cantidad_producto = (stock.cantidad_producto - NEW.cantidad)+ OLD.CANTIDAD WHERE stock.id_producto = NEW.id_producto;
      END IF ;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_proveedores`
--

CREATE TABLE `pedidos_proveedores` (
  `id_pedidos_proveedores` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `id_tipo` varchar(15) NOT NULL,
  `importe` float NOT NULL,
  `fecha` datetime NOT NULL,
  `observacion` varchar(200) DEFAULT NULL,
  `path_imagen` varchar(100) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_ventas`
--

CREATE TABLE `pedidos_ventas` (
  `id_pedidos_ventas` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `importe` float NOT NULL,
  `fecha` datetime NOT NULL,
  `observacion` varchar(200) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_tipo` varchar(5) NOT NULL,
  `id_proveedor` varchar(45) NOT NULL,
  `peso` varchar(15) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `id_tipo`, `id_proveedor`, `peso`, `precio`, `activo`) VALUES
(1, '9 Cabezas', 'CDP', '1', '70KG', 2500, 1),
(2, 'Gourmet', 'CDP', '1', '50KG', 1700, 1),
(3, '11 Cabezas', 'CDP', '2', '80KG', 2400, 1),
(4, '7 Cabezas', 'CDP', '2', '75KG', 2200, 1),
(5, 'Patitas', 'CEB', '3', '1.5KG', 800, 1),
(6, 'Bocados Caprese', 'CEB', '3', '1.5KG', 900, 1),
(7, 'Bastones', 'CEB', '3', '1.5KG', 800, 1),
(8, 'Morron', 'HAM', '5', '500gr', 500, 1),
(9, 'Verdura', 'HAM', '5', '500gr', 500, 1),
(10, 'Jamon y Queso', 'HAM', '5', '500gr', 500, 1),
(11, 'Langostinos', 'CEB', '6', '8KG', 8500, 1),
(12, 'Rabas', 'CEB', '6', '1KG', 1500, 1),
(13, 'Pata Muslo', 'TRO', '7', '1KG', 200, 1),
(14, 'Jamon y Queso 1KG', 'ARR', '7', '1KG', 500, 1),
(15, 'Gourmet', 'CDP', '4', '50KG', 1700, 1),
(16, 'Pollo', 'HAM', '5', '500gr', 550, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedor` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `cuil_cuit` varchar(45) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `nombre`, `localidad`, `telefono`, `email`, `cuil_cuit`, `activo`) VALUES
(1, 'Avicola La Morocha', 'Rosario', '7654321', '1234@prueba.com.ar', '12-34567890-0', 1),
(2, 'Vecchio RyR SA San cayetano', 'Rosario', '1234567', '1234@prueba.com', '12-32333123-2', 1),
(3, 'Indavisa', 'Rosario', '1234567', '1234@prueba.com', '12-32333123-2', 1),
(4, 'Fadel', 'Rosario', '1234567', '1234@prueba.com', '12-32333123-2', 1),
(5, 'Calisa', 'Rosario', '1234567', '1234@prueba.com', '12-32333123-2', 1),
(6, 'Pampa Fish', 'Rosario', '1234567', '1234@prueba.com', '12-32333123-2', 1),
(7, 'San Miguel', 'Santa Fe', '1234567', 'prueba@gmail.com', '12-32333123-2', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock`
--

CREATE TABLE `stock` (
  `id_stock` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_producto` int(11) NOT NULL,
  `fecha_ultimo_ingreso` datetime DEFAULT NULL,
  `fecha_ultimo_egreso` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `id_tipo` varchar(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `clase` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipos`
--

INSERT INTO `tipos` (`id_tipo`, `nombre`, `clase`) VALUES
('ADM', 'Dueño', 'usuario'),
('ARR', 'Arrollados', 'producto'),
('CDP', 'Cajón de Pollos', 'producto'),
('CEB', 'Congelado en Bolsas', 'producto'),
('EMP', 'Empleado', 'usuario'),
('ENC', 'Encargado', 'usuario'),
('GER', 'Gerente', 'usuario'),
('HAM', 'Hamburguesa', 'producto'),
('HUE', 'Maple de Huevo', 'producto'),
('PROV', 'Pedido Proveedor', 'pedido'),
('TRO', 'Trozado', 'producto'),
('VENT', 'Pedido Ventas', 'pedido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `documento` varchar(45) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `id_tipo` varchar(15) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contacto_emergencia` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `documento`, `clave`, `id_tipo`, `activo`, `telefono`, `email`, `contacto_emergencia`) VALUES
(1, 'Adolfo Prytulak', '25298295', 'aeade932682b0fa2e050272cbfdbf553', 'ADM', 1, NULL, '1234@tuvieja.com', NULL),
(2, 'Delia Tornimbeni', '14297295', 'aeade932682b0fa2e050272cbfdbf553', 'GER', 1, NULL, '1234@tuvieja.com', NULL),
(3, 'Victor Postai', '84764549', 'aeade932682b0fa2e050272cbfdbf553', 'ENC', 1, NULL, '1234@tuvieja.com', NULL),
(4, 'Daniela Postai', '36266304', 'aeade932682b0fa2e050272cbfdbf553', 'ADM', 1, NULL, '1234@tuvieja.com', NULL),
(5, 'Ignacio Aquino', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, NULL, '1234@prueba.com', NULL),
(6, 'Marcos Silva', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, NULL, '1234@prueba.com', NULL),
(7, 'Esteban Escalante', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, '156123456', '1234@prueba.com', NULL),
(8, 'Santiago Avila', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, '156123456', '1234@prueba.com', NULL),
(9, 'Francisco Anaherd', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, '156123456', '1234@prueba.com', NULL),
(10, 'Joaquin Nievas', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, '156123456', '1234@prueba.com', NULL),
(11, 'Ariel Gomez', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, '156123456', '1234@prueba.com', NULL),
(12, 'Emmanuel Castillo', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, '156123456', '1234@prueba.com', NULL),
(13, 'Ariel Barreto', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, '156123456', '1234@prueba.com', NULL),
(14, 'Caren Bonetto', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, '156123456', '1234@prueba.com', NULL),
(15, 'Alejandra Patiño', '12345678', 'aeade932682b0fa2e050272cbfdbf553', 'EMP', 1, '156123456', '1234@prueba.com', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalles_pedidos_productos`
--
ALTER TABLE `detalles_pedidos_productos`
  ADD PRIMARY KEY (`id_detalles_pedidos_productos`,`id_pedido`,`id_tipo`);

--
-- Indices de la tabla `pedidos_proveedores`
--
ALTER TABLE `pedidos_proveedores`
  ADD PRIMARY KEY (`id_pedidos_proveedores`,`id_tipo`,`id_proveedor`);

--
-- Indices de la tabla `pedidos_ventas`
--
ALTER TABLE `pedidos_ventas`
  ADD PRIMARY KEY (`id_pedidos_ventas`,`id_proveedor`,`id_tipo`) USING BTREE;

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id_stock`);

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalles_pedidos_productos`
--
ALTER TABLE `detalles_pedidos_productos`
  MODIFY `id_detalles_pedidos_productos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos_proveedores`
--
ALTER TABLE `pedidos_proveedores`
  MODIFY `id_pedidos_proveedores` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos_ventas`
--
ALTER TABLE `pedidos_ventas`
  MODIFY `id_pedidos_ventas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `stock`
--
ALTER TABLE `stock`
  MODIFY `id_stock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
