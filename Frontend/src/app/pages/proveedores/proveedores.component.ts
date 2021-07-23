import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  providers: [ProveedoresService]
})
export class ProveedoresComponent implements OnInit {

  public datosTabla: any = [];


  constructor(private _ProveedoresService: ProveedoresService, private authService: AuthService, public router: Router, public fb: FormBuilder) { }

  
  formProveedores = this.fb.group({
    nombre: ["", Validators.required],
    localidad: ["", Validators.required],
    telefono: ["", Validators.required],
    email: ["", Validators.required],
    cuit: ["", Validators.required],
    // activo: [1]
    activo: ["", Validators.required]

  })

  displayedColumns: string[] = ['numero', 'nombre', 'localidad', 'telefono', 'email', 'cuit', 'activo', 'acciones'];
  dataSource = this.datosTabla;

  bajaProveedor(idProveedor: number) {
    var txt;
    var r = confirm("¿Borrar proveedor?");
    if (r == true) {
      this._ProveedoresService.bajaProveedor(idProveedor).subscribe(resp => {
        console.log(resp);
        alert("Proveedor dado de baja")
        window.location.reload();
  
      },
        error => {
          console.log(error);
  
        }
  
  
      )
    }



  }

  ngOnInit(): void {
    this._ProveedoresService.getProveedores().subscribe(resp => {
      this.datosTabla = resp.data;

    }


    )
  }

  display = false;
  onPressA() {
    this.display = true;
    this.displayupdate = false;

    /*if you want the component to show and hide on click pressed, use 
    use this line
    this.display = !this.display;*/
  }


datos={};
  displayupdate = false;
  onPressE(idProveedor: number) {
    this.datos ={
      id_proveedor:idProveedor
    }


    this.displayupdate = true;
    this.display = false;
    // const jsonToString = JSON.stringify(this.datos);
    console.log(this.datos);
    
    this.router.navigate([`/formproveedoresupdate/${this.datos}`])
    /*if you want the component to show and hide on click pressed, use 
    use this line
    this.display = !this.display;*/
  }

}
