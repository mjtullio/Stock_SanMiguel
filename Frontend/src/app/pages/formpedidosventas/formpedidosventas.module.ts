import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormpedidosventasRoutingModule } from './formpedidosventas-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormpedidosventasComponent } from './formpedidosventas.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    FormpedidosventasComponent
  ],
  imports: [
    CommonModule,
    FormpedidosventasRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  exports: [
    FormpedidosventasComponent
  ]
})
export class FormpedidosventasModule { }
