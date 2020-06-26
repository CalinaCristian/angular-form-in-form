import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpsertContext } from 'src/app/upsert.types';

@Component({
    selector: 'app-grandchild-form',
    templateUrl: './grandchild-form.component.html',
    styleUrls: ['./grandchild-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GrandchildFormComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private upsertContext: UpsertContext,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            entityName: ['', Validators.required],
        });
    }

    public cancelAddEntity() {
        this.upsertContext.pop('cancel');
    }

    public addEntity(values) {
        this.upsertContext.pop('success', values);
    }
}
