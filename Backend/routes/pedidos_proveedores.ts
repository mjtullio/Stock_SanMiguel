import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
import {IfileUpload} from "../interfaces/file_upload";
import FileSystem from "../class/file_systeam";
import bodyParser from "body-parser";
import query from "../class/promesa";

const filesystem = new FileSystem; 

const pedidosprovRoutes = Router(); 

pedidosprovRoutes.post('/muestraPedidosProv', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    connection.query('select * from pedidos_proveedores where id_proveedor = ? order by id_pedidos_proveedores desc ',[body.id_proveedor], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos proveedores encontrados",
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
pedidosprovRoutes.get('/muestraPedidos', verificarToken ,(req: any, res: Response) => {
    
    connection.query('select *, (select count(*) from detalles_pedidos_productos where id_tipo = "PROV" and id_pedido = id_pedidos_proveedores) as cantidad_detalles from pedidos_proveedores  order by id_pedidos_proveedores desc ', (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos proveedores encontrados",
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

pedidosprovRoutes.post('/muestraPedidoProv', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    
    connection.query('select * from pedidos_proveedores where id_pedidos_proveedores = ?',[body.id_pedidos_proveedores], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "pedidos proveedor encontrado",
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

pedidosprovRoutes.post('/eliminarPedidoProv', verificarToken , async (req: any, res: Response) => {
    
    try{
        const body = req.body;
            
            await query("START TRANSACTION;");
    
            await query('delete from detalles_pedidos_productos where id_tipo = "PROV" and id_pedido = ?',[body.id_pedidos_proveedores]);
            
            await query('delete from pedidos_proveedores where id_pedidos_proveedores = ?',[body.id_pedidos_proveedores]);
            
    
            await query("COMMIT;");

            res.json({estado: "success",  refreshToken: req.token}) 
    }
    catch(error){
        const rollback = await query("ROLLBACK");
        res.json({estado:"error", data:error, rollabck:rollback});
    }
    
})
pedidosprovRoutes.post('/agregarPedidoProv', verificarToken ,async (req: any, res: Response) => {
    const body = req.body;
    connection.query("INSERT INTO pedidos_proveedores (id_proveedor, id_tipo, importe , fecha, observacion,path_imagen, id_usuario) VALUES (?,'PROV',?,?,?,?,?);", [body.id_proveedor, body.importe , body.fecha, body.observacion, body.path_imagen, body.id_usuario], (error: any, result: any) => {
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

pedidosprovRoutes.post('/modificaPedidoProv', verificarToken ,  (req: any, res: Response) => {
    
    const body = req.body;
    connection.query('UPDATE pedidos_proveedores set id_proveedor = ?, importe = ?, fecha = ?, observacion = ? where id_pedidos_proveedores = ?', [body.id_proveedor, body.importe , body.fecha, body.observacion, body.id_pedidos_proveedores], (error: any, result: any) => {
    
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



pedidosprovRoutes.post('/upload' , async (req:any, res:Response )=>{
    try {
        const imagen:IfileUpload = req.files.imagen;
        
        const names = req.files.name;
        var ids =  names.split('_');
        const prov: number = ids[0];
        const pedido: number = ids[1];
        if(!req.files){
            res.status(400).json({
                estado:'error',
                mensaje:'No se subio el archivo'
            })
        }else if(!imagen.mimetype.includes('image')){
            res.status(400).json({
                estado:'error',
                mensaje:'Formato incorrecto'
            })
        }else{ 
            imagen.name=prov+'_'+pedido; 
            await filesystem.guardarImagen('prueba',imagen)
            await query('UPDATE pedidos_proveedores set path_imagen = ? where id_pedidos_proveedores = ?', ['pedidos_proveedores/'+prov+'_'+pedido , pedido])

            res.json({
                estado: 'success',
                data:imagen
            })
        }
    } catch (error) {
        const rollback = await query("ROLLBACK");
        res.json({estado:"error", data:error, rollabck:rollback});
    }
    
})

export default pedidosprovRoutes;