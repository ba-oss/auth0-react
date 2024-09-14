import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

function Callback() {
  const { handleRedirectCallback, isLoading } = useAuth0()
  useEffect(() => {
    if (!isLoading) handleRedirectCallback(window.location.href)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return null
}

export { Callback }
