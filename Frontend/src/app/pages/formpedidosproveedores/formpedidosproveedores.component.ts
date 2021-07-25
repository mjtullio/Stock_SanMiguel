import { Component, OnInit } from '@angular/core';
import { PedidosproveedoresService } from 'src/app/services/pedidosproveedores.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-formpedidosproveedores',
  templateUrl: './formpedidosproveedores.component.html',
  styleUrls: ['./formpedidosproveedores.component.css']
})
export class FormpedidosproveedoresComponent implements OnInit {
  
  formPedidosProveedores = this.fb.group({  
    id_proveedor: ["", Validators.required],
    importe: ["", Validators.required], 
    fecha: ["", Validators.required], 
    observacion: ["", Validators.required], 
    id_usuario: ["", Validators.required]
  })
  constructor(private _PedidosproveedoresService: PedidosproveedoresService, private authService: AuthService, public router: Router, public fb: FormBuilder ) { }

  agregarPedidoProveedores() {
    if (this.formPedidosProveedores.valid) {
      this._PedidosproveedoresService.agregarPedidoProv(this.formPedidosProveedores.value).subscribe(resp => {
        console.log(resp);
        alert("Pedido Proveedor agregado");
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
