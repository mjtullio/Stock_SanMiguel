import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { Validators } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService]

})
export class StockComponent implements OnInit {

  public datosTabla: any = [];

  constructor(private _StockService: StockService, private authService: AuthService, public router: Router) { }

  displayedColumns: string[] = ['nombre_producto', 'nombre_tipo', 'nombre_proveedor', 'cantidad_producto','fecha_ultimo_ingreso','fecha_ultimo_egreso'];
  dataSource = this.datosTabla;

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    this._StockService.getStock().subscribe(resp => {
      this.datosTabla = resp.data;
      console.log(resp.data);

    }
    )
  }

}
