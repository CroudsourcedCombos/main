import Image from "next/image";
import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import Google from "@mui/icons-material/Google";
import FacebookOutline from "@mui/icons-material/FacebookOutline";
import Button from "@mui/material";
import Head from "next/head";

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
