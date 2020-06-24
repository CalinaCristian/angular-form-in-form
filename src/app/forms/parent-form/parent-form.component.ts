import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-parent-form',
    templateUrl: './parent-form.component.html',
    styleUrls: ['./parent-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ParentFormComponent implements OnInit, OnDestroy {
    public formGroup: FormGroup;
    public formState: ({ [key: string]: any }) = {};

    private destroyed = new Subject();

    constructor(
        public route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
        this.router.events
            .pipe(
                takeUntil(this.destroyed)
            )
            .subscribe(event => {
                if (event instanceof NavigationEnd && history.state.data) {
                    this.formState[history.state.data.form] = history.state.data;
                }
            });
    }
    ngOnDestroy() {
        this.destroyed.next();
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            processName: ['', Validators.required],
            processVersion: ['', Validators.required]
        });
    }

    public cancelAddProcess() {
        this.router.navigate(['/'], { state: { data: { form: 'process', status: 'cancelled' } } });
    }

    public addProcess(values) {
        this.router.navigate(['/'], {
            state: {
                data: {
                    form: 'process',
                    status: 'saved',
                    values: { ...values, ...this.formState.package.values, ...this.formState.environment.values }
                }
            }
        });
    }
}
