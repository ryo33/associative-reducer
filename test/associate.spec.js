import { _extend as extend } from 'util'

import { expect } from 'chai'

import { associate, attachKey, DELETE } from '../src/index'

const reducer = associate((state = 0, { type, payload }) => {
  switch (type) {
    case 'ADD':
      return state + payload
    case 'DELETE':
      return DELETE
    case 'FAKE_DELETE':
      return extend({}, DELETE)
    default:
      return state
  }
}, 'INIT')

describe('associate', () => {
  it('should handle a function as the second parameter', () => {
    const reducer = associate((state = 0, action) => state, (type) => type == 'INIT')
    expect(reducer({}, attachKey({
      type: 'ADD'
    }, 'a'))).to.eql({})
    expect(reducer({}, attachKey({
      type: 'INIT'
    }, 'a'))).to.eql({a: 0})
  })

  it('should handle an array as the second parameter', () => {
    const reducer = associate((state = 0, action) => state, ['INIT', 'INIT2'])
    expect(reducer({}, attachKey({
      type: 'ADD'
    }, 'a'))).to.eql({})
    expect(reducer({}, attachKey({
      type: 'INIT'
    }, 'a'))).to.eql({a: 0})
    expect(reducer({}, attachKey({
      type: 'INIT2'
    }, 'a'))).to.eql({a: 0})
  })

  it('should handle an string as the second parameter', () => {
    expect(reducer({}, attachKey({
      type: 'INIT'
    }, 'a'))).to.eql({a: 0})
    expect(reducer({}, attachKey({
      type: 'ADD',
      payload: 3
    }, 'a'))).to.eql({})
  })

  it('should add a new key by INIT action', () => {
    expect(reducer({}, attachKey({
      type: 'INIT'
    }, 'a'))).to.eql({a: 0})
    expect(reducer({a: 1}, attachKey({
      type: 'INIT'
    }, 'b'))).to.eql({a: 1, b: 0})
  })

  it('should add a new key by INIT action', () => {
    expect(reducer({}, attachKey({
      type: 'INIT'
    }, 'a'))).to.eql({a: 0})
    expect(reducer({a: 1}, attachKey({
      type: 'INIT'
    }, 'b'))).to.eql({a: 1, b: 0})
  })

  it('should not add a new key when reducer returns DELETE', () => {
    const reducer = associate((state = 0, action) => DELETE, 'INIT')
    expect(reducer({}, attachKey({
      type: 'INIT'
    }, 'a'))).to.eql({})
  })

  it('should return the proper default state', () => {
    expect(reducer(undefined, {
      type: 'INIT'
    })).to.eql({})
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

  it('should delete all values', () => {
    expect(reducer({a: 0, b: 2}, {
      type: 'DELETE'
    })).to.eql({})
  })

  it('should not delete state by fake DELETE', () => {
    expect(reducer({a: 0, b: 2}, attachKey({
      type: 'FAKE_DELETE'
    }, 'b'))).to.eql({a: 0, b: DELETE})
    expect(reducer({a: 0, b: 2}, {
      type: 'FAKE_DELETE'
    })).to.eql({a: DELETE, b: DELETE})
  })

  it('should wrap an action creator', () => {
    const creator = (arg1, arg2, arg3) => ({ arg1, arg2, arg3 })
    const attached = attachKey(creator("a", "b", "c"), "key")
    const associated = associate(creator)("key", "a", "b", "c")
    expect(associated).to.deep.equal(attached)
  })
})
