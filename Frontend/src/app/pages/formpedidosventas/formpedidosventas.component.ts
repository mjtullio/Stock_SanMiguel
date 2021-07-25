import { Component, OnInit } from '@angular/core';
import { PedidosventasService } from 'src/app/services/pedidosventas.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-formpedidosventas',
  templateUrl: './formpedidosventas.component.html',
  styleUrls: ['./formpedidosventas.component.css']
})
export class FormpedidosventasComponent implements OnInit {
  
  formPedidosVentas = this.fb.group({  
    id_proveedor: 7,
    importe: ["", Validators.required], 
    fecha: ["", Validators.required], 
    observacion: ["", Validators.required], 
    id_usuario: ["", Validators.required]
  })
  constructor(private _PedidosventasService: PedidosventasService, private authService: AuthService, public router: Router, public fb: FormBuilder) { }

  agregarPedidoVentas() {
    if (this.formPedidosVentas.valid) {
      this._PedidosventasService.agregarPedidoVent(this.formPedidosVentas.value).subscribe(resp => {
        console.log(resp);
        alert("Pedido Ventas agregado");
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
