// only need to define stores in Reflux, not create them
// reflux handles instantiating them
// kinda like components in react - use them in jsx, react handles instantiation

// i.e. define store class and assign that class to components
// then component will either instantiate singleton or get reference to existing singleton

import Reflux from "reflux";
import {Fragment, useEffect, useState} from "react";
import * as React from 'react';
import { createRoot } from 'react-dom/client';

var increment = Reflux.createAction();

class MyStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.state = {count: 0};
        this.listenTo(increment, this.incrementItUp);
    }

    incrementItUp()
    {
        var newCount = this.state.count + 1;
        this.setState({count: newCount});
        console.log(this.state)
    }
}



class MyBetterComponent extends Reflux.Component {
    constructor(props) {
        super();
        this.store = MyStore;
    }

    render() {
        // since CountStore has a state.count, now this component shares it
        return <Fragment>
            <button onClick={increment}>Click me!</button>
            <div>Count: {this.state.count}</div>
        </Fragment>
    }
}

const root = createRoot(document.getElementById("react-app"))
root.render(<MyBetterComponent></MyBetterComponent>)

setInterval(increment, 1 * 1000)

// BAD! BAD!
// var storeSingleton = Reflux.initStore(MyStore);
//
// const MyComponent = ()=>{
//     const [counter, setCounter] = useState(3);
//
//     // this feels icky - we happen to subscribe AFTER we've defined the listener on the store that bumps the counter
//     // if you uncomment the setInterval at the bottom, then the component only updates once
//     increment.listen(function(num) {
//         setCounter(num)
//     })
//
//     return <Fragment>
//         <button onClick={increment}>Click me!</button>
//
//         <div>
//             {storeSingleton.state.count}
//         </div>
//     </Fragment>
// }
//
// const root = createRoot(document.getElementById("react-app"))
// root.render(<MyComponent></MyComponent>)
//
// setInterval(increment, 1 * 1000)