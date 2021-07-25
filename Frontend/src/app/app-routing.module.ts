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
import { AuthGuard } from './guards/auth.guard';
import { FormtiposModule } from './pages/formtipos/formtipos.module';
import { FormpedidosproveedoresModule } from './pages/formpedidosproveedores/formpedidosproveedores.module';
import { FormpedidosventasModule } from './pages/formpedidosventas/formpedidosventas.module';

const routes: Routes = [
  {
    path:"login",
    loadChildren:()=> import('src/app/pages/login/login.module').then(m=>LoginModule)
  },
  {
    path:"stock",
    loadChildren:()=> import('src/app/pages/stock/stock.module').then(m=>StockModule),
    // canActivate:[AuthGuard]
  },
  {
    path:"productos",
    loadChildren:()=> import('src/app/pages/productos/productos.module').then(m=>ProductosModule),
    // canActivate:[AuthGuard]
  },

  {
    path:"proveedores",
    loadChildren:()=> import('src/app/pages/proveedores/proveedores.module').then(m=>ProveedoresModule),
  },

  {
    path:"pedidosproveedores",
    loadChildren:()=> import('src/app/pages/pedidosproveedores/pedidosproveedores.module').then(m=>PedidosproveedoresModule),
    // canActivate:[AuthGuard]
  },

  {
    path:"pedidosventa",
    loadChildren:()=> import('src/app/pages/pedidosventa/pedidosventa.module').then(m=>PedidosventaModule),
    // canActivate:[AuthGuard]
  },

  {
    path:"tipos",
    loadChildren:()=> import('src/app/pages/tipos/tipos.module').then(m=>TiposModule),
    // canActivate:[AuthGuard]
  },

  {
    path:"formproveedores",
    loadChildren:()=> import('src/app/pages/formproveedores/formproveedores.module').then(m=>FormproveedoresModule),
    //canActivate:[AuthGuard]
  },

  {
    path:"formtipos",
    loadChildren:()=> import('src/app/pages/formtipos/formtipos.module').then(m=>FormtiposModule),
    //canActivate:[AuthGuard]
  },

  {
    path:"formpedidosproveedores",
    loadChildren:()=> import('src/app/pages/formpedidosproveedores/formpedidosproveedores.module').then(m=>FormpedidosproveedoresModule),
    //canActivate:[AuthGuard]
  },

  {
    path:"formpedidosventas",
    loadChildren:()=> import('src/app/pages/formpedidosventas/formpedidosventas.module').then(m=>FormpedidosventasModule),
    //canActivate:[AuthGuard]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
