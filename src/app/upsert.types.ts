import { Type } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export type ComponentFactory = () => Promise<Type<any>>;
export type ComponentFactories<T extends string> = Record<T, ComponentFactory>;

export type UpsertEvent =
    | { status: 'cancel'; }
    | { status: 'success'; data: { [key: string]: any } };

export class UpsertContext {
    public events$ = new ReplaySubject<UpsertEvent>(1);

    constructor(
        public data?: { [key: string]: any },
    ) {}

    public pop(status: 'cancel'): void;
    public pop(status: 'success', data: { [key: string]: any }): void;

    public pop(status: 'cancel' | 'success', data?: { [key: string]: any }) {
        this.events$.next({ status, data });
    }
}
