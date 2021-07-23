import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormproveedoresupdateRoutingModule } from './formproveedoresupdate-routing.module';
import { FormproveedoresupdateComponent } from './formproveedoresupdate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    FormproveedoresupdateComponent
  ],
  imports: [
    CommonModule,
    FormproveedoresupdateRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    FormproveedoresupdateComponent
  ]
})
export class FormproveedoresupdateModule { }
