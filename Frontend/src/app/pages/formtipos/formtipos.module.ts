import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormtiposComponent } from './formtipos.component';
import { FormtiposRoutingModule } from './formtipos-routing.module';
@NgModule({
  declarations: [
    FormtiposComponent
  ],
  imports: [
    CommonModule,
    FormtiposRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    FormtiposComponent
  ]
})
export class FormtiposModule { }
