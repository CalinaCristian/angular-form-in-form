import { Injectable, Type } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { ComponentFactory, UpsertEvent } from './upsert.types';

@Injectable({
    providedIn: 'root'
})
export class UpsertStateService {
    public events$ = new ReplaySubject<UpsertEvent>(1);

    private componentFactories: ComponentFactory[] = [];

    constructor() { }

    public push(factory: ComponentFactory, data?: object) {
        this.componentFactories.push(factory);
        this.events$.next({ type: 'push', factory, data });
    }

    public pop(status: 'cancel'): void;
    public pop(status: 'success', data: object): void;

    public pop(status: 'cancel' | 'success', data?: object) {
        this.componentFactories.pop();
        this.events$.next({ type: 'pop', status, data });
    }

    public peek() {
        return this.componentFactories[this.componentFactories.length - 1];
    }
}