import React from 'react'
import SignInButton from './signInButton'

import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth'
import Firebase from '../../config/firebase'

export default function FacebookSignIn({ isSignIn, style = {} }) {
  return <SignInButton type="facebook" onClick={_loginWithFacebook} isSignIn={isSignIn} style={style} />
}

const auth = getAuth(Firebase)
const provider = new FacebookAuthProvider()

// Log into google with pop up
async function _loginWithFacebook() {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = FacebookAuthProvider.credentialFromResult(result)
      if (credential == null) return /* Throw some error */
      
      const token = credential.accessToken
      const user = result.user

      console.log(user)
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error)
      console.log(error);
    })
}
