import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { PedidosproveedoresComponent } from './pedidosproveedores.component';

import { PedidosproveedoresRoutingModule } from './pedidosproveedores-routing.module';
import { FormpedidosproveedoresModule } from '../formpedidosproveedores/formpedidosproveedores.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    PedidosproveedoresComponent
  ],
  imports: [
    CommonModule,
    PedidosproveedoresRoutingModule,
    MatTableModule,
    MatButtonModule,
    FormpedidosproveedoresModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    PedidosproveedoresComponent
  ]
})
export class PedidosproveedoresModule { }
