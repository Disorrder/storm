import {Store, state, Mutation, Action} from "../../..";
import api from "../api";

export default class Collection extends Store {
    url = "/"
    pk = "id" // Primary key

    @state items = {}
    @state indices = []

    // Two mutations here, we can optimize it
    @Mutation __add(item) {
        const id = item[this.pk];
        this.items = {...this.items, [id]: item};
        this.indices = [...this.indices, id];
    }
    
    // More optimized
    @Mutation add(item) {
        const id = item[this.pk];
        const items = {...this.items, [id]: item};
        let mutation = {items};

        const rewrite = id in this.items;
        if (!rewrite) {
            mutation.indices = [...this.indices, id];
        }

        return mutation;
    }
    
    @Action async create(data) {
        let item = await api.post(this.url, data);
        this.add(item);
    }
    
    @Action async getById(id) {
        let item = await api.get(`${this.url}/${id}`);
        this.add(item);
    }
    
    @Action async getList(id, params) {
        let items = await api.get(this.url, {params});
        items.forEach(this.add.bind(this));
    }
}