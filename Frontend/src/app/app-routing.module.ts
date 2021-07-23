import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
import { LoginModule } from './pages/login/login.module';
import { StockModule } from 'src/app/pages/stock/stock.module';
import { ProductosModule } from 'src/app/pages/productos/productos.module';
import { ProveedoresModule } from 'src/app/pages/proveedores/proveedores.module';
import { PedidosproveedoresModule } from 'src/app/pages/pedidosproveedores/pedidosproveedores.module';
import { PedidosventaModule } from 'src/app/pages/pedidosventa/pedidosventa.module';
import { TiposModule } from 'src/app/pages/tipos/tipos.module';
import { FormproveedoresModule } from 'src/app/pages/formproveedores/formproveedores.module';
import { FormproveedoresupdateModule } from 'src/app/pages/formproveedoresupdate/formproveedoresupdate.module';

const routes: Routes = [
  {
    path:"login",
    loadChildren:()=> import('src/app/pages/login/login.module').then(m=>LoginModule)
  },
  {
    path:"stock",
    loadChildren:()=> import('src/app/pages/stock/stock.module').then(m=>StockModule)
  },
  {
    path:"productos",
    loadChildren:()=> import('src/app/pages/productos/productos.module').then(m=>ProductosModule)
  },

  {
    path:"proveedores",
    loadChildren:()=> import('src/app/pages/proveedores/proveedores.module').then(m=>ProveedoresModule)
  },

  {
    path:"pedidosproveedores",
    loadChildren:()=> import('src/app/pages/pedidosproveedores/pedidosproveedores.module').then(m=>PedidosproveedoresModule)
  },

  {
    path:"pedidosventa",
    loadChildren:()=> import('src/app/pages/pedidosventa/pedidosventa.module').then(m=>PedidosventaModule)
  },

  {
    path:"tipos",
    loadChildren:()=> import('src/app/pages/tipos/tipos.module').then(m=>TiposModule)
  },

  {
    path:"formproveedores",
    loadChildren:()=> import('src/app/pages/formproveedores/formproveedores.module').then(m=>FormproveedoresModule)
  },

  {
    path:"formproveedoresupdate",
    loadChildren:()=> import('src/app/pages/formproveedoresupdate/formproveedoresupdate.module').then(m=>FormproveedoresupdateModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
