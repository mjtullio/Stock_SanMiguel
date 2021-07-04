import  {Router, Response ,Request}  from "express";
import {Token} from "../class/token";
import {verificarToken} from "../middlewares/authentication";
import connection from "../bin/connectionMySQL";
import { IfileUpload } from "../interfaces/file_upload";
import FileSystem from "../class/file_systeam";


const filesystem = new FileSystem; 

const pedidosprovRoutes = Router(); 


pedidosprovRoutes.post('/upload', async (req:any, res:Response )=>{
    const imagen:IfileUpload = req.files.imagen;
    
    if(!req.files){
        res.status(400).json({
            estado:'error',
            mensaje:'No se subio el archivo'
        })
    }

    if(!imagen.mimetype.includes('image')){
        res.status(400).json({
            estado:'error',
            mensaje:'Formato incorrecto'
        })
    }    
    
    await filesystem.guardarImagen('prueba',imagen)
    
    res.json({
        estado: 'success',
        data:imagen
    })
})

export default pedidosprovRoutes;