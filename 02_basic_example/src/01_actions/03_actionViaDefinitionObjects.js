import Reflux from "reflux";

console.log("== Create Action with Object Definition ==")
var myActionName = Reflux.createAction({
    actionName: 'myActionName', // <- the name of the action
    children: ['childAction'], // <- Array of child action names for async operations
    asyncResult: true, // <- true to make a shortcut to adding 'completed' and 'failed' children
    sync: true, // <- set the action to emit synchronously or asynchronously (sync by default unless there are child actions)
    // if false - will be invoked on next eventLoop iteration (e.g. setTimeout)
    preEmit: function(){console.log("preEmit")}, // shortcut for setting preEmit method (covered later)
    shouldEmit: function(){console.log("shouldEmit")} // shortcut for setting shouldEmit method (covered later)
})
console.dir(myActionName)

console.log("invoke")
myActionName();