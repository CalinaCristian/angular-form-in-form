import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UpsertStateService {
    private activeForms = [];
    private components = {
        parent: () => import('./forms/parent-form/parent-form.component')
            .then(module => module.ParentFormComponent),
        child: () => import('./forms/child-form/child-form.component')
            .then(module => module.ChildFormComponent),
        childsibling: () => import('./forms/child-sibling-form/child-sibling-form.component')
            .then(module => module.ChildSiblingFormComponent),
        grandchild: () => import('./forms/grandchild-form/grandchild-form.component')
            .then(module => module.GrandchildFormComponent),
    };
    public events$ = new Subject<'push' | 'pop'>();

    constructor() { }

    set activeForm(form: string) {
        this.activeForms.push(form);
        this.events$.next('push');
    }

    get activeForm() {
        return this.activeForms[this.activeForms.length - 1];
    }

    public registerEntry(name, componentLoader) {
        this.components[name] = componentLoader;
    }

    public pop() {
        this.activeForms.pop();
        this.events$.next('pop');
    }

    public isFormActive(form: string) {
        return this.activeForms.includes(form);
    }

    public loadComponent(name: string) {
        return this.components[name]();
    }
}
