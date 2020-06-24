import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildFormComponent } from './forms/child-form/child-form.component';
import { ParentFormComponent } from './forms/parent-form/parent-form.component';
import { HomeComponent } from './home/home.component';
import { GrandchildFormComponent } from './forms/grandchild-form/grandchild-form.component';
import { ChildSiblingFormComponent } from './forms/child-sibling-form/child-sibling-form.component';


const routes: Routes = [
  {
    path: 'add-process',
    component: ParentFormComponent,
    children: [
      {
        path: 'add-package',
        component: ChildFormComponent,
        children: [
          { path: 'add-entity', component: GrandchildFormComponent }
        ]
      },
      { path: 'add-environment', component: ChildSiblingFormComponent }
    ]
  },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
