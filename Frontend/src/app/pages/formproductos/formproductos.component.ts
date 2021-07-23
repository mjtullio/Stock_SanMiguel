import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProductosService } from 'src/app/services/productos.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-formproductos',
  templateUrl: './formproductos.component.html',
  styleUrls: ['./formproductos.component.css']
})
export class FormproductosComponent implements OnInit {

  formProductos = this.fb.group({
    nombre: ["", Validators.required],
    id_tipo: ["", Validators.required],
    id_proveedor: ["", Validators.required],
    peso: ["", Validators.required],
    precio: ["", Validators.required],
    activo: [1]
    // activo: ["", Validators.required]

  })

  constructor(private _ProductosService: ProductosService, private authService: AuthService, public router: Router, public fb: FormBuilder) { }

  agregarProducto() {
    if (this.formProductos.valid) {
      this._ProductosService.agregarProducto(this.formProductos.value).subscribe(resp => {
        console.log(resp);
        alert("Producto agregado");
        window.location.reload();
        // this.router.navigate(['/productos']);


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
