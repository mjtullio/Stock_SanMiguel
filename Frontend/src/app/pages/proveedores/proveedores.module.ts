import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { ProveedoresRoutingModule } from './proveedores-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class ProveedoresModule { }
