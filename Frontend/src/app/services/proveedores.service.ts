import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http:HttpClient) { }

  getProveedores(){
    return this.http.get<IrepBackend>(`http://localhost:3000/prov/muestraProveedores`)
  }

}
