import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';
import { FormproveedoresModule } from '../formproveedores/formproveedores.module';
import { FormproveedoresupdateModule } from '../formproveedoresupdate/formproveedoresupdate.module';

@NgModule({
  declarations: [
    ProveedoresComponent,
  
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    MatTableModule,
    MatButtonModule,
    FormproveedoresModule,
    FormproveedoresupdateModule
  ],
  exports: [
    ProveedoresComponent
  ]
})
export class ProveedoresModule { }
