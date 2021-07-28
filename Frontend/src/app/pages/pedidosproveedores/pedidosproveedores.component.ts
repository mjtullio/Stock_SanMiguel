import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PedidosproveedoresService } from 'src/app/services/pedidosproveedores.service';
import { DetallesService } from 'src/app/services/detalles.service';

@Component({
  selector: 'app-pedidosproveedores',
  templateUrl: './pedidosproveedores.component.html',
  styleUrls: ['./pedidosproveedores.component.css'],
  providers: [PedidosproveedoresService , DetallesService]
})
export class PedidosproveedoresComponent implements OnInit {
  public datosTabla: any = [];

  constructor(private _PedidosproveedoresService: PedidosproveedoresService,private authService: AuthService, public router: Router, public fb: FormBuilder, private _DetallesService: DetallesService ) { }

  formPedidosProveedores = this.fb.group({
    id_pedidos_proveedores: ["", Validators.required],
    id_proveedor: ["", Validators.required], 
    importe: ["", Validators.required], 
    fecha: ["", Validators.required], 
    observacion: ["", Validators.required]
  })

  formDetallesPedido = this.fb.group({
    id_pedido: ["", Validators.required] , 
    id_tipo: "PROV" , 
    id_producto: ["", Validators.required] , 
    cantidad: ["", Validators.required] , precio_unitario: ["", Validators.required]
  })
  formImagen  = this.fb.group({
    id_proveedor: ["", Validators.required], 
    id_pedidos_proveedores: ["", Validators.required], 
  })
  displayedColumns: string[] = ['id_pedidos_proveedores','id_proveedor', 'id_tipo', 'importe' , 'fecha', 'observacion','path_imagen', 'id_usuario', 'cantidad_detalles','acciones'];
  dataSource = this.datosTabla;

  editarPedidosProv(id_pedidos_proveedores: number){
    
    this._PedidosproveedoresService.muestraPedidosProv(id_pedidos_proveedores).subscribe((resp:any)=>{
      
      const data = resp.data[0]
      
      this.formPedidosProveedores.get('id_pedidos_proveedores')?.setValue(data.id_pedidos_proveedores);
      this.formPedidosProveedores.get('id_proveedor')?.setValue(data.id_proveedor);
      this.formPedidosProveedores.get('importe')?.setValue(data.importe);
      this.formPedidosProveedores.get('fecha')?.setValue(data.fecha);
      this.formPedidosProveedores.get('observacion')?.setValue(data.observacion);
      //console.log(resp.data);
      
    })
  }

  actualizaPedidosProv() {
    
    console.log (this.formPedidosProveedores.value)
    if (this.formPedidosProveedores.valid) {
     
      this._PedidosproveedoresService.modificaPedidoProv(this.formPedidosProveedores.value).subscribe(resp => {
        console.log(resp);
        alert("Pedido Proveedor actualizado");
        window.location.reload();
        //this.router.navigate(['/proveedores']);
        
      },
        error => {
          console.log(error);
  
        }
  
  
      )
    }
    
  }

  fileName=""
  file:any

  private validar(event:any):Boolean{
    const maxSize = 500000;
    this.file = event.target.files
    console.log(this.file);
    
    //  this.fileName = event.target.files[0].name
    // console.log(this.fileName)
    if(this.file.length < 0){
      console.log("No se adjunto ningun archivo")
      this.file = "";
      alert ("Error en validacion");
      return false
    }

    if(this.file[0].size > maxSize){
      console.log("ha superado el tamaño permitido")
      this.file = ""
      alert ("Error en validacion");
      return false
    }

    if(this.file[0].type != 'image/jpeg'){
      console.log("El formato no es el permitido")
      this.file = ""
      alert ("Error en validacion");
      return false
    }

    return true

  }
  ngOnInit(): void {
    this._PedidosproveedoresService.getPedidosProv().subscribe(resp => {
      this.datosTabla = resp.data;

    }
    )
  }
  display = false;

  displayupdate = false;
  displaydetalles = false;
  displayimagen = false;
  onPressA() {
    this.display = true;
    this.displayupdate = false;
    this.displaydetalles = false;
    this.displayimagen = false;
  }
  
  onPressE(id_pedidos_proveedores: number) {
    
    this.displayupdate = true;
    this.display = false;
    this.displayimagen = false;
    this.displaydetalles = false;
    console.log(id_pedidos_proveedores);
    
    this.editarPedidosProv(id_pedidos_proveedores);
  
  }

  
  onPressD(id_pedidos_proveedores: number) {
    
    this.displayupdate = false;
    this.display = false;
    this.displaydetalles = true;
    this.displayimagen = false;
    console.log(id_pedidos_proveedores);
    
    this.formDetallesPedido.get('id_pedido')?.setValue(id_pedidos_proveedores);
    console.log(this.formDetallesPedido)
    //_DetallesService
  }

  
  agregarDetallesPedido() {
    console.log(this.formDetallesPedido)
    if (this.formDetallesPedido.valid) {
      this._DetallesService.agregarDetalle(this.formDetallesPedido.value).subscribe(resp => {
        console.log(resp);
        alert("Detalles agregado");
        window.location.reload();
        
      },
        error => {
          console.log(error);
        }
      )
    }

  }

  onPressI(id_pedidos_proveedores: number , idProveedor: number) {
    
    this.displayupdate = false;
    this.display = false;
    this.displaydetalles = false;
    this.displayimagen = true;
    
    // this.formDetallesPedido.get('id_pedidos_proveedores')?.setValue(id_pedidos_proveedores);
    // this.formDetallesPedido.get('id_proveedor')?.setValue(idProveedor);
    this.fileName = idProveedor+"_"+id_pedidos_proveedores;
    console.log (this.fileName)
  }

  onFileChange(event:any){
    console.log(event)
    const validacion = this.validar(event)

    if(validacion){
      let file = new FormData()
      file.append('imagen', this.file[0], this.fileName);

      console.log(file)
      this._PedidosproveedoresService.sendFile(file).subscribe(resp=>{
        console.log(resp)
      })
    }

  }
  eliminar(id_pedidos_proveedores: number){
    var r = confirm("¿Borrar Pedido?");
    if (r == true) {
      this._PedidosproveedoresService.eliminarPedidoProveedores(id_pedidos_proveedores).subscribe(resp => {
        console.log(resp);
        alert("Pedido eliminado");
        window.location.reload();
        
      },
        error => {
          console.log(error);
        }
      )
    }
  }

}



