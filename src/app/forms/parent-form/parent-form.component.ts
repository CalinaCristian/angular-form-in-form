import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentFactories, UpsertContext } from 'src/app/upsert.types';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UpsertComponent } from 'src/app/utils/upsert/upsert.component';

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
        private formBuilder: FormBuilder,
        private upsertContext: UpsertContext,
        private upsert: UpsertComponent,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            processName: [this.upsertContext.data?.initialProcessName, Validators.required],
            processVersion: [this.upsertContext.data?.initialProcessVersion, Validators.required]
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    public async loadPackage() {
        const context = await this.upsert.loadComponent(this.dependencies.child);

        context.events$
            .pipe(
                takeUntil(this.destroyed$)
            )
            .subscribe((ev) => {
                if (ev.status === 'success') {
                    this.childData = {
                        ...this.childData,
                        ...ev.data
                    };
                }
            });
    }

    public async loadEnvironment() {
        const context = await this.upsert.loadComponent(this.dependencies.childsibling);

        context.events$
            .pipe(
                takeUntil(this.destroyed$)
            )
            .subscribe((ev) => {
                if (ev.status === 'success') {
                    this.childData = {
                        ...this.childData,
                        ...ev.data
                    };
                }
            })
    }

    public cancelAddProcess() {
        this.upsertContext.pop('cancel');
    }

    public addProcess(values) {
        this.upsertContext.pop('success', { ...values, ...this.childData });
    }
}
