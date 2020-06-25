import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildSiblingFormComponent } from './child-sibling-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [ChildSiblingFormComponent],
  exports: [ChildSiblingFormComponent],
})
export class ChildSiblingFormModule { }
