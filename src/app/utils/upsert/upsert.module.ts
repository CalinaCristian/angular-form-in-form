import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpsertComponent } from './upsert.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [UpsertComponent],
    exports: [UpsertComponent]
})
export class UpsertModule { }
