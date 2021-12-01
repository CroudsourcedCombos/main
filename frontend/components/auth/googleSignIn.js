import React from 'react'
import SignInButton from './signInButton'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Firebase from '../../config/firebase'

export default function GoogleSignIn({ onClick, isSignIn, style={} }) {
  return (
    <SignInButton
      type="google"
      onClick={_loginWithGoogle}
      isSignIn={isSignIn}
      style={style}
    />
  )
}

const auth = getAuth(Firebase)
const provider = new GoogleAuthProvider()

// Log into google with pop up
async function _loginWithGoogle() {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential == null) {
      console.error("Did not get a credential from firebase auth")
      return
    }
    ; /* Throw some error */

    const token = credential.accessToken;
    const user = result.user;
    client.mutate({
      mutation: gql`
          mutation CreateUser($name: String!, $email: String!, $firebaseId: String!) {
              upsertUser(
                  where:{
                      firebaseId: $firebaseId
                  },
                  create: {
                      name: $name,
                      email: $email,
                      firebaseId: $firebaseId
                  },
                  update: {
                      name: {
                          set: $name
                      }
                  }) {
                  id
                  name
                  email
              }
          }        `,
      variables: {
        name: result.user.displayName,
        email: result.user.email,
        firebaseId: result.user.uid
      }
    }).then((resp) => {
      console.log(resp)
    }).catch((e) => console.error(e));
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error({error, credential});
  });
}
