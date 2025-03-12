import { useState } from 'react'

import { isBrowserRuntime } from '@/utils'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [persistedValue, setPersistedValue] = useState<T>(() => {
    if (!isBrowserRuntime) {
      return initialValue
    }

    try {
      const item = globalThis.localStorage.getItem(key)
      if (!item) {
        globalThis.localStorage.setItem(key, JSON.stringify(initialValue))

        return initialValue
      }

      return JSON.parse(item)
    } catch (error: unknown) {
      console.error(error)

      return initialValue
    }
  })

  function setValue(value: T | ((value: T) => T)) {
    try {
      const valueToPersist =
        // eslint-disable-next-line unicorn/no-instanceof-builtins -- need for type checking
        value instanceof Function ? value(persistedValue) : value

      setPersistedValue(valueToPersist)

      if (isBrowserRuntime) {
        globalThis.localStorage.setItem(key, JSON.stringify(valueToPersist))
      }
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return [persistedValue, setValue] as const
}
