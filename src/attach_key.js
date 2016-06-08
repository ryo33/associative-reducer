import { META_KEY } from './associate'

const attachKey = (action, key) => {
  if (typeof action.meta === 'undefined') {
    action.meta = {
      [META_KEY]: { key }
    }
  } else {
    action.meta[META_KEY] = { key }
  }
  return action
}

export default attachKey
