import { navigate } from '@reach/router'
import { useEffect } from 'react'

const Page404 = () => {
  useEffect(() => {
    navigate('/')
  }, [])

  return null
}

export default Page404
