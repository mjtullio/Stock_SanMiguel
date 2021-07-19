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
    connectionMySQL_1.default.query('SELECT p.nombre as nombre_producto, t.nombre as nombre_tipo, prov.nombre as nombre_proveedor , s.cantidad_producto, s.fecha_ultimo_ingreso , s.fecha_ultimo_egreso FROM stock s , productos p ,tipos t, proveedores prov WHERE s.id_producto = p.id_producto AND p.id_tipo = t.id_tipo AND p.id_proveedor = prov.id_proveedor ORDER BY s.cantidad_producto , p.nombre', (error, result) => {
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
