// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import { Typography, Box, Link, Button } from '@material-ui/core'

import FacebookLogin from '../components/auth/facebookSignIn'
import GoogleLogin from '../components/auth/googleSignIn'

export default function SignIn() {
  return (
    <Box align="center">
      {/* Page title */}
      <Typography variant="h3">Login</Typography>
      <Typography variant="subtitle1">
        Sign in with Google or Facebook
      </Typography>

      {/* Google and Facebook login */}
      <GoogleLogin />
      <FacebookLogin />

      {/* Don't have account? */}
      <Typography>
        Don't have an account? <Link href="/sign-up">Sign up</Link>!
      </Typography>


    </Box>
  )
}
