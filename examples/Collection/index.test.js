import {tasks} from "./store";

test('tasks state should be empty', () => {
    expect(tasks.items).toEqual({});
});