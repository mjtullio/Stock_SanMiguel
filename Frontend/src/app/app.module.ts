import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './pages/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { PedidosproveedoresComponent } from './pages/pedidosproveedores/pedidosproveedores.component';
import { StockComponent } from './pages/stock/stock.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PedidosventaComponent } from './pages/pedidosventa/pedidosventa.component';
import { TiposComponent } from './pages/tipos/tipos.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProveedoresComponent,
    PedidosproveedoresComponent,
    StockComponent,
    ProductosComponent,
    PedidosventaComponent,
    TiposComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
