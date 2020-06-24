import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ParentFormComponent } from './parent-form.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [ParentFormComponent]
})
export class ParentFormModule { }
