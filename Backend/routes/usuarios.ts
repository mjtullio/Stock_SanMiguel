import  {Router, Response ,Request}  from "express";
import Token from "../class/token";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";

const userRoutes = Router();
/// [para volver a generar el token] usar
// refreshtoken = req.token
// 
userRoutes.get('/prueba', (req:Request, res:Response )=>{
    res.json({
        estado: 'success',
        mensaje: 'ok'
    })
})

userRoutes.post('/login',(req:Request, res:Response )=>{
   
        const body =req.body;

        const documento= body.documento;
        const clave = body.clave;
        connection.query('select * from usuarios where documento = ? and clave= md5(?)',[documento,clave],(error:any,result:any)=>{

    
        if(error){
            throw error
        }
        if(result != ''){   
            const tokenJwt = Token.getToken({
                id_usuario: result.id_usuario,
                nombre: result.nombre,
                documento: result.documento,
                id_tipo: result.id_tipo
            })
            
            return res.json({
                estado:"success",
                mensaje: "usuario encontrado",
                data: result,
                token: tokenJwt
            })
        }else{
            return res.json({
                estado: "success",
                mensaje: "usuario no encontrado en base de datos"
                
            })
        }
    })
})

export default userRoutes;