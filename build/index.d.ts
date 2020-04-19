export declare const VERSION = "0.3.0";
interface IState {
    [key: string]: any;
}
declare type Subscription = (mutation: IState, oldState: IState) => any;
declare const STATE: unique symbol;
declare const SUBS: unique symbol;
export declare class Store {
    [key: string]: any;
    static state: IState;
    static mutations: {};
    static actions: {};
    private [STATE];
    private [SUBS];
    DEBUG_getState(): IState;
    constructor();
    mutate(mutation: any): void;
    isEqual(oldVal: any, newVal: any): boolean;
    subscribe(cb: Subscription): void;
    unsubscribe(cb: Subscription): void;
    unsubscribeAll(): void;
}
export declare class SingleStore extends Store {
    protected static instance: SingleStore;
    static getInstance(): SingleStore;
    protected constructor();
}
interface PropertyDescriptor {
    initializer?: any;
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
export declare function state<T>(target: T, key: keyof T, descriptor?: PropertyDescriptor): void;
export declare function Mutation<T>(target: T, key: keyof T, descriptor: PropertyDescriptor): void;
export declare function Action<T>(target: T, key: keyof T, descriptor: PropertyDescriptor): void;
export declare function WIP_computed<T>(target: T, key: keyof T, descriptor: PropertyDescriptor): void;
interface IStoreOptions {
    state: any;
    mutations: any;
    actions: any;
    constructor?: () => any;
}
export declare function createStore(options: IStoreOptions): any;
export {};
