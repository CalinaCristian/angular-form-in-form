import { Type } from '@angular/core';
import { Subject } from 'rxjs';

export interface Upsert<T extends { [key: string]: any }> {
    upsertContext?: {
        parentData?: T;
        childData$: Subject<T>;
    };
}

export type ComponentFactory = () => Promise<Type<any>>;
export type ComponentFactories<T extends string> = Record<T, ComponentFactory>;

export type UpsertEvent =
    | { type: 'push'; factory: ComponentFactory; data?: { [key: string]: any }; }
    | { type: 'pop'; status: 'cancel'; }
    | { type: 'pop'; status: 'success'; data: { [key: string]: any } };

export class UpsertContext {
    constructor(
        public childData$: Subject<{ [key: string]: any }>,
        public parentData?: { [key: string]: any },
    ) {}
}
