import { expect } from 'chai'

import { attachKey, getKey } from '../src/index'
import { META_KEY } from '../src/associate'

describe('attachKey', () => {
  it('should attach a key to a action', () => {
    expect(attachKey({}, 'a')).to.eql({meta: {[META_KEY]: {key: 'a'}}})
    expect(attachKey({meta: {}}, 'a')).to.eql({meta: {[META_KEY]: {key: 'a'}}})
    expect(attachKey({meta: {[META_KEY]: 'b'}}, 'a')).to.eql({meta: {[META_KEY]: {key: 'a'}}})
    expect(getKey(attachKey({}, 'a'))).to.equal('a')
    expect(getKey(attachKey({meta: {}}, 'a'))).to.equal('a')
    expect(getKey(attachKey({meta: {[META_KEY]: 'b'}}, 'a'))).to.equal('a')
  })
})
