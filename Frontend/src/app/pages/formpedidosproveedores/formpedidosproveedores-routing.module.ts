import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormpedidosproveedoresComponent } from './formpedidosproveedores.component';

const routes: Routes = [
    {path: "", component:FormpedidosproveedoresComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormpedidosproveedoresRoutingModule { }
