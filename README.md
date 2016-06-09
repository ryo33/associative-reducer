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
    case 'ADD':
      return state + payload
    case 'DELETE':
      return DELETE
    default:
      return state
  }
})

let state
const dispatch = (action) => state = reducer(state, action)

dispatch({ type: 'INIT' })
// state -> {}

dispatch(attachKey({ type: 'INIT' }, 'a'))
// state -> { a: 0 }

dispatch(attachKey({ type: 'ADD', payload: 3 }, 'a'))
// state -> { a: 3 }

dispatch(attachKey({ type: 'ADD', payload: 5 }, 'b'))
// state -> { a: 3, b: 5 }

dispatch({ type: 'ADD', payload: 1 })
// state -> { a: 4, b: 6 }

dispatch(attachKey({ type: 'DELETE' }, 'b'))
// state -> { a: 4 }

dispatch({ type: 'DELETE' })
// state -> {}
```

## Installation
`npm i --save associative-reducer`

## API

### `associate(reducer) => wrappedReducer`
- `reducer` A source reducer  
When a reducer returns `DELETE`, the state for the key will be deleted.
- `wrappedReducer` A reducer which returns associative state

### `attachKey(action, key) => newAction`
- `action` A source action
- `newAction` An action attached the key

## License
MIT
