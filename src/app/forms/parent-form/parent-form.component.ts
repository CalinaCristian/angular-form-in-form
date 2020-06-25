import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpsertStateService } from 'src/app/upsert-state.service';
import { ComponentFactories, UpsertContext } from 'src/app/upsert.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-parent-form',
    templateUrl: './parent-form.component.html',
    styleUrls: ['./parent-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ParentFormComponent implements OnInit, OnDestroy {
    public formGroup: FormGroup;
    public childData: { [key: string]: any } = {};

    public dependencies: ComponentFactories<'child' | 'childsibling'> = {
        child: () => import('../child-form/child-form.component')
            .then(module => module.ChildFormComponent),
        childsibling: () => import('../child-sibling-form/child-sibling-form.component')
            .then(module => module.ChildSiblingFormComponent),
    };

    private destroyed$ = new Subject();

    constructor(
        public upsertState: UpsertStateService,
        private formBuilder: FormBuilder,
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

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            processName: [this.upsertContext.parentData?.initialProcessName, Validators.required],
            processVersion: [this.upsertContext.parentData?.initialProcessVersion, Validators.required]
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    public cancelAddProcess() {
        this.upsertState.pop('cancel');
    }

    public addProcess(values) {
        this.upsertState.pop('success', { ...values, ...this.childData });
    }
}
