import { useState } from 'react'

import { logger } from '@/services/logger'
import { isBrowserRuntime } from '@/utils'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [persistedValue, setPersistedValue] = useState<T>(() => {
    if (!isBrowserRuntime) {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      if (!item) {
        window.localStorage.setItem(key, JSON.stringify(initialValue))

        return initialValue
      }

      return JSON.parse(item)
    } catch (ex: unknown) {
      logger.error(ex)

      return initialValue
    }
  })

  function setValue(value: T | ((value: T) => T)) {
    try {
      const valueToPersist =
        value instanceof Function ? value(persistedValue) : value

      setPersistedValue(valueToPersist)

      if (isBrowserRuntime) {
        window.localStorage.setItem(key, JSON.stringify(valueToPersist))
      }
    } catch (ex: unknown) {
      logger.error(ex)
    }
  }

  return [persistedValue, setValue] as const
}
