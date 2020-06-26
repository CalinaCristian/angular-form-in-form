import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ParentFormComponent } from './forms/parent-form/parent-form.component';
import { UpsertComponent } from './utils/upsert/upsert.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    public title = 'forms-in-forms-poc';
    public breadcrumbs = 'home';
    public isUpsertMode = false;
    public childData: { [key: string]: any } = {};

    private destroyed$ = new Subject();

    @ViewChild(UpsertComponent)
    private upsert: UpsertComponent;

    constructor() { }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    public async loadParentForm() {
        this.isUpsertMode = true;
        const context = await this.upsert.loadComponent(() => Promise.resolve(ParentFormComponent), {
            initialProcessName: 'My Process',
            initialProcessVersion: '1.0'
        });

        context.events$
            .pipe(
                takeUntil(this.destroyed$)
            )
            .subscribe(event => {
                if (event.status === 'success') {
                    this.childData = event.data;
                }
                this.isUpsertMode = false;
            });
    }

    public hasChildData() {
        return Object.keys(this.childData).length > 0;
    }
}
