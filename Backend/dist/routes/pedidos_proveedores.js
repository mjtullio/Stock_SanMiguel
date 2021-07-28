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
const pedidosprovRoutes = express_1.Router();
pedidosprovRoutes.post('/muestraPedidosProv', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from pedidos_proveedores where id_proveedor = ? order by id_pedidos_proveedores desc ', [body.id_proveedor], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos proveedores encontrados",
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
pedidosprovRoutes.get('/muestraPedidos', authentication_1.verificarToken, (req, res) => {
    connectionMySQL_1.default.query('select *, (select count(*) from detalles_pedidos_productos where id_tipo = "PROV" and id_pedido = id_pedidos_proveedores) as cantidad_detalles from pedidos_proveedores  order by id_pedidos_proveedores desc ', (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos proveedores encontrados",
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
pedidosprovRoutes.post('/muestraPedidoProv', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('select * from pedidos_proveedores where id_pedidos_proveedores = ?', [body.id_pedidos_proveedores], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos proveedor encontrado",
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
pedidosprovRoutes.post('/eliminarPedidoProv', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield promesa_1.default("START TRANSACTION;");
        yield promesa_1.default('delete from detalles_pedidos_productos where id_tipo = "PROV" and id_pedido = ?', [body.id_pedidos_proveedores]);
        yield promesa_1.default('delete from pedidos_proveedores where id_pedidos_proveedores = ?', [body.id_pedidos_proveedores]);
        yield promesa_1.default("COMMIT;");
        res.json({ estado: "success", refreshToken: req.token });
    }
    catch (error) {
        const rollback = yield promesa_1.default("ROLLBACK");
        res.json({ estado: "error", data: error, rollabck: rollback });
    }
}));
pedidosprovRoutes.post('/agregarPedidoProv', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    connectionMySQL_1.default.query("INSERT INTO pedidos_proveedores (id_proveedor, id_tipo, importe , fecha, observacion,path_imagen, id_usuario) VALUES (?,'PROV',?,?,?,?,?);", [body.id_proveedor, body.importe, body.fecha, body.observacion, body.path_imagen, body.id_usuario], (error, result) => {
        if (error) {
            throw error;
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "Pedido Agregado",
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
pedidosprovRoutes.post('/modificaPedidoProv', authentication_1.verificarToken, (req, res) => {
    const body = req.body;
    connectionMySQL_1.default.query('UPDATE pedidos_proveedores set id_proveedor = ?, importe = ?, fecha = ?, observacion = ? where id_pedidos_proveedores = ?', [body.id_proveedor, body.importe, body.fecha, body.observacion, body.id_pedidos_proveedores], (error, result) => {
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
pedidosprovRoutes.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imagen = req.files.imagen;
        const names = req.files.name;
        var ids = names.split('_');
        const prov = ids[0];
        const pedido = ids[1];
        if (!req.files) {
            res.status(400).json({
                estado: 'error',
                mensaje: 'No se subio el archivo'
            });
        }
        else if (!imagen.mimetype.includes('image')) {
            res.status(400).json({
                estado: 'error',
                mensaje: 'Formato incorrecto'
            });
        }
        else {
            imagen.name = prov + '_' + pedido;
            yield filesystem.guardarImagen('prueba', imagen);
            yield promesa_1.default('UPDATE pedidos_proveedores set path_imagen = ? where id_pedidos_proveedores = ?', ['pedidos_proveedores/' + prov + '_' + pedido, pedido]);
            res.json({
                estado: 'success',
                data: imagen
            });
        }
    }
    catch (error) {
        const rollback = yield promesa_1.default("ROLLBACK");
        res.json({ estado: "error", data: error, rollabck: rollback });
    }
}));
exports.default = pedidosprovRoutes;
