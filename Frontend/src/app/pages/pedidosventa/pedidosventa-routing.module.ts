import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosventaComponent } from './pedidosventa.component';

const routes: Routes = [
  {path: "", component:PedidosventaComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosventaRoutingModule { }
