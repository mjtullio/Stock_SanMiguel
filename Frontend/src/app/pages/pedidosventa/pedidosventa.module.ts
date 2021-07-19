import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosventaRoutingModule } from './pedidosventa-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    PedidosventaRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class PedidosventaModule { }
