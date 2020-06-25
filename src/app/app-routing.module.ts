import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildFormComponent } from './forms/child-form/child-form.component';
import { ParentFormComponent } from './forms/parent-form/parent-form.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
