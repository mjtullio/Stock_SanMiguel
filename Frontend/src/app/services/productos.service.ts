import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  getProductos(){
    return this.http.get<IrepBackend>(`http://localhost:3000/produ/muestraProductos`)
  }

  bajaProducto(id_producto: number){
    return this.http.post<IrepBackend>(`http://localhost:3000/produ/bajaProducto`,{id_producto: id_producto})
  }

  agregarProducto(dataForm:{}){
    return this.http.post<IrepBackend>(`http://localhost:3000/produ/agregarproducto`,dataForm,{})
  }

  updateProducto(dataForm:{}){
    return this.http.post<IrepBackend>(`http://localhost:3000/produ/updateproducto`,dataForm,{})
  }

  muestraProducto(id_producto: number){
    return this.http.post<IrepBackend>(`http://localhost:3000/produ/muestraProductos`,{id_producto: id_producto})
  }

}
