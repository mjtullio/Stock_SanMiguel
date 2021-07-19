import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import { PedidosproveedoresRoutingModule } from './pedidosproveedores-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PedidosproveedoresRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class PedidosproveedoresModule { }
