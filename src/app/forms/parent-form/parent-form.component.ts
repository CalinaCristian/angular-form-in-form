import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpsertStateService } from 'src/app/upsert-state.service';

@Component({
    selector: 'app-parent-form',
    templateUrl: './parent-form.component.html',
    styleUrls: ['./parent-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ParentFormComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public upsertState: UpsertStateService,
    ) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            processName: ['', Validators.required],
            processVersion: ['', Validators.required]
        });
    }

    public cancelAddProcess() {
        this.upsertState.pop();
    }

    public addProcess(values) {
        this.upsertState.pop();
    }
}
