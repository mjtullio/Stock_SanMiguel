import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { TiposComponent } from './tipos.component';
import { TiposRoutingModule } from './tipos-routing.module';


@NgModule({
  declarations: [
    TiposComponent
  ],
  imports: [
    CommonModule,
    TiposRoutingModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    TiposComponent
  ]
})
export class TiposModule { }
