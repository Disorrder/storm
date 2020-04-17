// Same as Collection, but without indices
import {Store, state, Mutation, Action} from "@disorrder/storm";
import api from "../api";

export default class Collection extends Store {
    url = "/"
    pk = "_id" // Primary key

    @state items = {}
    
    @Mutation add(item) {
        const id = item[this.pk];
        const items = {...this.items, [id]: item};
        return {items};
    }

    @Mutation remove(id) {
        const items = {...this.items};
        delete items[id];
        return {items};
    }

    
    @Action async create(data) {
        let item = await api.post(this.url, data);
        this.add(item);
    }
    
    @Action async getById(id) {
        let item = await api.get(`${this.url}/${id}`);
        this.add(item);
    }
    
    @Action async getList(params) {
        let items = await api.get(this.url, {params});
        items.forEach(this.add.bind(this));
    }
    
    @Action async save(item) {
        item = await api.put(this.url, {params});
        this.add(item);
    }

    @Action async delete(item) {
        await api.get(this.url, {params});
        this.remove(item[this.pk]);
    }
}