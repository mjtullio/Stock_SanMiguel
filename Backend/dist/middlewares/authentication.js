"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const token_1 = require("../class/token");
const verificarToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    token_1.Token.checkToken(userToken)
        .then(decoded => {
        req.usuario = decoded.usuario;
        const refreshtoken = token_1.Token.getToken(req.usuario);
        req.token = refreshtoken;
        next();
    })
        .catch(error => {
        res.json({
            estado: 'success',
            mensaje: 'Token Incorrecto',
            error: error
        });
    });
};
exports.verificarToken = verificarToken;
