"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const connectionMySQL_1 = __importDefault(require("../bin/connectionMySQL"));
const detallesRoutes = express_1.Router();
detallesRoutes.get('/muestradetalles', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from detalles_pedidos_productos', (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalles encontrados",
                data: result
            });
        }
        else {
            return res.json({
                estado: "success",
                mensaje: "Error query"
            });
        }
    });
});
detallesRoutes.get('/muestraDetalle', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from detalles_pedidos_productos where id_detalles_pedidos_productos = ?', [body.id_detalles_pedidos_productos], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalle encontrado",
                data: result
            });
        }
        else {
            return res.json({
                estado: "success",
                mensaje: "Error query"
            });
        }
    });
});
detallesRoutes.post('/updatedetalle', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('update detalles_pedidos_productos set  id_pedido = ?, tipo = ?, id_producto = ?, cantidad = ?, precio_unitario = ?, id_proveedor = ? where id_detalles_pedidos_productos = ?', [body.id_producto, body.nombre, body.id_tipo, body.id_proveedor, body.peso, body.precio, body.activo], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "destalle modificado",
                data: result
            });
        }
        else {
            return res.json({
                estado: "success",
                mensaje: "Error Update"
            });
        }
    });
});
detallesRoutes.post('/agregardetalle', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('INSERT INTO detalles_pedidos_productos (id_pedido , tipo , id_producto , cantidad , precio_unitario , id_proveedor) VALUES (?,?,?,?,?,?)', [body.id_pedido, body.tipo, body.id_producto, body.cantidad, body.precio_unitario, body.id_proveedor], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalle modificado",
                data: result
            });
        }
        else {
            return res.json({
                estado: "success",
                mensaje: "Error Update"
            });
        }
    });
});
exports.default = detallesRoutes;
