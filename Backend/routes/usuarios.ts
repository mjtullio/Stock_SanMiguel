import { Router, Response, Request } from "express";
import { Token } from "../class/token";
import { verificarToken } from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
import usuarios from "../controllers/usuarios";

const userRoutes = Router();

userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;
    
    connection.query('select * from usuarios where documento = ? and clave= md5(?)', [body.documento, body.clave], (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            const tokenJwt = Token.getToken({
                id_usuario: result.id_usuario,
                nombre: result.nombre,
                documento: result.documento,
                id_tipo: result.id_tipo
            })

            return res.json({
                estado: "success",
                mensaje: "usuario encontrado",
                data: result,
                token: tokenJwt
            })
        } else {
            return res.json({
                estado: "success",
                mensaje: "usuario no encontrado en base de datos"

            })
        }
    })
})

userRoutes.get('/muestraUsuarios', verificarToken ,(req: Request, res: Response) => {
    const body = req.body;
    connection.query('select * from usuarios order by activo , id_usuario', (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "usuarios encontrados",
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

userRoutes.post('/muestraUs', verificarToken ,(req: Request, res: Response) => {
    const body = req.body;
    connection.query('select * from usuarios where id_usuario = ?',[body.id_usuario] ,(error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result != '') {
            return res.json({
                estado: "success",
                mensaje: "usuario encontrado",
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

userRoutes.post('/update', verificarToken, (req: Request, res: Response) => {
    const body = req.body;
    connection.query('update usuarios set nombre = ? , documento = ?, clave = md5(?), id_tipo = ?, activo = ?, telefono = ?, email = ?, contacto_emergencia = ? where id_usuario = ?', [body.nombre , body.documento, body.clave, body.id_tipo , body.activo , body.telefono, body.email , body.contacto_emergencia, body.id_usuario], (error: any, result: any) => {
        

        if (error) {
            throw error
        }
        if (result != '') {
           
            return res.json({
                estado: "success",
                mensaje: "usuario modificado",
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


userRoutes.post('/bajaUsuario', verificarToken, (req: Request, res: Response) => {
    const body = req.body;
    connection.query('update usuarios set activo = 0 where id_usuario = ?', [body.id_usuario], (error: any, result: any) => {
        

        if (error) {
            throw error
        }
        if (result != '') {
           
            return res.json({
                estado: "success",
                mensaje: "usuario dado de baja",
                data: result
            })
        } else {
            return res.json({
                estado: "success",
                mensaje: "Error baja"

            })
        }
    })
})
//userRoutes.get('/',verificarToken,usuarios.token)

export default userRoutes;