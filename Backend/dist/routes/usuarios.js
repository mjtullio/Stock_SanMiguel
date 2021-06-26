"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = __importDefault(require("../class/token"));
const connectionMySQL_1 = __importDefault(require("../bin/connectionMySQL"));
const userRoutes = express_1.Router();
/// [para volver a generar el token] usar
// refreshtoken = req.token
// 
userRoutes.get('/prueba', (req, res) => {
    res.json({
        estado: 'success',
        mensaje: 'ok'
    });
});
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    const documento = body.documento;
    const clave = body.clave;
    connectionMySQL_1.default.query('select * from usuarios where documento = ? and clave= md5(?)', [documento, clave], (error, result) => {
        if (error) {
            throw error;
        }
        if (result) {
            const tokenJwt = token_1.default.getToken({
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
                mensaje: "usuario no encontrado en base de datos",
                data: result
            });
        }
    });
});
exports.default = userRoutes;
