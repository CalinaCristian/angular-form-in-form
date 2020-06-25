import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HomeModule } from './home/home.module';
import { ChildFormModule } from './forms/child-form/child-form.module';
import { ParentFormModule } from './forms/parent-form/parent-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GrandchildFormModule } from './forms/grandchild-form/grandchild-form.module';
import { ChildSiblingFormModule } from './forms/child-sibling-form/child-sibling-form.module';
import { UpsertModule } from './utils/upsert/upsert.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HomeModule,
    UpsertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
