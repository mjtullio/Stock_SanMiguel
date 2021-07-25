import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormpedidosventasComponent } from './formpedidosventas.component';
const routes: Routes = [
  {path: "", component:FormpedidosventasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormpedidosventasRoutingModule { }
