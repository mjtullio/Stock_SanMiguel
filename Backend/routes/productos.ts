import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
const productosRoutes = Router(); 


productosRoutes.get('/muestraProductos', verificarToken ,(req: any, res: Response) => {
    
    connection.query('select * from productos order by activo desc, id_proveedor , nombre', (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "productos encontrados",
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

productosRoutes.post('/muestraProductos', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    connection.query('select * from productos where id_producto = ?',[body.id_producto], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "producto encontrado",
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

productosRoutes.post('/muestraProdXProv', verificarToken ,(req: any, res: Response) => {
    const body = req.body;
    connection.query('select * from productos where id_proveedor = ? order by activo, nombre',[body.id_proveedor], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "producto de proveedores encontrados",
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

productosRoutes.post('/updateproducto', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    connection.query('update productos set  nombre = ?, id_tipo = ?, id_proveedor = ?, peso = ?, precio = ?, activo = ? where id_producto = ?', [body.nombre , body.id_tipo , body.id_proveedor, body.peso, body.precio , body.activo, body.id_producto], (error: any, result: any) => {
    
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "producto modificado",
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

productosRoutes.post('/bajaProducto', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    connection.query('update productos set activo = 0 where id_producto = ?', [body.id_producto], (error: any, result: any) => {
    
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "producto dado de baja",
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

productosRoutes.post('/agregarproducto', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    connection.query('INSERT INTO productos (nombre , id_tipo , id_proveedor , peso , precio , activo) VALUES (?,?,?,?,?,?)', [body.nombre , body.id_tipo , body.id_proveedor, body.peso, body.precio , body.activo], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "producto modificado",
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

export default productosRoutes;