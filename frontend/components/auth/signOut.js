import Button from '@material-ui/core/Button'

import Firebase from '../../config/firebase'

import { signOut, getAuth } from '@firebase/auth'
const auth = getAuth(Firebase)

export async function SignOut() {
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

export async function _signOut() {
  signOut(auth)
    .then(result => {
      console.log(result)
      console.log('Logged out!')
    })
    .catch(error => {
      console.error(error)
    })
}
