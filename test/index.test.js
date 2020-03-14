import {Store, state, Mutation, Action} from "../build/storm";

let externalValue;
class Counter extends Store {
    foo = "bar" // just property

    @state count = 0
    @state negativeCount = 0

    get doubleCount() { return this.count * 2; }
    
    @Mutation increment(val = 1) {
        return {count: this.count + val};
    }
    @Mutation decrement(val = 1) {
        return {
            count: this.count - val,
            negativeCount: this.negativeCount - val,
        };
    }

    @Action async save() {
        return new Promise((resolve) => {
            setTimeout(() => {
                externalValue = this.count;
                resolve();
            })
        })
    }
    @Action load() {
        this.count = externalValue;
    }
}
let counter = new Counter();

test("Proper initialization", () => {
    // Class statics
    expect(Counter.state).toHaveProperty("count");
    expect(Counter.state).toHaveProperty("negativeCount");

    expect(Counter.mutations).toHaveProperty("increment");
    expect(Counter.mutations).toHaveProperty("decrement");

    expect(Counter.actions).toHaveProperty("save");
    expect(Counter.actions).toHaveProperty("load");

    // Example state
    expect(counter.count).toBe(0);
    expect(counter.negativeCount).toBe(0);
});

test("Mutations", () => {
    counter.count++; // Directly to state
    expect(counter.count).toBe(1);
    expect(counter.negativeCount).toBe(0);
    
    counter.increment();
    expect(counter.count).toBe(2);
    expect(counter.negativeCount).toBe(0);

    counter.decrement(5);
    expect(counter.count).toBe(-3);
    expect(counter.negativeCount).toBe(-5);
    
    counter.mutate({count: 0, negativeCount: 0})
    expect(counter.count).toBe(0);
    expect(counter.negativeCount).toBe(0);
});

test("Actions", async () => {
    let promise;
    counter.count = 10;
    promise = counter.save();
    expect(externalValue).toBeUndefined()
    await promise;
    expect(externalValue).toBe(10)
    
    counter.count = 100500;
    await counter.load();
    expect(externalValue).toBe(10)
    expect(counter.count).toBe(10)
});

test("Subscriptions", () => {
    counter.count = 0;
    counter.negativeCount = 0;

    // Begin
    expect.assertions(9);

    counter.subscribe((mutation, oldState) => {
        expect(mutation).not.toEqual(oldState);
    });
    counter.subscribe((mutation, oldState) => {
        for (let k in mutation) {
            expect(mutation[k]).not.toEqual(oldState[k]);
        }
    });

    counter.count = 10; // 1 + 1
    counter.increment(5); // 1 + 1
    counter.decrement(5); // 1 + 2
    counter.mutate({count: 10, negativeCount: 0}); // 1 + 1
    
    counter.count = 10; // 0 + 0
    counter.increment(0); // 0 + 0
    counter.decrement(0); // 0 + 0
});