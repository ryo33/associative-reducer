Associative Reducer
====
Makes a reducer associative.

## Description
It turns a reducer into an associative reducer.  
Suppose we have a reducer which return a state like this:  
`{ value: 3 }`  
We can make it return an associative state as below.  
```
{
  'key1': { value: 1 },
  'key2': { value: 2 },
  'key3': { value: 3 }
}
```

## Example
```javascript
import { associate, attachKey, DELETE } from 'associative-reducer'

const reducer = associate((state = 0, action) => {
  const { type, payload } = action
  switch (type) {
    case 'INIT_TO':
      return payload
    case 'ADD':
      return state + payload
    case 'DELETE':
      return DELETE
    default:
      return state
  }
}, ['INIT', 'INIT_TO'])
let state
const dispatch = (action) => state = reducer(state, action)

const init = () => ({ type: 'INIT' })
const initTo = (value) => ({ type: 'INIT_TO', payload: value })
const add = (value) => ({ type: 'ADD', payload: value })
const del = ()  => ({ type: 'DELETE' })
const associatedAdd = associate(add)

// associatedAdd(key, value) is the same as attachKey(add(value), key)

dispatch(init())
expect(state).to.eql({})

dispatch(attachKey(init(), 'a'))
expect(state).to.eql({ a: 0 })

dispatch(attachKey(initTo(5), 'b'))
expect(state).to.eql({ a: 0, b: 5 })

dispatch(attachKey(add(3), 'a'))
expect(state).to.eql({ a: 3, b: 5 })

dispatch(associatedAdd('b', 1))
expect(state).to.eql({ a: 3, b: 6 })

dispatch(add(1))
expect(state).to.eql({ a: 4, b: 7 })

dispatch(attachKey(del(), 'b'))
expect(state).to.eql({ a: 4 })

dispatch(del())
expect(state).to.eql({})
```

## Installation
`npm i --save associative-reducer`

## API

### `associate(reducer, newKeyAction) => wrappedReducer`
- `reducer` A source reducer  
When a reducer returns `DELETE`, the state for the key will be deleted.
- `newKeyAction: string | array | (type) => bool`  
  - `string` A new key will be added if `action.type` equals to `newKeyAction`
  - `array` A new key will be added if `newKeyAction` contains `action.type`
  - `(type) => bool` A new key will be added if the result of `newKeyAction(action.type)` is `true`
- `wrappedReducer` A reducer which returns associative state

### `associate(actionCreator) => wrappedActionCreator`
- `acitonCreator` The source action creator
- `wrappedActionCreator` The action creator which accepts the key as its first parameter

### `attachKey(action, key) => newAction`
- `action` A source action
- `newAction` An action attached the key

## License
MIT
