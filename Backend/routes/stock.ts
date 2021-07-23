import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
const stockRoutes = Router(); 


stockRoutes.get('/muestraStock', verificarToken ,(req: any, res: Response) => {
    connection.query("SELECT p.nombre as nombre_producto, t.nombre as nombre_tipo, prov.nombre as nombre_proveedor , s.cantidad_producto, DATE_FORMAT(s.fecha_ultimo_ingreso, '%d/%m/%Y') as fecha_ultimo_ingreso, DATE_FORMAT(s.fecha_ultimo_egreso, '%d/%m/%Y') as fecha_ultimo_egreso FROM stock s , productos p ,tipos t, proveedores prov WHERE s.id_producto = p.id_producto AND p.id_tipo = t.id_tipo AND p.id_proveedor = prov.id_proveedor ORDER BY s.cantidad_producto , p.nombre", (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "stock encontrados",
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

export default stockRoutes;