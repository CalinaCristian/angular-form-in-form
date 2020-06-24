import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
