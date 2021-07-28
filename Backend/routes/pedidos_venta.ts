import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
import bodyParser from "body-parser";
import query from "../class/promesa";


const pedidosventRoutes = Router(); 

pedidosventRoutes.get('/muestraPedidos', verificarToken ,(req: any, res: Response) => {
    
    connection.query('select *, (select count(*) from detalles_pedidos_productos where id_tipo = "VENT" and id_pedido =  id_pedidos_ventas) as cantidad_detalles from pedidos_ventas  order by  id_pedidos_ventas desc', (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos ventas encontrados",
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

pedidosventRoutes.post('/muestraPedidoVent', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    connection.query('select * from pedidos_ventas where id_pedidos_ventas = ?',[body.id_pedidos_ventas], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos venta encontrado",
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

pedidosventRoutes.post('/AgregaPedidoVent', verificarToken ,async (req: any, res: Response) => {

const body = req.body;

connection.query("INSERT INTO pedidos_ventas (id_proveedor, id_tipo, importe , fecha, observacion, id_usuario) VALUES (7,'VENT',?,?,?,?)", [body.importe , body.fecha, body.observacion, body.id_usuario], (error: any, result: any) => {
    if (error) {
        throw error
    }
    if (result != '') {
        return res.json({
            estado: "success",
            mensaje: "Pedido Agregado",
            data: result,
            refreshToken: req.token
        })
    } else {
        return res.json({
            estado: "success",
            mensaje: "Error Insert"
        })
    }
})
    
})

pedidosventRoutes.post('/modificaPedidoVent', verificarToken ,  (req: any, res: Response) => {
    
    const body = req.body;
    connection.query('UPDATE pedidos_ventas set importe = ?, fecha = ?, observacion = ? where id_pedidos_ventas = ?', [ body.importe , body.fecha, body.observacion, body.id_pedidos_ventas], (error: any, result: any) => {
    
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedido modificado",
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

pedidosventRoutes.post('/eliminarPedidoVent', verificarToken , async (req: any, res: Response) => {
    
    try{
        const body = req.body;
            
            await query("START TRANSACTION;");
    
            await query('delete from detalles_pedidos_productos where id_tipo = "VENT" and id_pedido = ?',[body.id_pedidos_ventas]);
            
            await query('delete from pedidos_ventas where  id_pedidos_ventas = ?',[body.id_pedidos_ventas]);
            
    
            await query("COMMIT;");

            res.json({estado: "success",  refreshToken: req.token}) 
    }
    catch(error){
        const rollback = await query("ROLLBACK");
        res.json({estado:"error", data:error, rollabck:rollback});
    }
    
})

export default pedidosventRoutes;