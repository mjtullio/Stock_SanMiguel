import  {Router, Response ,Request}  from "express";
import Token from "../class/token";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";

const proveedoresRoutes = Router(); 


proveedoresRoutes.get('/muestra', (req:Request, res:Response )=>{
    
    connection.query('select * from proveedores',(error:any,result:any)=>{


    if(error){
        throw error
    }
    if(result != ''){    
        return res.json({
            estado:"success",
            mensaje: "usuario encontrado",
            data: result
            
        })
    }else{
        return res.json({
            estado: "success",
            mensaje: "usuario no encontrado en base de datos"
            
        })
    }
    })
})

export default proveedoresRoutes;