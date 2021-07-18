import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";

const tiposRoutes = Router(); 

tiposRoutes.post('/muestraTipoClase', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    connection.query('select * from tipos where id_tipo = ? and clase = ?',[body.id_tipo , body.clase], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "tipo clase encontrados",
                data: result,
                refreshToken: req.token
            })
        } else {
            return res.json({
                estado: "success",
                mensaje: "Error query"

            })
        }
    })
})

tiposRoutes.post('/muestraXClase', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    connection.query('select * from tipos where clase = ? order by id_tipo',[ body.clase], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "tipo encontrados",
                data: result,
                refreshToken: req.token
            })
        } else {
            return res.json({
                estado: "success",
                mensaje: "Error query"
            })
        }
    })
})

tiposRoutes.get('/muestraTipos', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    connection.query('select * from tipos order by clase , id_tipo', (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "tipos encontrados",
                data: result,
                refreshToken: req.token
            })
        } else {
            return res.json({
                estado: "success",
                mensaje: "Error query"

            })
        }
    })
})
tiposRoutes.post('/updatetipo', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    connection.query('update tipos set nombre = ? , clase = ? where id_tipo = ? and clase = ?', [body.nombre , body.clase, body.id_tipo ,], (error: any, result: any) => {
    
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "tipo modificado",
                data: result,
                refreshToken: req.token
            })
        } else {
            return res.json({
                estado: "success",
                mensaje: "Error Update"
            })
        }
    })
})

tiposRoutes.post('/agregartipo', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    connection.query('INSERT INTO tipos (id_tipo, nombre, clase) VALUES (?,?,?)', [body.id_tipo , body.nombre , body.clase], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "tipo agregado",
                data: result,
                refreshToken: req.token
            })
        } else {
            return res.json({
                estado: "success",
                mensaje: "Error Update"
            })
        }
    })
})

export default tiposRoutes;