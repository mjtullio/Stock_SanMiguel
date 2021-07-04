"use strict";
module.exports = {
    token: (req, res, next) => {
        const request = req;
        const usuario = request.usuario;
        console.log("request", req);
        res.json({
            estado: "success",
            mensaje: usuario
        });
    }
};
