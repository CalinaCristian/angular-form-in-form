import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UpsertStateService } from './upsert-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'forms-in-forms-poc';
  public breadcrumbs = 'home';

  private destroyed = new Subject();

  constructor(
    private router: Router,
    public upsertState: UpsertStateService
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe(ev => {
        if (ev instanceof NavigationEnd) {
          if (ev.url === '/') {
            this.breadcrumbs = 'home';
            return;
          }
          this.breadcrumbs = `home ${ev.url.split('/').join(' > ')}`;
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }
}
