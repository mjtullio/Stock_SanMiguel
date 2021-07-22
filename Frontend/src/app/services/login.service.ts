import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  rutaApi:string = environment.urlApi

  login(loginForm:{}){
    return this.http.post<IrepBackend>(`${this.rutaApi}/users/login`, loginForm)
  }  

}