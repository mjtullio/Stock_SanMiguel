import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarModule } from './components/navbar/navbar.module';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
// import { FormularioproveedoresModule } from './pages/formularioproveedores/formularioproveedores.module';
import { LoginModule } from './pages/login/login.module';
import { PedidosproveedoresModule } from './pages/pedidosproveedores/pedidosproveedores.module';
import { PedidosventaModule } from './pages/pedidosventa/pedidosventa.module';
import { ProductosModule } from './pages/productos/productos.module';
import { ProveedoresModule } from './pages/proveedores/proveedores.module';
import { StockModule } from './pages/stock/stock.module';
import { TiposModule } from './pages/tipos/tipos.module';
import { FormproveedoresModule } from './pages/formproveedores/formproveedores.module';
import { FormproductosComponent } from './pages/formproductos/formproductos.component';
@NgModule({
  declarations: [
    AppComponent,
    FormproductosComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    NavbarModule,
    HttpClientModule,
    // FormularioproveedoresModule,
    LoginModule,
    PedidosproveedoresModule,
    PedidosventaModule,
    ProductosModule,
    ProveedoresModule,
    StockModule,
    TiposModule,
    FormproveedoresModule


   
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
