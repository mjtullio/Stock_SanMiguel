"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const connectionMySQL_1 = __importDefault(require("./bin/connectionMySQL"));
const body_parser_1 = __importDefault(require("body-parser"));
const proveedores_1 = __importDefault(require("./routes/proveedores"));
const tipos_1 = __importDefault(require("./routes/tipos"));
const productos_1 = __importDefault(require("./routes/productos"));
const pedidos_proveedores_1 = __importDefault(require("./routes/pedidos_proveedores"));
const pedidos_venta_1 = __importDefault(require("./routes/pedidos_venta"));
const detalles_1 = __importDefault(require("./routes/detalles"));
const stock_1 = __importDefault(require("./routes/stock"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
//Creando servidor web
const server = new server_1.default();
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//upload
server.app.use(express_fileupload_1.default());
// Rutas de aplicacion
server.app.use('/users', usuarios_1.default);
server.app.use('/prov', proveedores_1.default);
server.app.use('/tipos', tipos_1.default);
server.app.use('/produ', productos_1.default);
server.app.use('/pedidosprov', pedidos_proveedores_1.default);
server.app.use('/pedidosvent', pedidos_venta_1.default);
server.app.use('/detalles', detalles_1.default);
server.app.use('/stock', stock_1.default);
// conexion my sql
connectionMySQL_1.default.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log('Aplicacion conectada a la base de datos de pollos');
    }
});
