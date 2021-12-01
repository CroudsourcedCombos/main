import React, { useEffect, useState, useRef } from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

// import SignInButton from '../components/auth/signInButton'
import GoogleSignIn from '../components/auth/googleSignIn'
import FacebookSignIn from '../components/auth/facebookSignIn'

export default function SignUp() {
  return (
    <div className="login">
      <Grid
        className="login__card"
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
        boxShadow={1}
        style={{ minHeight: '100vh' }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{
            width: 'max-content',
            height: 'auto',
            backgroundColor: 'white',
            padding: 'min(24px, 10vh) min(92px, 10vw)',
            borderRadius: '8px',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            onClick={() => 'test'}
            style={{ textAlign: 'center' }}
          >
            Sign Up
          </Typography>
          <GoogleSignIn
            isSignIn={false}
            style={{ marginTop: 10, marginBottom: 5 }}
          />
          <FacebookSignIn
            isSignIn={false}
            style={{ marginTop: 5, marginBottom: 10 }}
          />
          <Grid>
            <Typography
              align="center"
              variant="body1"
              color="textSecondary"
              component="p"
            >
              Already have an account? <Link href="/sign-in">Sign in</Link>!
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Continue as a guest <Link href="/">here</Link>.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}