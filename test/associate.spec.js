import { expect } from 'chai'

import { associate, attachKey, DELETE } from '../src/index'

const reducer = associate((state = 0, { type, payload }) => {
  switch (type) {
    case 'ADD':
      return state + payload
    case 'DELETE':
      return DELETE
    default:
      return state
  }
})

describe('associate', () => {
  it('should return the proper default state', () => {
    expect(reducer(undefined, {
      type: 'INIT'
    })).to.eql({})
  })
  if('should add a state by the key', () => {
    expect(reducer({}, attachKey({
      type: 'INIT'
    }, 'a'))).to.eql({a: 0})
    expect(reducer({a: 0}, attachKey({
      type: 'ADD',
      payload: 3
    }, 'b'))).to.eql({a: 0, b: 3})
  })
  it('should not add a state by the key', () => {
    expect(reducer({a: 0}, attachKey({
      type: 'DELETE'
    }, 'b'))).to.eql({a: 0})
  })
  it('should change the value properly', () => {
    expect(reducer({a: 0, b: 2}, attachKey({
      type: 'ADD',
      payload: 3
    }, 'b'))).to.eql({a: 0, b: 5})
  })
  it('should not update the state', () => {
    const state = {a: 0, b: 2}
    expect(reducer(state, attachKey({
      type: 'ADD',
      payload: 0
    }, 'b'))).to.equal(state)
  })
  it('should delete a state by the key', () => {
    expect(reducer({a: 0, b: 2}, attachKey({
      type: 'DELETE'
    }, 'b'))).to.eql({a: 0})
  })
})
