import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpsertComponent } from './upsert.component';
import { ParentFormModule } from 'src/app/forms/parent-form/parent-form.module';
import { ChildFormModule } from 'src/app/forms/child-form/child-form.module';
import { GrandchildFormModule } from 'src/app/forms/grandchild-form/grandchild-form.module';
import { ChildSiblingFormModule } from 'src/app/forms/child-sibling-form/child-sibling-form.module';

@NgModule({
  imports: [
    CommonModule,
    ParentFormModule,
    ChildFormModule,
    GrandchildFormModule,
    ChildSiblingFormModule,
  ],
  declarations: [UpsertComponent],
  exports: [UpsertComponent]
})
export class UpsertModule { }
