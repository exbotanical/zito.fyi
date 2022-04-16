import { navigate } from '@reach/router'
import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    navigate('/')
  }, [])

  return null
}
