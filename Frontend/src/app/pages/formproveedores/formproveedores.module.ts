import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { FormproveedoresRoutingModule } from './formproveedores-routing.module';
import { FormproveedoresComponent } from './formproveedores.component';


@NgModule({
  declarations: [
    FormproveedoresComponent
  ],
  imports: [
    CommonModule,
    FormproveedoresRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    FormproveedoresComponent
  ]
})
export class FormproveedoresModule { }
