import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpsertComponent } from 'src/app/utils/upsert/upsert.component';
import { UpsertContext } from 'src/app/upsert.types';

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
        private upsertContext: UpsertContext,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            environmentName: ['', Validators.required],
        });
    }

    public cancelAddEnvironment() {
        this.upsertContext.pop('cancel');
    }

    public addEnvironment(values) {
        this.upsertContext.pop('success', values);
    }
}
