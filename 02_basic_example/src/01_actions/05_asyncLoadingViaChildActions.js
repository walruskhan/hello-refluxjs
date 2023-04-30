import Reflux from "reflux";

/*
You may perform actual asynchronous actions such as file loading via child actions.
An action can listen for itself to be called, and then perform an asynchronous task,
calling its child action when that task is complete.
In simplest form it might look something like this:
 */

// An async-compatible delay method
const delay = ms => new Promise(res => setTimeout(res, ms));

async function someAsyncOperation() {
    await delay(3 * 1000); // wait 3 seconds
    return true;
}

var Actions = Reflux.createActions({
    'load': {
        children: [
            'completed',
            'failed'
        ]
    }
});
console.dir(Actions)

// subscribe to load action, then invoke that actions child actions
Actions.load.listen( function() {
    someAsyncOperation()
        .then( this.completed )
        .catch( this.failed );
});

class MyStore extends Reflux.Store
{
    constructor()
    {
        super();
        // this.listenables = Actions;
        // or
        this.listenToMany(Actions);
    }

    onLoadCompleted(data)
    {
        console.log("onLoadCompleted");
    }

    onLoadFailed(message)
    {
        console.error("onLoadFailed", message)
    }
}

// can listen to child actions
Actions.load.completed.listen(()=>{
    console.log("Listened for load.completed action")
})
Actions.load.failed.listen(()=>{
    console.log("Listened for load.failed action")
})

const store = new MyStore();    // create store that subscribes to actions
Actions.load(); // dispatch load action