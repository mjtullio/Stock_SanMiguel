import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
const proveedoresRoutes = Router(); 


proveedoresRoutes.get('/muestraProveedores', verificarToken ,(req: Request, res: Response) => {
    const body = req.body;
    connection.query('select * from proveedores order by id_proveedor', (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "proveedores encontrados",
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

proveedoresRoutes.post('/muestraProv', verificarToken ,(req: Request, res: Response) => {
    const body = req.body;
    connection.query('select * from proveedores  where id_proveedor = ?',[body.id_proveedor], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "proveedor encontrado",
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

proveedoresRoutes.post('/updateProveedor', verificarToken, (req: Request, res: Response) => {
    const body = req.body;
    connection.query('update proveedores set  nombre = ? , cuil_cuit = ?, email = ?, localidad = ?, telefono = ?, activo = ? where id_proveedor = ?', [body.nombre , body.cuil_cuit , body.email, body.localidad, body.telefono , body.activo, body.id_proveedor], (error: any, result: any) => {
    
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "proveedor modificado",
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

proveedoresRoutes.post('/agregarProveedor', verificarToken, (req: Request, res: Response) => {
    const body = req.body;
    connection.query('INSERT INTO proveedores (nombre , cuil_cuit , email, localidad, telefono ,activo) VALUES (?,?,?,?,?,?)', [body.nombre , body.cuil_cuit , body.email, body.localidad, body.telefono , body.activo], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "proveedor agregado",
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

proveedoresRoutes.post('/bajaProveedor', verificarToken, (req: Request, res: Response) => {
    const body = req.body;
    connection.query('update proveedores activo = 0 where id_proveedor = ?', [body.id_proveedor], (error: any, result: any) => {
    
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "proveedor dado de baja",
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

export default proveedoresRoutes;