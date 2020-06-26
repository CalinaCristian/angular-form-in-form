import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentFactories, UpsertContext } from 'src/app/upsert.types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UpsertComponent } from 'src/app/utils/upsert/upsert.component';

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
        private upsertContext: UpsertContext,
        private upsert: UpsertComponent,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            packageName: ['', Validators.required],
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    public async loadEntity() {
        const context = await this.upsert.loadComponent(this.dependencies.grandchild);

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

    public cancelAddPackage() {
        this.upsertContext.pop('cancel')
    }

    public addPackage(values) {
        this.upsertContext.pop('success', { ...values, ...this.childData });
    }
}
