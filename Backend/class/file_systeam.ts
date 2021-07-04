import path from "path";
import fs from "fs";
import { IfileUpload } from "../interfaces/file_upload";
//import unidid from 'uniqid';


export default class FileSystem{
    constructor(){}
    private crearCarpetaUsuario():string{
        const pathProv = '../../Pedidos_Provedores'
        if(!fs.existsSync(pathProv)){
          fs.mkdirSync(pathProv);  
        }
        return pathProv;
    }
    /* Esto es para generar nombre a los archivos con una libreria 
    private generarnombreunico(nombreOriginal:string){
        const nombreArchivo = nombreOriginal.split('.');
        const extension = nombreArchivo[nombreArchivo.length-1];
        const nombre = unidid();
        return `${nombre}.${extension}`
    }
    */
    guardarImagen(proveedorId:string,file:IfileUpload):Promise<any>{

        return new Promise((resolve,reject)=>{
            const path = this.crearCarpetaUsuario();
            //const nombreArchivo= this.generarnombreunico(file.name);
            const nombreArchivo=file.name;
            
            file.mv(`${path}/${nombreArchivo}`, (error:any)=>{
                if(error){
                    return reject();
                }else{
                    return resolve(true);
                    
                }
            })
        })
        

    }

}