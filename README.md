# Store Modules
Redux is a predictable state container for JavaScript apps. (c) Facebook

Storm is inspired by Redux and Vuex with saving all core conepts but in more simple OOP style. Do the same with less code and even more!

## Install
```shell
npm install --save @disorrder/storm
```

## Just show me the code!
*See more in examples folder.*

```javascript
import {Store, state, Mutation, Action} from "@disorrder/storm";

export default class Account extends Store {
    @state amount = 0

    @Mutation setAmount(val = 0) {
        return {amount: val};
    }

    @Action async updateAmount() {
        let {data} = await api.get("/user/account");
        // Variant 1
        this.setAmount(data);
        // Variant 2
        this.amount = data;
        // Variant 3
        this.mutate({amount: data}); // Actually you won't use this
        // This 3 variants are equal.
    }
}
```

There is a `mutate()` call inside `amount` state's setter. If you want to change two properties or more, it's better to use Mutation:

```javascript
export default class Account extends Store {
    // . . .

    @state transactions = []

    @Mutation charge(val = 0) { // mutates 2 properties in one time
        let transaction = {
            id: this.transactions.length + 1,
            amount: val,
            date: Date.now(),
        };
        let transactions = [...this.transactions, transaction]; // never use .push(), always copy objects
        return {
            amount: this.amount + val,
            transactions,
        };
    }
}
```

Yep, that's it!

## Import store
```javascript
// ./src/store/index.js
import Account from "./Account"
export const account = new Account()
```
```javascript
import {account} from "/src/store"
```

## Subscribe

```javascript
// Let the props be only props
account.subscribe((mutation, oldState) => {
    // React Component constructor:
    this.setState({});
})
```

## Inheritance

import user from "./store";

class App extends Component {
    componentDidMount() {
        user.subscribe(() => {
            this.setState({});
        });
    }
}