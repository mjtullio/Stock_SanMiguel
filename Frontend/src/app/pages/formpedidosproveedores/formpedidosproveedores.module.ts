import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormpedidosproveedoresRoutingModule } from './formpedidosproveedores-routing.module';
import { FormpedidosproveedoresComponent } from './formpedidosproveedores.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    FormpedidosproveedoresComponent
  ],
  imports: [
    CommonModule,
    FormpedidosproveedoresRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  exports: [
    FormpedidosproveedoresComponent
  ]
})
export class FormpedidosproveedoresModule { }
