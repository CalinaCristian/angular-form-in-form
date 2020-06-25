import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { UpsertStateService } from 'src/app/upsert-state.service';
import { UpsertEvent, ComponentFactory, UpsertContext } from 'src/app/upsert.types';

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
        private viewContainerRef: ViewContainerRef,
        private injector: Injector,
    ) { }

    ngOnInit() {
        this.upsertState.events$
            .pipe(
                takeUntil(this.destroyed$)
            )
            .subscribe(event => {
                if (event.type === 'push') {
                    this.loadComponent(event.factory, event.data);
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

    async loadComponent(factory: ComponentFactory, data?: object) {
        const injector = Injector.create({
            providers: [
                {
                    provide: UpsertContext,
                    useValue: new UpsertContext(data),
                }
            ],
            parent: this.injector,
        });
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(await factory());
        const component = this.viewContainerRef.createComponent(
            componentFactory,
            undefined,
            injector
        );
        component.instance.upsertContext = {
            data
        };

        if (this.components.length > 0) {
            this.components[this.components?.length - 1].location.nativeElement.classList.add('hide');
        }
        this.components.push(component);
    }
}
