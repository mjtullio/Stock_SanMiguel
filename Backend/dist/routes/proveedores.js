"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connectionMySQL_1 = __importDefault(require("../bin/connectionMySQL"));
const proveedoresRoutes = express_1.Router();
proveedoresRoutes.get('/muestra', (req, res) => {
    connectionMySQL_1.default.query('select * from proveedores', (error, result) => {
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
                mensaje: "usuario no encontrado en base de datos"
            });
        }
    });
});
exports.default = proveedoresRoutes;
