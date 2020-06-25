import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation, Injector } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UpsertStateService } from 'src/app/upsert-state.service';
import { ComponentFactory, UpsertContext, Upsert } from 'src/app/upsert.types';

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
                    this.destroyComponent(event.status === 'success' ? event.data : undefined);
                }
            });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    async destroyComponent(data?: { [key: string]: any }) {
        const popped = this.components.pop();
        if (this.components.length > 0) {
            const activeComponent = this.components[this.components?.length - 1];

            (activeComponent.instance as Upsert<any>).upsertContext.childData$.next(data);
            activeComponent.location.nativeElement.classList.remove('hide');
        }
        popped.destroy();
    }

    async loadComponent(factory: ComponentFactory, data?: { [key: string]: any }) {
        const childData$ = new Subject();
        const injector = Injector.create({
            providers: [
                {
                    provide: UpsertContext,
                    useValue: new UpsertContext(
                        childData$,
                        data
                    ),
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
            parentData: data,
            childData$
        };

        if (this.components.length > 0) {
            this.components[this.components?.length - 1].location.nativeElement.classList.add('hide');
        }
        this.components.push(component);
    }
}
