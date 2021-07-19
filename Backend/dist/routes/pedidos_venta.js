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
const promesa_1 = __importDefault(require("../class/promesa"));
const pedidosventRoutes = express_1.Router();
pedidosventRoutes.get('/muestraPedidos', authentication_1.verificarToken, (req, res) => {
    connectionMySQL_1.default.query('select * from pedidos_ventas order by id_pedidos_ventas desc ', (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos ventas encontrados",
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
pedidosventRoutes.post('/muestraPedidoVent', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from pedidos_ventas where id_pedidos_ventas = ?', [body.pedidos_ventas], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos venta encontrado",
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
pedidosventRoutes.post('/AgregaPedidoVent', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield promesa_1.default("START TRANSACTION");
        const insertPedido = yield promesa_1.default("INSERT INTO pedidos_ventas (id_proveedor, id_tipo, importe , fecha, observacion, id_usuario) VALUES (7,'VENT',?,?,?,?)", [body.importe, body.fecha, body.observacion, body.id_usuario]);
        const nroPedido = yield promesa_1.default('SELECT max(id_pedidos_ventas) as id FROM pedidos_ventas');
        for (let index = 0; index < body.detalles.length; index++) {
            let detalle = body.detalles[index];
            console.log(detalle);
            yield promesa_1.default("INSERT INTO detalles_pedidos_productos (id_pedido , id_tipo , id_producto , cantidad , precio_unitario ) VALUES (?,'VENT',?,?,?)", [nroPedido[0].id, detalle[0], detalle[1], detalle[2]]);
        }
        yield promesa_1.default("COMMIT");
        res.json({ estado: "success", refreshToken: req.token });
    }
    catch (error) {
        const rollback = yield promesa_1.default("ROLLBACK");
        res.json({ estado: "error", data: error, rollabck: rollback });
    }
}));
pedidosventRoutes.post('/modificaPedidoVent', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('UPDATE pedidos_ventas set  importe = ?, fecha = ?, observacion = ?, id_usuario = ? where id_pedido = ?', [body.importe, body.fecha, body.observacion, body.id_usuario, body.id_pedido], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedido modificado",
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
exports.default = pedidosventRoutes;
