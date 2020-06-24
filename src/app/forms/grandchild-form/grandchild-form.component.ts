import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-grandchild-form',
    templateUrl: './grandchild-form.component.html',
    styleUrls: ['./grandchild-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GrandchildFormComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            entityName: ['', Validators.required],
        });
    }

    public cancelAddEntity() {
        this.router.navigate(['..'], { relativeTo: this.route, state: { data: { form: 'entity', status: 'cancelled' } } });
    }

    public addEntity(values) {
        this.router.navigate(['..'], { relativeTo: this.route, state: { data: { form: 'entity', status: 'saved', values } } });
    }
}
