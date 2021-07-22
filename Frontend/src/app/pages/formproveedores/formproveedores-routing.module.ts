import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormproveedoresComponent } from './formproveedores.component';

const routes: Routes = [
  {path: "", component:FormproveedoresComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormproveedoresRoutingModule { }
