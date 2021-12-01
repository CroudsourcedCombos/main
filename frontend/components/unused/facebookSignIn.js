import { Button, Typography, Box, Link } from '@material-ui/core'
import Image from 'next/image'

import { getAuth, signInWithPopup, FacebookAuthProvider} from 'firebase/auth'
import Firebase from '../../config/firebase'

const facebookStyles = {
  facebookContainer: {
    backgroundColor: '#1877F2',
    color: '#FFF',
    textTransform: 'none',
  },
}

const signInButtonStyle = {
  width: 240,
  // height: 60,
}

export default function FacebookLogin({ isSignUp = false }) {
  return (
    <Box style={signInButtonStyle}>
      <Button
        style={facebookStyles.facebookContainer}
        onClick={() => _loginWithFacebook()}
      >
        {/*  */}
        <Image
          src="/facebook-white.png"
          alt="Facebook logo"
          width="32"
          height="32"
        />

        {/* Facebook image */}
        <Typography style={{ paddingLeft: 8 }}
        
        >Sign {isSignUp ? 'up' : 'in'} with Facebook</Typography>
      </Button>
    </Box>
  )
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
