import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';



@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  providers: [ProveedoresService]
})
export class ProveedoresComponent implements OnInit {

  public datosTabla: any= [];


  constructor(private _ProveedoresService: ProveedoresService, private authService: AuthService, public router: Router) {


  }


  // listaTabla() {
  //   this._ProveedoresService.getProveedores().subscribe(resp => {
  //     if(resp.mensaje =="proveedores encontrados"){
  //       localStorage.setItem("token", resp.token);
  //       this.authService.authenticate()
  //       this.router.navigate(['/proveedores'])
  //     }
  //     else{
  //       console.log(resp)
  //       console.log("estado auth", this.authService.authState)
  //     }
  //     this.datosTabla = resp.data;
  //   }


  //   )
  // }

  displayedColumns: string[] = ['numero', 'nombre', 'localidad', 'telefono', 'email', 'cuit', 'activo','acciones'];
  dataSource = this.datosTabla;



  ngOnInit(): void {
    this._ProveedoresService.getProveedores().subscribe(resp => {
      this.datosTabla = resp.data;

    }


    )
  }

  display = false;
  onPress() {
    this.display = true;
    /*if you want the component to show and hide on click pressed, use 
    use this line
    this.display = !this.display;*/
  }

}

const ELEMENT_DATA = [
  { position: 1, name: 'TUVIEJA', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


// const ELEMET_DATA = this.ProveedoresService.getProveedores();