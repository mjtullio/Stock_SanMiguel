import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';





@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class StockModule { }
