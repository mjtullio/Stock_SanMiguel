import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DetallesService } from 'src/app/services/detalles.service';
import { PedidosventasService } from 'src/app/services/pedidosventas.service';
@Component({
  selector: 'app-pedidosventa',
  templateUrl: './pedidosventa.component.html',
  styleUrls: ['./pedidosventa.component.css'],
  providers: [PedidosventasService , DetallesService]
})
export class PedidosventaComponent implements OnInit {
  public datosTabla: any = [];

  constructor(private _PedidosventasService: PedidosventasService,private authService: AuthService, public router: Router, public fb: FormBuilder, private _DetallesService: DetallesService ) { }

  formPedidosVentas = this.fb.group({
    id_pedidos_ventas: ["", Validators.required],
    id_proveedor: 7, 
    importe: ["", Validators.required], 
    fecha: ["", Validators.required], 
    observacion: ["", Validators.required]
  })

  formDetallesPedido = this.fb.group({
    id_pedido: ["", Validators.required] , 
    id_tipo: "VENT" , 
    id_producto: ["", Validators.required] , 
    cantidad: ["", Validators.required] , precio_unitario: ["", Validators.required]
  })
  displayedColumns: string[] = ['id_pedidos_ventas', 'id_tipo', 'importe' , 'fecha', 'observacion', 'id_usuario', 'cantidad_detalles','acciones'];
  dataSource = this.datosTabla;

  editarPedidosVent(id_pedidos_ventas: number){
    
    this._PedidosventasService.muestraPedidosVent(id_pedidos_ventas).subscribe((resp:any)=>{
      
      const data = resp.data[0]
      
      this.formPedidosVentas.get('id_pedidos_ventas')?.setValue(data.id_pedidos_ventas);
      this.formPedidosVentas.get('importe')?.setValue(data.importe);
      this.formPedidosVentas.get('fecha')?.setValue(data.fecha);
      this.formPedidosVentas.get('observacion')?.setValue(data.observacion);
      //console.log(resp.data);
      
    })
  }

  actualizaPedidosVent() {
    
    console.log (this.formPedidosVentas.value)
    if (this.formPedidosVentas.valid) {
     
      this._PedidosventasService.modificaPedidoVent(this.formPedidosVentas.value).subscribe(resp => {
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

 
  ngOnInit(): void {
    this._PedidosventasService.getPedidosVent().subscribe(resp => {
      this.datosTabla = resp.data;

    }
    )
  }
  display = false;

  displayupdate = false;
  displaydetalles = false;
  
  onPressA() {
    this.display = true;
    this.displayupdate = false;
    this.displaydetalles = false;
    
  }
  
  onPressE(id_pedidos_ventas: number) {
    
    this.displayupdate = true;
    this.display = false;
    
    this.displaydetalles = false;
    console.log(id_pedidos_ventas);
    
    this.editarPedidosVent(id_pedidos_ventas);
  
  }

  
  onPressD(id_pedidos_ventas: number) {
    
    this.displayupdate = false;
    this.display = false;
    this.displaydetalles = true;
    
    console.log(id_pedidos_ventas);
    
    this.formDetallesPedido.get('id_pedido')?.setValue(id_pedidos_ventas);
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

  eliminar(id_pedidos_ventas: number){
    var r = confirm("¿Borrar Pedido?");
    if (r == true) {
      this._PedidosventasService.eliminarPedidoVentas(id_pedidos_ventas).subscribe(resp => {
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



