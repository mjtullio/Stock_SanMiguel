import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class ProductosModule { }
