import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';

@Injectable({
  providedIn: 'root'
})
export class PedidosproveedoresService {

  constructor(private http:HttpClient) { } 
  
  getPedidosProv(){
    return this.http.get<IrepBackend>(`http://localhost:3000/pedidosprov/muestraPedidos`)
  }

  agregarPedidoProv(dataForm:{}){
    return this.http.post<IrepBackend>(`http://localhost:3000/pedidosprov/agregarPedidoProv`,dataForm,{})
  }

  modificaPedidoProv(dataForm:{}){
    return this.http.post<IrepBackend>(`http://localhost:3000/pedidosprov/modificaPedidoProv`,dataForm,{})
  }

  muestraPedidosProv(id_proveedor: number){
    return this.http.post<IrepBackend>(`http://localhost:3000/pedidosprov/muestraPedidoProv`,{id_proveedor: id_proveedor})
  }
  sendFile(dataForm:{}){
    return this.http.post(`http://localhost:3000/post/upload`, dataForm,{})
  }
}
