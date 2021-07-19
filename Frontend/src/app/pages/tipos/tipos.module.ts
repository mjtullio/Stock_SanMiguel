import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import { TiposRoutingModule } from './tipos-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TiposRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class TiposModule { }
