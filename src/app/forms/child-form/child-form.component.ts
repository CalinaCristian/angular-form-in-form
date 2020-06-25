import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UpsertStateService } from 'src/app/upsert-state.service';

@Component({
    selector: 'app-child-form',
    templateUrl: './child-form.component.html',
    styleUrls: ['./child-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChildFormComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public upsertState: UpsertStateService,
    ) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            packageName: ['', Validators.required],
        });
    }

    public cancelAddPackage() {
        this.upsertState.pop();
    }

    public addPackage(values) {
    }
}
