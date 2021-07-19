import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { StockComponent } from './pages/stock/stock.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { PedidosproveedoresComponent } from './pages/pedidosproveedores/pedidosproveedores.component';
import { PedidosventaComponent } from './pages/pedidosventa/pedidosventa.component';
import { TiposComponent } from './pages/tipos/tipos.component';

const routes: Routes = [
  {
    path: "login", component: LoginComponent
  },

  {
    path: "stock", component: StockComponent
  },

  {
    path: "productos", component: ProductosComponent
  },

  {
    path: "proveedores", component: ProveedoresComponent
  },

  {
    path: "pedidosproveedores", component: PedidosproveedoresComponent
  },

  {
    path: "pedidosventa", component: PedidosventaComponent
  },

  {
    path: "tipos", component: TiposComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
