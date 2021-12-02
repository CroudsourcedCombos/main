import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Firebase from '../../config/firebase'

import { signOut, getAuth } from '@firebase/auth'
import {useRouter} from "next/router";
const auth = getAuth(Firebase)

export async function SignOut() {
  const router = useRouter()
  return (
    <Button
      onClick={() => {
        _signOut()
        router.push("/")
      }}
    >
      Sign Out
    </Button>
  );
}

export async function _signOut() {
  signOut(auth)
    .then((result) => {
      console.log(result);
      console.log("Logged out!");
    })
    .catch((error) => {
      console.error(error);
    });
}
