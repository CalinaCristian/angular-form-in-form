import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrandchildFormComponent } from './grandchild-form.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [GrandchildFormComponent]
})
export class GrandchildFormModule { }
