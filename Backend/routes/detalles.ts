import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
const detallesRoutes = Router(); 


detallesRoutes.post('/muestraDetallesPedido', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    connection.query('select * from detalles_pedidos_productos where id_pedido = ? order by id_detalles_pedidos_productos', [body.id_pedido ], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalles de pedido encontrados",
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

detallesRoutes.post('/muestraDetalle', verificarToken ,(req: any, res: Response) => {
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

detallesRoutes.post('/updatedetalle', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    connection.query('update detalles_pedidos_productos set  id_pedido = ?, id_tipo = ?, id_producto = ?, cantidad = ?, precio_unitario = ?, id_proveedor = ? where id_detalles_pedidos_productos = ?', [body.id_pedido, body.id_tipo, body.id_producto, body.cantidad , body.precio_unitario ,body.id_detalles_pedidos_productos], (error: any, result: any) => {
    
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

detallesRoutes.post('/eliminarDetalle', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    connection.query('delete from detalles_pedidos_productos where id_detalles_pedidos_productos = ?',[body.id_detalles_pedidos_productos], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "detalle eliminado",
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


export default detallesRoutes;