import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';
@Injectable({
  providedIn: 'root'
})
export class DetallesService {

  constructor(private http:HttpClient) { }

  agregarDetalle(dataForm:{}){
    return this.http.post<IrepBackend>(`http://localhost:3000/detalles/agregarDetalle`,dataForm,{})
  }


}
