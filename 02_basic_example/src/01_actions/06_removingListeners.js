import Reflux from "reflux";

const Actions = Reflux.createActions(['foo'])
console.dir(Actions)

const unsubscribe = Actions.foo.listen((message) => {
    console.log(`onFoo: ${message}`)
})

Actions.foo("before unsubscribe")

unsubscribe()
Actions.foo("after unsubscribe")

