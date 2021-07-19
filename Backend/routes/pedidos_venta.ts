import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
import bodyParser from "body-parser";
import query from "../class/promesa";


const pedidosventRoutes = Router(); 

pedidosventRoutes.get('/muestraPedidos', verificarToken ,(req: any, res: Response) => {
    
    connection.query('select * from pedidos_ventas order by id_pedidos_ventas desc ', (error: any, result: any) => {
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
    connection.query('select * from pedidos_ventas where id_pedidos_ventas = ?',[body.pedidos_ventas], (error: any, result: any) => {
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
   
    try{
        const body = req.body;
    
            await query("START TRANSACTION");
    
            const insertPedido:any = await query("INSERT INTO pedidos_ventas (id_proveedor, id_tipo, importe , fecha, observacion, id_usuario) VALUES (7,'VENT',?,?,?,?)", [ body.importe , body.fecha, body.observacion,body.id_usuario]);
            
            const nroPedido:any =  await query('SELECT max(id_pedidos_ventas) as id FROM pedidos_ventas');
            
            
            for (let index = 0; index < body.detalles.length; index ++) {
                let detalle:Array<any> = body.detalles[index];
                console.log(detalle);
                await query("INSERT INTO detalles_pedidos_productos (id_pedido , id_tipo , id_producto , cantidad , precio_unitario ) VALUES (?,'VENT',?,?,?)", [nroPedido[0].id,detalle[0], detalle[1], detalle[2]]);
            }
    
            await query("COMMIT");

            res.json({estado: "success",  refreshToken: req.token}) 
    }
    catch(error){
        const rollback = await query("ROLLBACK");
        res.json({estado:"error", data:error, rollabck:rollback});
    }
})

pedidosventRoutes.post('/modificaPedidoVent', verificarToken ,  (req: any, res: Response) => {
    
    const body = req.body;
    connection.query('UPDATE pedidos_ventas set  importe = ?, fecha = ?, observacion = ?, id_usuario = ? where id_pedido = ?', [ body.importe , body.fecha, body.observacion, body.id_usuario, body.id_pedido], (error: any, result: any) => {
    
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


export default pedidosventRoutes;