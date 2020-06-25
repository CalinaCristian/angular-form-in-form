import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpsertStateService } from 'src/app/upsert-state.service';
import { ComponentFactories, UpsertContext } from 'src/app/upsert.types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-child-form',
    templateUrl: './child-form.component.html',
    styleUrls: ['./child-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChildFormComponent implements OnInit, OnDestroy {
    public formGroup: FormGroup;
    public childData: { [key: string]: any } = {};

    public dependencies: ComponentFactories<'grandchild'> = {
        grandchild: () => import('../grandchild-form/grandchild-form.component')
            .then(module => module.GrandchildFormComponent),
    };

    private destroyed$ = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        public upsertState: UpsertStateService,
        private upsertContext: UpsertContext
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
            packageName: ['', Validators.required],
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    public cancelAddPackage() {
        this.upsertState.pop('cancel');
    }

    public addPackage(values) {
        this.upsertState.pop('success', { ...values, ...this.childData });
    }
}
