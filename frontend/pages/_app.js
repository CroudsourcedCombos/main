import '../styles/globals.css'
import '../styles/login.css'

import { AuthenticatedUserProvider } from '../context/AuthenticatedUserContext'
import { useEffect } from 'react'

// Give app access to the authenticated user
function Application({ Component, pageProps }) {
  return <AuthenticatedUserProvider>
    <Component {...pageProps} />
  </AuthenticatedUserProvider>
}

export default Application
