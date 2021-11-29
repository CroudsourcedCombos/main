import Image from "next/image";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar from "../components/navbar";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import Head from 'next/head';
import { Google,FacebookOutlined } from '@mui/icons-material';

export default function SignInButton({ type, isSignIn, onClick }) {
    if (type != 'facebook' && type != 'google')
        return;
    var isfacebook = false;
    if(type == 'facebook'){
        isfacebook = true;
    }
    return (
      <Button style={{ width: '250px', justifyContent: "left" ,}} onClick={onClick} color ={isfacebook?"primary":"error"} variant="contained" startIcon={isfacebook?<FacebookOutlined/>:<Google/>}>
        {isSignIn?"Sign in with":"Sign up with"} {isfacebook?"Facebook":"Google"}
      </Button>
    )
  }