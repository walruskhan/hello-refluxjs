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

