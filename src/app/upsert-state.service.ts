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

    public push(factory: ComponentFactory, data?: { [key: string]: any }) {
        this.componentFactories.push(factory);
        this.events$.next({ type: 'push', factory, data });
    }

    public pop(status: 'cancel'): void;
    public pop(status: 'success', data: { [key: string]: any }): void;

    public pop(status: 'cancel' | 'success', data?: { [key: string]: any }) {
        this.componentFactories.pop();
        this.events$.next({ type: 'pop', status, data });
    }

    public peek() {
        return this.componentFactories[this.componentFactories.length - 1];
    }
}