import Reflux from "reflux";

// Call before creating actions
Reflux.ActionMethods.exampleMethod = function() {
    console.log(arguments);
};

const Actions = Reflux.createActions(['statusUpdate'])

Actions.statusUpdate.exampleMethod('arg1');
// Should output: 'arg1'