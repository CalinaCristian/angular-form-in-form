import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpsertStateService } from 'src/app/upsert-state.service';

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
        private upsertState: UpsertStateService,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            entityName: ['', Validators.required],
        });
    }

    public cancelAddEntity() {
        this.upsertState.pop();
    }

    public addEntity(values) {
        this.upsertState.pop();
    }
}
