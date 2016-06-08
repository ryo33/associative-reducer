import { expect } from 'chai'

import { attachKey } from '../src/index'
import { META_KEY } from '../src/associate'

describe('attachKey', () => {
  it('should attach a key to a action', () => {
    expect(attachKey({}, 'a')).to.eql({meta: {[META_KEY]: {key: 'a'}}})
    expect(attachKey({meta: {}}, 'a')).to.eql({meta: {[META_KEY]: {key: 'a'}}})
    expect(attachKey({meta: {[META_KEY]: 'b'}}, 'a')).to.eql({meta: {[META_KEY]: {key: 'a'}}})
  })
})
