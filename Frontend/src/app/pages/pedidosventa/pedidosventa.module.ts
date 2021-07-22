import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosventaRoutingModule } from './pedidosventa-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { PedidosventaComponent } from './pedidosventa.component';

@NgModule({
  declarations: [
    PedidosventaComponent
  ],
  imports: [
    CommonModule,
    PedidosventaRoutingModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    PedidosventaComponent
  ]
})
export class PedidosventaModule { }
