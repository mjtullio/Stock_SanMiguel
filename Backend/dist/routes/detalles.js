"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const connectionMySQL_1 = __importDefault(require("../bin/connectionMySQL"));
const detallesRoutes = express_1.Router();
detallesRoutes.post('/muestraDetallesPedido', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from detalles_pedidos_productos where id_pedido = ? order by id_detalles_pedidos_productos', [body.id_pedido], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalles de pedido encontrados",
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
detallesRoutes.post('/muestraDetalle', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from detalles_pedidos_productos where id_detalles_pedidos_productos = ?', [body.id_detalles_pedidos_productos], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalle encontrado",
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
detallesRoutes.post('/updatedetalle', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('update detalles_pedidos_productos set  id_pedido = ?, id_tipo = ?, id_producto = ?, cantidad = ?, precio_unitario = ?, id_proveedor = ? where id_detalles_pedidos_productos = ?', [body.id_pedido, body.id_tipo, body.id_producto, body.cantidad, body.precio_unitario, body.id_detalles_pedidos_productos], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "destalle modificado",
                data: result,
                refreshToken: req.token
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
detallesRoutes.post('/agregarDetalle', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    connectionMySQL_1.default.query("INSERT INTO detalles_pedidos_productos (id_pedido , id_tipo , id_producto , cantidad , precio_unitario ) VALUES (?,?,?,?,?);", [body.id_pedido, body.id_tipo, body.id_producto, body.cantidad, body.precio_unitario], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "Detalle Agregado",
                data: result,
                refreshToken: req.token
            });
        }
        else {
            return res.json({
                estado: "success",
                mensaje: "Error Insert"
            });
        }
    });
}));
exports.default = detallesRoutes;
