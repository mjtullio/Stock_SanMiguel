import  {Router, Response ,Request}  from "express";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
const stockRoutes = Router(); 


stockRoutes.get('/muestraStock', verificarToken ,(req: any, res: Response) => {
    connection.query('SELECT p.nombre , fecha_ultimo_ingreso , fecha_ultimo_egreso FROM stock s , productos p where s.id_producto = p.id_producto order by p.nombre', (error: any, result: any) => {
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