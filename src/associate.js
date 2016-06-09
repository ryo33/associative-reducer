const INIT = '@@associative-reducer/INIT' // Action
const META_KEY = '@@associative-reducer/meta'
const DELETE = {'@@associative-reducer/DELETE': true}

const associate = (reducer, newKeyAction) => {
  const isNewKeyAction = (type) => {
    if (typeof newKeyAction === 'function') {
      return newKeyAction(type)
    } else if (Array.isArray(newKeyAction)) {
      return newKeyAction.indexOf(type) != -1
    } else {
      return newKeyAction == type
    }
  }

  return (state = {}, action) => {
    const meta = action.meta ? action.meta[META_KEY] : undefined
    if (meta) {
      const { key } = meta
      const hasKey = state.hasOwnProperty(key)
      if (!hasKey && !isNewKeyAction(action.type)) {
        return state
      }
      const previousStateForKey = hasKey
        ? state[key]
        : reducer(undefined, { type: INIT })
      const nextStateForKey = reducer(previousStateForKey, action)
      if (nextStateForKey !== previousStateForKey || !hasKey) {
        let nextState = {}
        const keys = Object.keys(state)
        for (let i = 0; i < keys.length; i ++) {
          if (keys[i] != key) {
            nextState[keys[i]] = state[keys[i]]
          }
        }
        if (nextStateForKey !== DELETE) {
          nextState[key] = nextStateForKey
        }
        return nextState
      } else {
        return state
      }
    } else {
      let hasChanged = false
      let nextState = {}
      const keys = Object.keys(state)
      for (let i = 0; i < keys.length; i ++) {
        const key = keys[i]
        const previousStateForKey = state[key]
        const nextStateForKey = reducer(previousStateForKey, action)
        if (nextStateForKey !== DELETE) {
          nextState[key] = nextStateForKey
        }
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }
      return hasChanged ? nextState : state
    }
  }
}

export { associate, DELETE, META_KEY }
