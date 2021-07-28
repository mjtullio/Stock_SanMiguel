import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, NumberValueAccessor } from '@angular/forms';
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
    id_proveedor: ["", Validators.required],
    nombre: ["", Validators.required],
    localidad: ["", Validators.required],
    telefono: ["", Validators.required],
    email: ["", Validators.required],
    cuil_cuit: ["", Validators.required],
    activo: [1]
    //activo: ["", Validators.required]

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
        this.ngOnInit()
  
      },
        error => {
          console.log(error);
  
        }
  
  
      )
    }



  }
  editarProveedor(idProveedor: number){
    this._ProveedoresService.muestraProveedor(idProveedor).subscribe((resp:any)=>{
      const data = resp.data[0]
      this.formProveedores.get('id_proveedor')?.setValue(data.id_proveedor);
      this.formProveedores.get('nombre')?.setValue(data.nombre);
      this.formProveedores.get('localidad')?.setValue(data.localidad);
      this.formProveedores.get('cuil_cuit')?.setValue(data.cuil_cuit);
      this.formProveedores.get('email')?.setValue(data.email);
      this.formProveedores.get('telefono')?.setValue(data.telefono);
      console.log(resp.data);
      
      
    })
  }
  actualizaProveedor() {
    
    console.log (this.formProveedores.value)
    if (this.formProveedores.valid) {
      
      this._ProveedoresService.updateProveedor(this.formProveedores.value).subscribe(resp => {
        console.log(resp);
        alert("Proveedor actualizado");
        this.ngOnInit()
        
        
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

  displayupdate = false;
  onPressE(idProveedor: number) {
    
    this.displayupdate = true;
    this.display = false;

    this.editarProveedor(idProveedor);
    /*if you want the component to show and hide on click pressed, use 
    use this line
    this.display = !this.display;*/
  }

}
