import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewContainerRef, ViewEncapsulation, Injector } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentFactory, UpsertContext } from 'src/app/upsert.types';

@Component({
    selector: 'app-upsert',
    templateUrl: './upsert.component.html',
    styleUrls: ['./upsert.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UpsertComponent implements OnDestroy {
    private components: Array<ComponentRef<unknown>> = [];
    private destroyed$ = new Subject();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector,
    ) { }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    async destroyComponent() {
        const popped = this.components.pop();
        if (this.components.length > 0) {
            const activeComponent = this.components[this.components?.length - 1];

            activeComponent.location.nativeElement.classList.remove('hide');
        }
        popped.destroy();
    }

    async loadComponent(factory: ComponentFactory, data?: { [key: string]: any }) {
        const context = new UpsertContext(data);

        const injector = Injector.create({
            providers: [
                {
                    provide: UpsertContext,
                    useValue: context
                }
            ],
            parent: this.injector,
        });
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(await factory());
        const component = this.viewContainerRef.createComponent(
            componentFactory,
            undefined,
            injector,
        );

        if (this.components.length > 0) {
            this.components[this.components?.length - 1].location.nativeElement.classList.add('hide');
        }
        this.components.push(component);

        context.events$
            .pipe(
                takeUntil(this.destroyed$)
            )
            .subscribe(() => {
                this.destroyComponent();
            });

        return context;
    }
}
