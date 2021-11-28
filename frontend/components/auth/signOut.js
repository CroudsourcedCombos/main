import { Typography, Box, Link, Button } from '@material-ui/core'
import Firebase from '../../config/firebase'

const auth = getAuth(Firebase)

export async function signOut() {
  return (
    <Button
      onClick={() => {
        _signOut()
      }}
    >
      Sign Out
    </Button>
  )
}

async function _signOut() {
  signOut(auth)
    .then(result => {
      console.log(result)
      console.log('Logged out!')
    })
    .catch(error => {
      console.error(error)
    })
}
