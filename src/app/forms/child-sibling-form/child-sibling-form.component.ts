import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-child-sibling-form',
    templateUrl: './child-sibling-form.component.html',
    styleUrls: ['./child-sibling-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChildSiblingFormComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            environmentName: ['', Validators.required],
        });
    }

    public cancelAddEnvironment() {
        this.router.navigate(['..'], { relativeTo: this.route, state: { data: { form: 'environment', status: 'cancelled' } } });
    }

    public addEnvironment(values) {
        this.router.navigate(['..'], {
            relativeTo: this.route,
            state: {
                data: {
                    form: 'environment',
                    status: 'saved',
                    values
                }
            }
        });
    }
}
