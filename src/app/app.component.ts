import { Component, OnInit } from '@angular/core';
import { UpsertStateService } from './upsert-state.service';
import { ParentFormComponent } from './forms/parent-form/parent-form.component';
import { HomeComponent } from './home/home.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title = 'forms-in-forms-poc';
    public breadcrumbs = 'home';

    constructor(
        public upsertState: UpsertStateService
    ) { }

    ngOnInit() {
        this.upsertState.push(() => Promise.resolve(HomeComponent));
    }
}
