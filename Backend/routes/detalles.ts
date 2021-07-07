import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
const detallesRoutes = Router(); 


detallesRoutes.get('/muestradetalles', verificarToken ,(req: Request, res: Response) => {
    const body = req.body;
    connection.query('select * from detalles_pedidos_productos', (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalles encontrados",
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

detallesRoutes.get('/muestraDetalle', verificarToken ,(req: Request, res: Response) => {
    const body = req.body;
    connection.query('select * from detalles_pedidos_productos where id_detalles_pedidos_productos = ?',[body.id_detalles_pedidos_productos], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalle encontrado",
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

detallesRoutes.post('/updatedetalle', verificarToken, (req: Request, res: Response) => {
    const body = req.body;
    connection.query('update detalles_pedidos_productos set  id_pedido = ?, tipo = ?, id_producto = ?, cantidad = ?, precio_unitario = ?, id_proveedor = ? where id_detalles_pedidos_productos = ?', [body.id_producto, body.nombre , body.id_tipo , body.id_proveedor, body.peso, body.precio , body.activo], (error: any, result: any) => {
    
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "destalle modificado",
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

detallesRoutes.post('/agregardetalle', verificarToken, (req: Request, res: Response) => {
    const body = req.body;
    connection.query('INSERT INTO detalles_pedidos_productos (id_pedido , tipo , id_producto , cantidad , precio_unitario , id_proveedor) VALUES (?,?,?,?,?,?)', [body.id_pedido , body.tipo , body.id_producto, body.cantidad, body.precio_unitario , body.id_proveedor], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalle modificado",
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

export default detallesRoutes;