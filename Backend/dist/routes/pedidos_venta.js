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
const file_systeam_1 = __importDefault(require("../class/file_systeam"));
const promesa_1 = __importDefault(require("../class/promesa"));
const filesystem = new file_systeam_1.default;
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
pedidosventRoutes.post('/AgregaPedidoVent', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield promesa_1.default("start transaction");
        const insertPedido = yield promesa_1.default('INSERT INTO pedidos_ventas (id_proveedor, id_tipo, importe , fecha, observacion,path_imagen, id_usuario) VALUES (?,?,?,?,?,?,?)', [body.id_proveedor, body.id_tipo, body.importe, body.fecha, body.observacion, body.path_imagen, body.id_usuario]);
        const nroPedido = yield promesa_1.default('SELECT max(id_pedidos_ventas) as id FROM pedidos_ventas');
        for (let index = 0; index < body.detalles.length; index++) {
            let detalle = body.detalles[index];
            console.log(detalle);
            yield promesa_1.default('INSERT INTO detalles_pedidos_productos (id_pedido , id_tipo , id_producto , cantidad , precio_unitario ) VALUES (?,?,?,?,?)', [nroPedido[0].id, detalle[0], detalle[1], detalle[2], detalle[3]]);
        }
        yield promesa_1.default("commit");
        res.json({ estado: "success" });
    }
    catch (error) {
        const rollback = yield promesa_1.default("rollback");
        res.json({ estado: "error", data: error, rollabck: rollback });
    }
}));
pedidosventRoutes.post('/modificaPedidoVent', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('UPDATE pedidos_ventas set id_proveedor = ?, id_tipo = ?, importe = ?, fecha = ?, observacion = ?,path_imagen = ?, id_usuario = ? where id_pedido = ?', [body.id_proveedor, body.id_tipo, body.importe, body.fecha, body.observacion, body.path_imagen, body.id_usuario, body.id_pedido], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedido modificado",
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
pedidosventRoutes.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagen = req.files.imagen;
    if (!req.files) {
        res.status(400).json({
            estado: 'error',
            mensaje: 'No se subio el archivo'
        });
    }
    if (!imagen.mimetype.includes('image')) {
        res.status(400).json({
            estado: 'error',
            mensaje: 'Formato incorrecto'
        });
    }
    yield filesystem.guardarImagen('prueba', imagen);
    res.json({
        estado: 'success',
        data: imagen
    });
}));
exports.default = pedidosventRoutes;
