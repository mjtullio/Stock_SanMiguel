"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
//import unidid from 'uniqid';
class FileSystem {
    constructor() { }
    crearCarpetaUsuario() {
        const pathProv = '../../Pedidos_Provedores';
        if (!fs_1.default.existsSync(pathProv)) {
            fs_1.default.mkdirSync(pathProv);
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
    guardarImagen(proveedorId, file) {
        return new Promise((resolve, reject) => {
            const path = this.crearCarpetaUsuario();
            //const nombreArchivo= this.generarnombreunico(file.name);
            const nombreArchivo = file.name;
            file.mv(`${path}/${nombreArchivo}`, (error) => {
                if (error) {
                    return reject();
                }
                else {
                    return resolve(true);
                }
            });
        });
    }
}
exports.default = FileSystem;
