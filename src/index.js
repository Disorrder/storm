import EE from "events";
// import isEqual from "./isEqual";

export const version = VERSION; 

const STATE = Symbol("state");

export class Store extends EE {
    static state = {}
    static mutations = {}
    static actions = {}

    constructor() {
        super();
        this[STATE] = {};

        // Initialize state
        const Class = this.constructor;
        for (let k in Class.state) {
            this[STATE][k] = Class.state[k]();
        }
    }

    mutate(mutation) {
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
            this.emit("change", mutation, oldState);
        }
    }

    isEqual(oldVal, newVal) {
        return oldVal === newVal;
        // return isEqual(oldVal, newVal);
    }
}


export function state(target, name, descriptor) {
    delete descriptor.value;
    delete descriptor.writable;
    const initializer = descriptor.initializer;
    delete descriptor.initializer;
    
    descriptor.get = function() {
        console.log("Getter of", name)
        return this[STATE][name];
    };

    descriptor.set = function(val) {
        console.log("Setter of", name)
        this.mutate({[name]: val});
    };

    // Save initializer
    const Class = target.constructor;
    const Parent = Class.__proto__;
    if (!Class.state) Class.state = {...Parent.state};
    if (initializer) Class.state[name] = initializer;
}

export function Mutation(target, name, descriptor) {
    const mutation = descriptor.value;
    descriptor.value = function() {
        this.mutate(mutation.call(this, ...arguments));
    };

    // Save value
    const Class = target.constructor;
    const Parent = Class.__proto__;
    if (!Class.mutations) Class.mutations = {...Parent.mutations};
    Class.mutations[name] = descriptor.value;
}

// More semantic than functional
export function Action(target, name, descriptor) {
    // Save value
    const Class = target.constructor;
    const Parent = Class.__proto__;
    if (!Class.actions) Class.actions = {...Parent.actions};
    Class.actions[name] = descriptor.value;
}

export function WIP_computed(target, name, descriptor) {
    // TODO: look at MobX
    console.warn("computed decorator is not implemented")
}


// Creates new Store class without decorators
export function createStore(options) {
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