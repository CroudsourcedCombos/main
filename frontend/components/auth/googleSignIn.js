import GoogleButton from 'react-google-button'
import { Button, Typography, Box, Link } from '@material-ui/core'
import Image from 'next/image'


import Firebase from '../../config/firebase'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

const auth = getAuth(Firebase)
const provider = new GoogleAuthProvider()

const googleStyles = {
  googleContainer: {
    backgroundColor: '#FFF',
    color: 'black',
    textTransform: 'none',
    border: '1px solid gray',
    width: 240,
  },
}

const signInButtonStyle = {
  width: 220,
  // height: 60,
}

export default function GoogleLogin({ isSignUp = false }) {
  return (
    <Box style={signInButtonStyle}>
      <Button
        style={googleStyles.googleContainer}
        onClick={() => _loginWithGoogle()}
      >
        {/*  */}
        <Image
          src="/google-logo.png"
          alt="Google logo"
          width="32"
          height="32"
        />

        {/* Google image */}
        <Typography style={{ paddingLeft: 8 }}>
          Sign {isSignUp ? 'up' : 'in'} with Google
        </Typography>
      </Button>
    </Box>
  )


  // return <GoogleButton style={{ width: 240 }} onClick={() => _loginWithGoogle()} />
}

// Log into google with pop up
async function _loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      if (credential == null) return /* Throw some error */
      
      const token = credential.accessToken
      const user = result.user
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(error);
    })
}
