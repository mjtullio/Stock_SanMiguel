import { Request } from 'express';

export interface IrequestExpress extends Request {
    usuario:{
        id_usuario: string,
        nombre: string,
        documento: string,
        id_tipo: string
    }
}
