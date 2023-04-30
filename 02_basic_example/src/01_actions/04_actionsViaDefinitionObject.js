import Reflux from "reflux";

var Actions = Reflux.createActions([
    {
        foo: 'myName1'
    },
    {
        bar: 'myName2'
    }
]);

console.dir(Actions)

Actions.foo.listen(function(){
    console.log("foo invoked", arguments);
})

Actions.foo(1, 2, 3, 4, 5);

// can also invoke an action via trigger() and triggerAsync()
// the trigger methods are called by Actions.foo() based on whether sync=true (trigger) or false (triggerAsync)
console.log("1");
Actions.foo.trigger("trigger")
console.log("2");
Actions.foo.triggerAsync("triggerAsync"); // this is called after "3" because it is queued via _.tick() internally
                                          // i.e. different from promise-based async
console.log("3");

