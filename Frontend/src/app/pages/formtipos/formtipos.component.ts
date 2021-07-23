import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TipoService } from 'src/app/services/tipos.service';[]
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-formtipos',
  templateUrl: './formtipos.component.html',
  styleUrls: ['./formtipos.component.css']
})
export class FormtiposComponent implements OnInit {
  
  formTipos = this.fb.group({
    id_tipo: ["", Validators.required],
    clase: ["", Validators.required],
    nombre: ["", Validators.required]
  })
  constructor(private _TiposService: TipoService, private authService: AuthService, public router: Router, public fb: FormBuilder) { }

  agregarTipo() {
    if (this.formTipos.valid) {
      this._TiposService.agregarTipo(this.formTipos.value).subscribe(resp => {
        console.log(resp);
        alert("Tipo agregado");
        window.location.reload();
        //this.router.navigate(['/tipos']);

      },
        error => {
          console.log(error);

        }


      )
    }

  }
  ngOnInit(): void {
  }

}
