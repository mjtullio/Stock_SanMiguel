import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosproveedoresComponent } from './pedidosproveedores.component';

const routes: Routes = [
  {path: "", component:PedidosproveedoresComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosproveedoresRoutingModule { }
