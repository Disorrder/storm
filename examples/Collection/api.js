let db = {
    "/tasks": [
        {id: 1, title: "Task 1", done: false},
        {id: 2, title: "Task 2", done: true},
    ],
};

class Api {
    _getCollection(url) {
        if (!db[url]) db[url] = [];
        return db[url];
    }

    // Create
    async post(url, {data}) {
        let collection = this._getCollection(url);
        let id = collection.length + 1;
        let item = {id, ...data};
        collection.push(item);
        return item;
    }
    
    // Read
    async get(url, {id}) {
        let collection = this._getCollection(url);
        let item = collection.find((item) => item.id === id);
        return item;
    }
    
    // Update
    async put(url, {id, ...data}) {
        let collection = this._getCollection(url);
        let item = collection.find((item) => item.id === id);
        Object.assign(item, data);
        return item;
    }
    
    // Delete
    async delete(url, {id}) {
        let collection = this._getCollection(url);
        collection = collection.filter((item) => item.id !== id);
        db[url] = collection;
        return "ok";
    }
}

export default new Api();