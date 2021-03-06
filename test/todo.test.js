import {Store, SingleStore, state, Mutation, Action} from "..";

class TodoList extends Store {
    @state tasks = {}

    @Mutation add(task) {
        return {
            tasks: {
                ...this.tasks,
                [task.id]: task
            }
        };
    }

    @Mutation update({id, ...data}) {
        const task = {
            ...this.tasks[id],
            ...data,
        };
        return {tasks: {...this.tasks, [id]: task}};
    }

    @Mutation delete(id) {
        const tasks = {...this.tasks};
        delete tasks[id];
        return {tasks};
    }

    @Mutation done(id) {
        return this.update({id, completed: true});
    }

    @Action async create(data) {
        const id = Object.keys(this.tasks).length;
        const task = {...data, id};
        this.add(task);
    }
}

test("Todo list", () => {
    const todo = new TodoList();
    expect(todo.tasks).toEqual({});
    
    todo.create({title: "Task 0"});
    expect(todo.tasks[0].title).toEqual("Task 0");
});

test("Singletone", () => {
    class Single extends SingleStore {}

    // const single = Single.getInstance() as Single; // TS syntax
    const a = Single.getInstance();
    const b = Single.getInstance();

    expect(a).toEqual(b);    
});