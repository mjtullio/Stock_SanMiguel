import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormproveedoresupdateComponent } from './formproveedoresupdate.component';

const routes: Routes = [
  {path: "", component:FormproveedoresupdateComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormproveedoresupdateRoutingModule { }
