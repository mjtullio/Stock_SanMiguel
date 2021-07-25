import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosventaRoutingModule } from './pedidosventa-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { PedidosventaComponent } from './pedidosventa.component';
import { FormpedidosventasModule } from '../formpedidosventas/formpedidosventas.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    PedidosventaComponent
  ],
  imports: [
    CommonModule,
    PedidosventaRoutingModule,
    MatTableModule,
    MatButtonModule,
    FormpedidosventasModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    PedidosventaComponent
  ]
})
export class PedidosventaModule { }
