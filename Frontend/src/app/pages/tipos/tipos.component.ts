import { Component, OnInit } from '@angular/core';
import { TipoService } from 'src/app/services/tipos.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import IrepBackend from 'src/app//interfaces/IrespBackend';
import { FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css'],
  providers: [TipoService]
})
export class TiposComponent implements OnInit {
  public datosTabla: any = [];
  
  constructor(private _TipoService: TipoService, private authService: AuthService, public router: Router, public fb: FormBuilder ) { }

formTipos = this.fb.group({
  id_tipo: ["", Validators.required],
  clase: ["", Validators.required],
  nombre: ["", Validators.required]
})
// formTiposU = this.fb.group({
//   id_tipo: [''],
//   clase: ['']
// })
  displayedColumns: string[] = ['nombre','id_tipo','clase','Acciones'];
  dataSource = this.datosTabla;

  editarTipo(id_tipo: number , clase:number){
    
  //  this.formTiposU.get('id_tipo')?.setValue(id_tipo); 
  //   this.formTiposU.get('clase')?.setValue(clase);
    this._TipoService.muestraTipo( id_tipo,clase).subscribe((resp: any) =>{

      console.log(resp);
      
      const data = resp.data[0]
      this.formTipos.get('id_tipo')?.setValue(data.id_tipo);
      this.formTipos.get('nombre')?.setValue(data.nombre);
      this.formTipos.get('clase')?.setValue(data.clase);
    })
  }

  actualizaTipos(){
    if (this.formTipos.valid) {
      console.log(this.formTipos.value);
      
      this._TipoService.updateTipo(this.formTipos.value).subscribe(resp => {
        console.log(resp);
        alert("Tipo actualizado");
        this.ngOnInit()
        
      },
        error => {
          console.log(error);
  
        }
  
  
      )
    }
    
  }
  ngOnInit(): void {
    this._TipoService.getTipos().subscribe(resp => {
      this.datosTabla = resp.data;
    })
  }
  display = false;
  onPressA() {
    this.display = true;
    this.displayupdate = false;
    
    /*if you want the component to show and hide on click pressed, use 
    use this line
    this.display = !this.display;*/
  }


  
  

  displayupdate = false;
  onPressE(id_tipo: number, clase: number) {
    
    this.displayupdate = true;
    this.display = false;

    this.editarTipo(id_tipo,clase);
    /*if you want the component to show and hide on click pressed, use 
    use this line
    this.display = !this.display;*/
  }

}


