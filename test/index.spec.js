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

    dispatch({ type: 'INIT' })
    expect(state).to.eql({})

    dispatch(attachKey({ type: 'INIT' }, 'a'))
    expect(state).to.eql({ a: 0 })

    dispatch(attachKey({ type: 'INIT_TO', payload: 5 }, 'b'))
    expect(state).to.eql({ a: 0, b: 5 })

    dispatch(attachKey({ type: 'ADD', payload: 3 }, 'a'))
    expect(state).to.eql({ a: 3, b: 5 })

    dispatch({ type: 'ADD', payload: 1 })
    expect(state).to.eql({ a: 4, b: 6 })

    dispatch(attachKey({ type: 'DELETE' }, 'b'))
    expect(state).to.eql({ a: 4 })

    dispatch({ type: 'DELETE' })
    expect(state).to.eql({})
  })
})
