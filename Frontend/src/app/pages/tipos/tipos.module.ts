import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { TiposComponent } from './tipos.component';
import { TiposRoutingModule } from './tipos-routing.module';
import { FormtiposModule } from '../formtipos/formtipos.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    TiposComponent
  ],
  imports: [
    CommonModule,
    TiposRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FormtiposModule
  ],
  exports: [
    TiposComponent
  ]
})
export class TiposModule { }
