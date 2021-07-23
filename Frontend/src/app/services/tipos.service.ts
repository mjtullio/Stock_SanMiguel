import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http:HttpClient) { }

  getTipos(){
    return this.http.get<IrepBackend>(`http://localhost:3000/tipos/muestraTipos`)
  }

 
  agregarTipo(dataForm:{}){
    return this.http.post<IrepBackend>(`http://localhost:3000/tipos/agregartipo`,dataForm,{})
  }

  updateTipo(dataForm:{}){
    return this.http.post<IrepBackend>(`http://localhost:3000/tipos/updatetipo`,dataForm,{})
  }

  muestraTipo(id_tipo: number, clase: number){
    return this.http.post<IrepBackend>(`http://localhost:3000/tipos/muestraTipoClase`,{id_tipo: id_tipo, clase: clase})
  }

  muestraXClase(clase: number){
    return this.http.post<IrepBackend>(`http://localhost:3000/tipos/muestraXClase`,{clase: clase})
  }



}

