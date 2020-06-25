import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef, OnDestroy, ComponentRef, ViewEncapsulation } from '@angular/core';
import { UpsertStateService } from 'src/app/upsert-state.service';
import { Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-upsert',
    templateUrl: './upsert.component.html',
    styleUrls: ['./upsert.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UpsertComponent implements OnInit, OnDestroy {
    private destroyed$ = new Subject();
    private components: Array<ComponentRef<unknown>> = [];

    constructor(
        public upsertState: UpsertStateService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit() {
        this.upsertState.events$
            .pipe(
                startWith('push'),
                takeUntil(this.destroyed$)
            )
            .subscribe(event => {
                if (event === 'push') {
                    this.loadComponent();
                } else {
                    this.destroyComponent();
                }
            });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    async destroyComponent() {
        const popped = this.components.pop();
        if (this.components.length > 0) {
            this.components[this.components?.length - 1].location.nativeElement.classList.remove('hide');
        }
        popped.destroy();
    }

    async loadComponent() {
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(await this.upsertState.loadComponent(this.upsertState.activeForm));
        const component = this.viewContainerRef.createComponent(componentFactory);

        if (this.components.length > 0) {
            this.components[this.components?.length - 1].location.nativeElement.classList.add('hide');
        }
        this.components.push(component);
    }
}
