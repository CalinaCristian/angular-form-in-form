import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildFormComponent } from './child-form.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [ChildFormComponent],
  exports: [ChildFormComponent]
})
export class ChildFormModule { }
