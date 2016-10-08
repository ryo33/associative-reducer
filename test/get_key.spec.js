import { expect } from 'chai'

import { attachKey, getKey } from '../src/index'
import { META_KEY } from '../src/associate'

describe('getKey', () => {
  it('should return the key attached to the action', () => {
    expect(getKey({meta: {[META_KEY]: { key: 'a' }}})).to.equal('a')
    expect(getKey({meta: {[META_KEY]: { key: 'b' }}})).to.equal('b')
  })
})
