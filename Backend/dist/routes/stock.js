"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const connectionMySQL_1 = __importDefault(require("../bin/connectionMySQL"));
const stockRoutes = express_1.Router();
stockRoutes.get('/muestraStock', authentication_1.verificarToken, (req, res) => {
    connectionMySQL_1.default.query('SELECT p.nombre , fecha_ultimo_ingreso , fecha_ultimo_egreso FROM stock s , productos p where s.id_producto = p.id_producto order by p.nombre', (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "stock encontrados",
                data: result,
                refreshToken: req.token
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
exports.default = stockRoutes;
