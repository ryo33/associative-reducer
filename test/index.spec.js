import { expect } from 'chai'

import { associate, attachKey, DELETE } from '../src/index'

describe('example', () => {
  it('should be able to work properly', () => {
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
  })
})
