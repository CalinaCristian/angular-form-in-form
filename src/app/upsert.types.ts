import { Type, Injectable } from '@angular/core';

// export interface Upsert<T extends object> {
//     upsertContext?: {
//         data?: T;
//     };
// }

export type ComponentFactory = () => Promise<Type<any>>;
export type ComponentFactories<T extends string> = Record<T, ComponentFactory>;

export type UpsertEvent =
    | { type: 'push'; factory: ComponentFactory; data?: object; }
    | { type: 'pop'; status: 'cancel'; }
    | { type: 'pop'; status: 'success'; data: object };

export class UpsertContext {
    constructor(public data?: object) {
    }
}
