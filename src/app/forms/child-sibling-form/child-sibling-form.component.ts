import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpsertStateService } from 'src/app/upsert-state.service';

@Component({
    selector: 'app-child-sibling-form',
    templateUrl: './child-sibling-form.component.html',
    styleUrls: ['./child-sibling-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChildSiblingFormComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private upsertState: UpsertStateService,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            environmentName: ['', Validators.required],
        });
    }

    public cancelAddEnvironment() {
        this.upsertState.pop('cancel');
    }

    public addEnvironment(values) {
        this.upsertState.pop('success', values);
    }
}
