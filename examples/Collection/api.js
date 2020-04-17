let db = {
    tasks: [
        {id: 1, title: "Task 1", done: false},
        {id: 2, title: "Task 2", done: true},
    ],
};

class Api {
    _getCollection(name) {
        if (!db[name]) db[name] = [];
        return db[name];
    }

    // Create
    async post(url, {data}) {
        let [name] = url.split("/")
        let collection = this._getCollection(name);
        let id = collection.length + 1;
        let item = {id, ...data};
        collection.push(item);
        return item;
    }
    
    // Read
    async get(url) {
        let [name, id] = url.split("/")
        let collection = this._getCollection(name);
        if (id) {
            let item = collection.find((item) => item.id == id);
            return item;
        }

        return collection;
    }
    
    // Update
    async put(url, {...data}) {
        let [name, id] = url.split("/")
        let collection = this._getCollection(name);
        let item = collection.find((item) => item.id == id);
        Object.assign(item, data);
        return item;
    }
    
    // Delete
    async delete(url, {}) {
        let [name, id] = url.split("/")
        let collection = this._getCollection(name);
        collection = collection.filter((item) => item.id != id);
        db[name] = collection;
        return "ok";
    }
}

export default new Api();