import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]

})

export class ProductosComponent implements OnInit {

  public datosTabla: any = [];


  constructor(private _ProductosService: ProductosService, private authService: AuthService, public router: Router, public fb: FormBuilder) { }


  formProductos = this.fb.group({
    id_producto: ["", Validators.required],
    nombre: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
    id_tipo: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
    id_proveedor: ["", Validators.required],
    peso: ["", Validators.required],
    precio: ["", Validators.required],
    activo: [1]
    // activo: ["", Validators.required]

  })

  bajaProducto(idProducto: number) {
    var txt;
    var r = confirm("¿Borrar producto?");
    if (r == true) {
      this._ProductosService.bajaProducto(idProducto).subscribe(resp => {
        console.log(resp);
        alert("Producto dado de baja")
       
        this.ngOnInit()
           
  
        
      },
        error => {
          console.log(error);

        }
      )
    }
  }

  displayedColumns: string[] = ['id_producto', 'nombre', 'id_tipo', 'id_proveedor', 'peso', 'precio', 'activo', 'acciones'];
  dataSource = this.datosTabla;

  editarProducto(idProducto: number){
    this._ProductosService.muestraProducto(idProducto).subscribe((resp:any)=>{
      const data = resp.data[0]
      this.formProductos.get('id_producto')?.setValue(data.id_producto);
      this.formProductos.get('nombre')?.setValue(data.nombre);
      this.formProductos.get('id_tipo')?.setValue(data.id_tipo);
      this.formProductos.get('id_proveedor')?.setValue(data.id_proveedor);
      this.formProductos.get('peso')?.setValue(data.peso);
      this.formProductos.get('precio')?.setValue(data.precio);
      this.formProductos.get('activo')?.setValue(data.activo);
      console.log(resp.data);
      
    })
  }

  actualizaProducto() {
    
    console.log (this.formProductos.value)
    if (this.formProductos.valid) {
      
      this._ProductosService.updateProducto(this.formProductos.value).subscribe(resp => {
        console.log(resp);
        alert("Producto actualizado");
        this.ngOnInit()
        
      },
        error => {
          console.log(error);
  
        }
  
  
      )
    }
    
  }

  ngOnInit(): void {
    this._ProductosService.getProductos().subscribe(resp => {
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
  onPressE(idProducto: number) {
    
    this.displayupdate = true;
    this.display = false;

    this.editarProducto(idProducto);
    /*if you want the component to show and hide on click pressed, use 
    use this line
    this.display = !this.display;*/
  }

}
