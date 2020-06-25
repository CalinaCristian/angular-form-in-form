import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UpsertStateService } from '../upsert-state.service';
import { ParentFormComponent } from '../forms/parent-form/parent-form.component';
import { UpsertContext } from '../upsert.types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnDestroy {
    public childData: { [key: string]: any } = {};

    private destroyed$ = new Subject();

    constructor(
        public upsertState: UpsertStateService,
        private upsertContext: UpsertContext,
    ) {
        this.upsertContext.childData$
            .pipe(
                takeUntil(this.destroyed$)
            )
            .subscribe(childData => {
                this.childData = { ...this.childData, ...childData };
            });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    loadParentForm() {
        this.upsertState.push(() => Promise.resolve(ParentFormComponent), {
            initialProcessName: 'My Process',
            initialProcessVersion: '1.0'
        });
    }

    hasChildData() {
        return Object.keys(this.childData).length > 0;
    }
}
