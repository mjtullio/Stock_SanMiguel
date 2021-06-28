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
const file_systeam_1 = __importDefault(require("../class/file_systeam"));
const filesystem = new file_systeam_1.default;
const pedidosprovRoutes = express_1.Router();
pedidosprovRoutes.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = pedidosprovRoutes;
