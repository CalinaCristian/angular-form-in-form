import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpsertModule } from './utils/upsert/upsert.module';
import { ParentFormModule } from './forms/parent-form/parent-form.module';
import { ChildFormModule } from './forms/child-form/child-form.module';
import { ChildSiblingFormModule } from './forms/child-sibling-form/child-sibling-form.module';
import { GrandchildFormModule } from './forms/grandchild-form/grandchild-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    UpsertModule,
    ParentFormModule,
    ChildFormModule,
    ChildSiblingFormModule,
    GrandchildFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
