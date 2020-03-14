import {tasks} from "./store";

test("proper inheritance", () => {
    expect(tasks.items).toEqual({});
    expect(tasks.itemIds).toEqual([]);
    // Mutations
    expect(tasks).toHaveProperty("add");
    // Actions
    expect(tasks).toHaveProperty("create");

    // Class statics
    const Tasks = tasks.constructor;
    expect(Tasks.state).toHaveProperty("items");
    expect(Tasks.state).toHaveProperty("itemIds");
});

test('Mutations', () => {
    let item = {id: 100, title: "Task 100"};

    tasks.add(item);
    expect(tasks.items).toEqual({[item.id]: item});
    expect(tasks.itemIds).toEqual([item.id]);
    
    tasks.items = {};
    expect(tasks.items).toEqual({});
    tasks.itemIds = [];
    expect(tasks.itemIds).toEqual([]);
});