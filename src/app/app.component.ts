import { Component } from '@angular/core';
import { UpsertStateService } from './upsert-state.service';
import { ParentFormComponent } from './forms/parent-form/parent-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'forms-in-forms-poc';
  public breadcrumbs = 'home';

  constructor(
    public upsertState: UpsertStateService
  ) { }

  loadParentForm() {
    this.upsertState.push(() => Promise.resolve(ParentFormComponent), {
      initialProcessName: 'My Process',
    });
  }
}
