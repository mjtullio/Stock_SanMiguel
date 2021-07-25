import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';
@Injectable({
  providedIn: 'root'
})
export class PedidosventasService {

  constructor(private http:HttpClient) { } 
  
  getPedidosVent(){
    return this.http.get<IrepBackend>(`http://localhost:3000/pedidosvent/muestraPedidos`)
  }

  agregarPedidoVent(dataForm:{}){
    return this.http.post<IrepBackend>(`http://localhost:3000/pedidosvent/AgregaPedidoVent`,dataForm,{})
  }

  modificaPedidoVent(dataForm:{}){
    return this.http.post<IrepBackend>(`http://localhost:3000/pedidosvent/modificaPedidoVent`,dataForm,{})
  }

  muestraPedidosVent(id_pedidos_ventas: number){
    return this.http.post<IrepBackend>(`http://localhost:3000/pedidosvent/muestraPedidoVent`,{id_pedidos_ventas: id_pedidos_ventas})
  }
 
  eliminarPedidoVentas(id_pedidos_ventas: number){
    return this.http.post<IrepBackend>(`http://localhost:3000/pedidosvent/eliminarPedidoVent`,{id_pedidos_ventas: id_pedidos_ventas})
  }
}
