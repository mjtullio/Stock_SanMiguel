import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';

@NgModule({
  declarations: [
    ProveedoresComponent,
  
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    ProveedoresComponent
  ]
})
export class ProveedoresModule { }
