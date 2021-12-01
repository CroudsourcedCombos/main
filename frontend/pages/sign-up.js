import Image from "next/image";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar from "../components/navbar";
import SignInButton from "../components/signInButton"
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import Head from 'next/head';
import { Google,FacebookOutlined } from '@mui/icons-material';
export default function SignUp() {
  return (
    <>
      <ResponsiveAppBar />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Card>
          <CardContent style={{ paddingTop: "50px",paddingBottom: "50px", justifyContent: 'center', width: "300px"}}>
          <SignInButton type="google"  isSignIn="false"  onClick={()=>console.log('test')} />
          <SignInButton type="facebook" isSignIn="false" />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
