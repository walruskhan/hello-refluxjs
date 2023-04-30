import Reflux from "reflux";

console.log("== Create Multiple Actions ==")
var Actions = Reflux.createActions([
    "statusUpdate",
    "statusEdited",
    "statusAdded"
]);

// Actions object now contains the actions
// with the names given in the array above
// that may be invoked as usual
Actions.statusUpdate();