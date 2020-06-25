import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpsertStateService } from 'src/app/upsert-state.service';
import { ComponentFactories, UpsertContext } from 'src/app/upsert.types';

@Component({
    selector: 'app-parent-form',
    templateUrl: './parent-form.component.html',
    styleUrls: ['./parent-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ParentFormComponent implements OnInit {
    public formGroup: FormGroup;

    public dependencies: ComponentFactories<'child' | 'childsibling'> = {
        child: () => import('../child-form/child-form.component')
            .then(module => module.ChildFormComponent),
        childsibling: () => import('../child-sibling-form/child-sibling-form.component')
            .then(module => module.ChildSiblingFormComponent),
    }

    constructor(
        private formBuilder: FormBuilder,
        public upsertState: UpsertStateService,
        private upsertContext: UpsertContext,
    ) {
        console.log('Upsert Context', upsertContext);
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            processName: ['', Validators.required],
            processVersion: ['', Validators.required]
        });
    }

    public cancelAddProcess() {
        this.upsertState.pop('cancel')
    }

    public addProcess(values) {
        this.upsertState.pop('success', values);
    }
}
