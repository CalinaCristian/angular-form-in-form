import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-child-form',
    templateUrl: './child-form.component.html',
    styleUrls: ['./child-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChildFormComponent implements OnInit {
    public formGroup: FormGroup;
    public formState: ({ [key: string]: any }) = {};

    private destroyed = new Subject();

    constructor(
        public route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
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

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            packageName: ['', Validators.required],
        });
    }

    public cancelAddPackage() {
        this.router.navigate(['..'], { relativeTo: this.route, state: { data: { form: 'package', status: 'cancelled' } } });
    }

    public addPackage(values) {
        this.router.navigate(['..'], {
            relativeTo: this.route,
            state: {
                data: {
                    form: 'package',
                    status: 'saved',
                    values: { ...values, ...this.formState.entity.values }
                }
            }
        });
    }
}
