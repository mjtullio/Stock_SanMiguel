import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/services/proveedores.service';


@Component({
  selector: 'app-formproveedoresupdate',
  templateUrl: './formproveedoresupdate.component.html',
  styleUrls: ['./formproveedoresupdate.component.css']
})
export class FormproveedoresupdateComponent implements OnInit {

  formProveedores = this.fb.group({
    nombre: ["", Validators.required],
    localidad: ["", Validators.required],
    telefono: ["", Validators.required],
    email: ["", Validators.required],
    cuil_cuit: ["", Validators.required],
    activo: [1]
    // activo: ["", Validators.required]

  })

  constructor(private _ProveedoresService: ProveedoresService, private authService: AuthService, public router: Router, public fb: FormBuilder, public activateRoute: ActivatedRoute) { }

  actualizaProveedor() {
    if (this.formProveedores.valid) {
      this._ProveedoresService.updateProveedor(this.formProveedores.value).subscribe(resp => {
        console.log(resp);
        alert("Proveedor actualizado");
        window.location.reload();
        // this.router.navigate(['/proveedores']);


      },
        error => {
          console.log(error);
  
        }
  
  
      )
    }
    
  }

  editarProveedor(idProveedor: number){
    this._ProveedoresService.muestraProveedor(idProveedor).subscribe((resp:any)=>{
      this.formProveedores.get('nombre')?.setValue(resp.data.nombre);
      this.formProveedores.get('localidad')?.setValue(resp.data.localidad);
      this.formProveedores.get('cuil_cuit')?.setValue(resp.data.cuil_cuit);
      this.formProveedores.get('email')?.setValue(resp.data.email);
      this.formProveedores.get('telefono')?.setValue(resp.data.telefono);

    })
  }



  ngOnInit(): void {


    const ob:any = this.activateRoute.snapshot.paramMap.get('idProveedor');
    
    this._ProveedoresService.muestraProveedor(ob).subscribe((resp:any)=>{
      this.formProveedores.get('nombre')?.setValue(resp.data.nombre);
      this.formProveedores.get('localidad')?.setValue(resp.data.localidad);
      this.formProveedores.get('cuil_cuit')?.setValue(resp.data.cuil_cuit);
      this.formProveedores.get('email')?.setValue(resp.data.email);
      this.formProveedores.get('telefono')?.setValue(resp.data.telefono);

    })
  }

}
