"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const connectionMySQL_1 = __importDefault(require("../bin/connectionMySQL"));
const proveedoresRoutes = express_1.Router();
proveedoresRoutes.get('/muestraProveedores', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from proveedores', (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "proveedores encontrados",
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
proveedoresRoutes.get('/muestraProv', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from proveedores  where id_proveedor = ?', [body.id_proveedor], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "proveedor encontrado",
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
proveedoresRoutes.post('/updateProveedor', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('update proveedores set  nombre = ? , cuil_cuit = ?, email = ?, localidad = ?, telefono = ?, activo = ? where id_proveedor = ?', [body.id_proveedor, body.nombre, body.cuil_cuit, body.email, body.localidad, body.telefono, body.activo], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "proveedor modificado",
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
proveedoresRoutes.post('/agregarProveedor', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('INSERT INTO proveedores (nombre , cuil_cuit , email, localidad, telefono ,activo) VALUES (?,?,?,?,?,?)', [body.nombre, body.cuil_cuit, body.email, body.localidad, body.telefono, body.activo], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "proveedor modificado",
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
exports.default = proveedoresRoutes;
