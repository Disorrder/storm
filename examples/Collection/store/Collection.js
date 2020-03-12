import {Store, state, Mutation, Action} from "../../../build/storm";
// import {Store, state, Mutation, Action} from "../../../src";
import api from "../api";

export default class Collection extends Store {
    url = "/"
    pk = "id" // Primary key

    @state itemIds = [] // ordered list
    @state items = {}

    // Two mutations here, we can optimize it
    @Mutation _add(item) {
        const id = item[this.pk];
        this.items = {...this.items, [id]: item};
        this.itemIds = [...this.itemIds, id];
    }
    
    // More optimized
    @Mutation add(item) {
        const id = item[this.pk];
        const items = {...this.items, [id]: item};
        let mutation = {items};

        const rewrite = id in this.items;
        if (!rewrite) {
            mutation.itemIds = [...this.itemIds, id];
        }

        return mutation;
    }
    
    @Action async create(data) {
        let item = await api.post(this.url, data);
        this.add(item);
    }
}