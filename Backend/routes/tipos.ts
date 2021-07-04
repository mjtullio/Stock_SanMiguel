import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";

const tiposRoutes = Router(); 

tiposRoutes.get('/muestratipos', verificarToken ,(req: Request, res: Response) => {
    const body = req.body;
    connection.query('select * from tipos where id_tipo = ? and clase = ?',[body.id_tipo , body.clase], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "tipo usarios encontrados",
                data: result
            })
        } else {
            return res.json({
                estado: "success",
                mensaje: "Error query"

            })
        }
    })
})


tiposRoutes.post('/updatetipo', verificarToken, (req: Request, res: Response) => {
    const body = req.body;
    connection.query('update tipos set  id_tipo = ? , nombre = ? , clase = ? where id_tipo = ? and clase = ?', [body.id_tipo , body.nombre , body.clase], (error: any, result: any) => {
    
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "tipo modificado",
                data: result
            })
        } else {
            return res.json({
                estado: "success",
                mensaje: "Error Update"
            })
        }
    })
})

tiposRoutes.post('/agregartipo', verificarToken, (req: Request, res: Response) => {
    const body = req.body;
    connection.query('INSERT INTO tipos (id_tipo, nombre, clase) VALUES (?,?,?)', [body.id_tipo , body.nombre , body.clase], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "tipo agregado",
                data: result
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