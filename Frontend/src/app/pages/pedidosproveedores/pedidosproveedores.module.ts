import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { PedidosproveedoresComponent } from './pedidosproveedores.component';

import { PedidosproveedoresRoutingModule } from './pedidosproveedores-routing.module';


@NgModule({
  declarations: [
    PedidosproveedoresComponent
  ],
  imports: [
    CommonModule,
    PedidosproveedoresRoutingModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    PedidosproveedoresComponent
  ]
})
export class PedidosproveedoresModule { }
