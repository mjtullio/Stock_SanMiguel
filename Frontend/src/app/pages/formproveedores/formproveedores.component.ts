import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-formproveedores',
  templateUrl: './formproveedores.component.html',
  styleUrls: ['./formproveedores.component.css'],
})
export class FormproveedoresComponent implements OnInit {

  formProveedores = this.fb.group({
    nombre: ["", Validators.required],
    localidad: ["", Validators.required],
    telefono: ["", Validators.required],
    email: ["", Validators.required],
    cuil_cuit: ["", Validators.required],
    activo: [1]
    // activo: ["", Validators.required]

  })

  constructor(private _ProveedoresService: ProveedoresService, private authService: AuthService, public router: Router, public fb: FormBuilder) { }

  agregarProveedor() {
    if (this.formProveedores.valid) {
      this._ProveedoresService.agregarProveedor(this.formProveedores.value).subscribe(resp => {
        console.log(resp);
        alert("Proveedor agregado");
        //window.location.reload();
        this.router.navigate(['/proveedores']);


      },
        error => {
          console.log(error);

        }


      )
    }

  }


  ngOnInit(): void {
  }

}
