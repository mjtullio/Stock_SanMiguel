"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../class/token");
const authentication_1 = require("../middlewares/authentication");
const connectionMySQL_1 = __importDefault(require("../bin/connectionMySQL"));
const userRoutes = express_1.Router();
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from usuarios where documento = ? and clave= md5(?)', [body.documento, body.clave], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            const tokenJwt = token_1.Token.getToken({
                id_usuario: result.id_usuario,
                nombre: result.nombre,
                documento: result.documento,
                id_tipo: result.id_tipo
            });
            return res.json({
                estado: "success",
                mensaje: "usuario encontrado",
                data: result,
                token: tokenJwt
            });
        }
        else {
            return res.json({
                estado: "success",
                mensaje: "usuario no encontrado en base de datos"
            });
        }
    });
});
userRoutes.get('/muestraUsuarios', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from usuarios order by activo , id_usuario', (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "usuarios encontrados",
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
userRoutes.post('/muestraUs', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from usuarios where id_usuario = ?', [body.id_usuario], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "usuario encontrado",
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
userRoutes.post('/update', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('update usuarios set nombre = ? , documento = ?, clave = md5(?), id_tipo = ?, activo = ?, telefono = ?, email = ?, contacto_emergencia = ? where id_usuario = ?', [body.nombre, body.documento, body.clave, body.id_tipo, body.activo, body.telefono, body.email, body.contacto_emergencia, body.id_usuario], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "usuario modificado",
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
userRoutes.post('/bajaUsuario', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('update usuarios set activo = 0 where id_usuario = ?', [body.id_usuario], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "usuario dado de baja",
                data: result
            });
        }
        else {
            return res.json({
                estado: "success",
                mensaje: "Error baja"
            });
        }
    });
});
//userRoutes.get('/',verificarToken,usuarios.token)
exports.default = userRoutes;
