import Google from "@mui/icons-material/Google";
import FacebookOutlined from "@mui/icons-material/FacebookOutlined";
import Button from "@mui/material";

export default function SignInButton({ type, isSignIn, onClick }) {
  if (type != "facebook" && type != "google") return;
  var isfacebook = false;
  if (type == "facebook") {
    isfacebook = true;
  }
  return (
    <Button
      style={{ width: "250px", justifyContent: "left" }}
      onClick={onClick}
      color={isfacebook ? "primary" : "error"}
      variant="contained"
      startIcon={isfacebook ? <FacebookOutlined /> : <Google />}
    >
      {isSignIn ? "Sign in with" : "Sign up with"}{" "}
      {isfacebook ? "Facebook" : "Google"}
    </Button>
  );
}
