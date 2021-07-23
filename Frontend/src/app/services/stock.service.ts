import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }

  getStock(){
    return this.http.get<IrepBackend>(`http://localhost:3000/stock/muestraStock`)
  }

}
