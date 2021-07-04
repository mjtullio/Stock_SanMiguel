"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const connectionMySQL_1 = __importDefault(require("../bin/connectionMySQL"));
const productosRoutes = express_1.Router();
productosRoutes.get('/muestraproductos', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from productos', (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "productos encontrados",
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
productosRoutes.get('/muestraProv', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from productos where id_producto = ?', [body.id_producto], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "producto encontrado",
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
productosRoutes.post('/updateproducto', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('update productos set  nombre = ?, id_tipo = ?, id_proveedor = ?, peso = ?, precio = ?, activo = ? where id_producto = ?', [body.id_producto, body.nombre, body.id_tipo, body.id_proveedor, body.peso, body.precio, body.activo], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "producto modificado",
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
productosRoutes.post('/agregarproducto', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('INSERT INTO productos (nombre , id_tipo , id_proveedor , peso , precio , activo) VALUES (?,?,?,?,?,?)', [body.nombre, body.cuil_cuit, body.email, body.localidad, body.telefono, body.activo], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "producto modificado",
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
exports.default = productosRoutes;
