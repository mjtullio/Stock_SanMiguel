import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormproductosComponent } from './formproductos.component';

const routes: Routes = [
  {path: "", component:FormproductosComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormproductosRoutingModule { }
