// import isEqual from "./isEqual";

export const VERSION = "0.2.0";
// export const __rev = `${VERSION} ${BRANCH} ${REVISION} ${BUILD_DATE}`;

interface IState {
    [key: string]: any;
}

type Subscription = (mutation: IState, oldState: IState) => any; 

const STATE = Symbol("state");
const SUBS = Symbol("subscriptions");

export class Store {
    [key: string]: any;
    static state: IState = {}
    static mutations = {}
    static actions = {}

    private [STATE]: IState = {}
    private [SUBS]: Subscription[] = []

    DEBUG_getState() { return this[STATE]; }

    constructor() {
        // Initialize state
        const Class = this.constructor as any;
        console.log("Store constr", Class, Class.state)
        for (let k in Class.state) {
            this[STATE][k] = Class.state[k]();
        }
    }

    mutate(mutation: any) {
        let shouldMutate = false;

        // Check equality
        const oldState = this[STATE];
        for (let k in mutation) {
            if (this.isEqual(oldState[k], mutation[k])) {
                delete mutation[k];
            } else {
                shouldMutate = true;
            }
        }

        if (shouldMutate) {
            this[STATE] = {
                ...oldState,
                ...mutation
            };
            this[SUBS].forEach(cb => cb(mutation, oldState));
        }
    }

    isEqual(oldVal: any, newVal: any) {
        return oldVal === newVal;
        // return isEqual(oldVal, newVal);
    }

    subscribe(cb: Subscription) {
        this[SUBS].push(cb);
    }
    
    unsubscribe(cb: Subscription) {
        this[SUBS].splice(this[SUBS].indexOf(cb), 1);
    }

    unsubscribeAll() {
        this[SUBS].length = 0;
    }
}

// Decorators
// Proposal legacy type
interface PropertyDescriptor {
    initializer?: any;
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}

export function state<T>(target: T, key: keyof T, descriptor?: PropertyDescriptor) {
    delete descriptor.value;
    delete descriptor.writable;
    
    const initializer = descriptor.initializer;
    delete descriptor.initializer;
    
    descriptor.get = function() {
        return this[STATE][key];
    };

    descriptor.set = function(val) {
        this.mutate({[key]: val});
    };

    // Save initializer
    const Class = target.constructor as any;
    Class.state = {
        ...Class.state,
        [key]: initializer,
    };
}

export function Mutation<T>(target: T, key: keyof T, descriptor: PropertyDescriptor) {
    const mutation = descriptor.value;
    descriptor.value = function() {
        this.mutate(mutation.call(this, ...arguments));
    };

    // Save value
    const Class = target.constructor as any;
    Class.mutations = {
        ...Class.mutations,
        [key]: descriptor.value,
    };
}

// More semantic than functional
export function Action<T>(target: T, key: keyof T, descriptor: PropertyDescriptor) {
    const Class = target.constructor as any;
    Class.actions = {
        ...Class.actions,
        [key]: descriptor.value,
    };
}

export function WIP_computed<T>(target: T, key: keyof T, descriptor: PropertyDescriptor) {
    // TODO: look at MobX
    console.warn("computed decorator is not implemented")
}


interface IStoreOptions {
    state: any,
    mutations: any,
    actions: any,
    constructor?: () => any,
}

// Creates new Store class without decorators
export function createStore(options: IStoreOptions): any {
    class StoreModule extends Store {
        constructor() {
            super();
            if (options.constructor) options.constructor.call(this);
        }
    }

    for (let k in options.state) {
        state(StoreModule.prototype, k, {
            enumerable: true,
            configurable: true,
            initializer() { return options.state[k]; },
        });
    }

    for (let k in options.mutations) {
        Mutation(StoreModule.prototype, k, {
            enumerable: true,
            configurable: true,
            value: options.mutations[k],
        });
    }

    for (let k in options.actions) {
        Action(StoreModule.prototype, k, {
            enumerable: true,
            configurable: true,
            value: options.actions[k],
        });
    }

    return StoreModule;
}