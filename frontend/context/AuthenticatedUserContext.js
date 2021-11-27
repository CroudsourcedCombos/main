import { createContext, useContext, useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Firebase from '../config/firebase'

// We utilize context to share user info across app
export const AuthenticatedUserContext = createContext({})
export const useAuth = () => useContext(AuthenticatedUserContext)

const auth = getAuth()
export function AuthenticatedUserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null))
        console.log(user)
        // setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    })

    // Unsubscribe auth listener on unmount
    return unsubscribeAuth
  }, [])

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}
