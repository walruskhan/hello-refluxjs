// only need to define stores in Reflux, not create them
// reflux handles instantiating them
// kinda like components in react - use them in jsx, react handles instantiation

// i.e. define store class and assign that class to components
// then component will either instantiate singleton or get reference to existing singleton

import Reflux from "reflux";
import {Fragment, useEffect, useState} from "react";
import * as React from 'react';
import { createRoot } from 'react-dom/client';

const Actions = Reflux.createActions(['add','multiply']);

class AddStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.state = {count: 0};
        this.listenTo(Actions.add, this.addItUp);
    }

    addItUp()
    {
        var newCount = this.state.count + 1;
        this.setState({count: newCount});
        console.log("addItUp", this.state)
    }
}

class MultiplyStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.state = {count: 1};
        this.listenTo(Actions.multiply, this.multiplyItUp);
    }

    multiplyItUp()
    {
        var newCount = this.state.count + 1;
        this.setState({count: newCount});
        console.log("multiplyItUp", this.state)
    }
}

class MyCounter extends Reflux.Component {
    constructor(props) {
        super();
        // this.stores = [AddStore, MultiplyStore]; // mix state from both stores

        // this.store = AddStore;
        // this.storeKeys = ['addValue']; // only mix certain values from a store (e.g. use with this.store

        // map properties from store to a new state object
        // if object is empty, rerender will not be called
        this.mapStoreToState(AddStore, store => {
            return {
                addValue: store.count
            }
        });
        this.mapStoreToState(MultiplyStore, store => {
            return {
                multiplyValue: store.count
            }
        });
    }

    render() {
        console.dir(this.state)
        // since CountStore has a state.count, now this component shares it
        return <Fragment>
            <button onClick={Actions.add}>Add</button>
            <button onClick={Actions.multiply}>Multiply</button>
            <div>Value: {this.state.addValue * this.state.multiplyValue }</div>
        </Fragment>
    }
}

const root = createRoot(document.getElementById("react-app"))
root.render(<MyCounter></MyCounter>)

setInterval(Actions.add, 10 * 1000)