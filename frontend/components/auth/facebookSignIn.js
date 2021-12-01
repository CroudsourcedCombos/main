import React from 'react'
import SignInButton from './signInButton'

import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth'
import Firebase from '../../config/firebase'
import { useRouter } from 'next/router'
import {client} from "../../apolo-client";
import {gql} from "@apollo/client";

export default function FacebookSignIn({ isSignIn, style = {} }) {
  const router = useRouter()

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
      // console.log(resp)
    }).catch((e) => console.error(e));


    // Redirect to main page
      router.push('/')
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
