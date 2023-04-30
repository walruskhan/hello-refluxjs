import Reflux from "reflux";

const Actions = Reflux.createActions([
    {
        "statusUpdate": {
            actionName: 'statusUpdate', // <- the name of the action

            // can also assign in object definition object
                // preEmit: ()=>{console.log("preemit")},
                // shouldEmit: ()=>{console.log("shouldEmit")},
        }
    }
])
console.dir(Actions)

// called before action emits an event
// receives args from action invocation
// if something other than undefined returned - they will be passed as arguments for shouldEmit and subsequent emission
Actions.statusUpdate.preEmit = function() {
    console.log("preEmit:", arguments);
};

// called after preEmit and before action emitted
// by default - returns true which allows action to emit event
// override and return false to not emit event
Actions.statusUpdate.shouldEmit = function(value) {
    console.log("shouldEmit:", arguments)
    return value > 0;
};

Actions.statusUpdate.listen(function() {
    console.log("listen: ", arguments)
})

// preEmit: 0
// shouldEmit: 0
Actions.statusUpdate(0);

// preEmit: 1
// shouldEmit: 1
// listen: 1
Actions.statusUpdate(1);