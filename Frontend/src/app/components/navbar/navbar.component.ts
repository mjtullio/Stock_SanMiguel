import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }
  ambiente:string = environment.ambiente;

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}

// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';


// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatButtonModule} from '@angular/material/button';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
// import { LoginComponent } from './pages/login/login.component';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatSelectModule} from '@angular/material/select';
// import {MatTableModule} from '@angular/material/table';
// import { HttpClientModule } from '@angular/common/http';
// import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
// import { PedidosproveedoresComponent } from './pages/pedidosproveedores/pedidosproveedores.component';
// import { StockComponent } from './pages/stock/stock.component';
// import { ProductosComponent } from './pages/productos/productos.component';
// import { PedidosventaComponent } from './pages/pedidosventa/pedidosventa.component';
// import { TiposComponent } from './pages/tipos/tipos.component';
// import { FormularioproveedoresComponent } from './pages/formularioproveedores/formularioproveedores.component';
// import {MatCardModule} from '@angular/material/card';