import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpsertStateService } from 'src/app/upsert-state.service';
import { ComponentFactories } from 'src/app/upsert.types';

@Component({
    selector: 'app-child-form',
    templateUrl: './child-form.component.html',
    styleUrls: ['./child-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChildFormComponent implements OnInit {
    public formGroup: FormGroup;

    public dependencies: ComponentFactories<'grandchild'> = {
        grandchild: () => import('../grandchild-form/grandchild-form.component')
            .then(module => module.GrandchildFormComponent),
    };

    constructor(
        private formBuilder: FormBuilder,
        public upsertState: UpsertStateService,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            packageName: ['', Validators.required],
        });
    }

    public cancelAddPackage() {
        this.upsertState.pop('cancel');
    }

    public addPackage(values) {
    }
}
