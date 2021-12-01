import { Button } from '@mui/material'
import { Google, FacebookOutlined } from '@mui/icons-material'

export default function SignInButton({ type, isSignIn, onClick, style = {} }) {
  if (type != 'facebook' && type != 'google') return
  var isfacebook = false
  if (type == 'facebook') {
    isfacebook = true
  }
  return (
    <Button
      style={{ width: '250px', justifyContent: 'left', ...style }}
      onClick={onClick}
      color={isfacebook ? 'primary' : 'error'}
      variant="contained"
      startIcon={isfacebook ? <FacebookOutlined /> : <Google />}
    >
      {isSignIn ? 'Sign in with' : 'Sign up with'}{' '}
      {isfacebook ? 'Facebook' : 'Google'}
    </Button>
  )
}
