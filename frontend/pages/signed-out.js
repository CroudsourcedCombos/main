import Head from "next/head";
import Image from "next/image";
// import * as React from "react";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import ResponsiveAppBar from "../components/navbar";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Container } from "@mui/material";
import { useState } from "react";
import CheckboxesGroup from "../components/foodCheckboxes";
import { Box } from "@mui/system";
import  BasicCard  from "../components/reviewcard";

export default function SignedOut() {
  const [value, setValue] = useState(2);
  const [reviewText, setreviewText] = useState("Controlled");

  const handleChange = (event) => {
    setreviewText(event.target.reviewText);
  };

  

  return (
    <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Container maxWidth = "xl" sx = { {display: "flex", justifyContent: "space-between"}}>
                <Container sx = { { width: "65%", margin: "10px"}}>
                    <BasicCard></BasicCard>
                    <BasicCard></BasicCard>
                    <BasicCard></BasicCard>
                </Container>
                <Container sx = { {width: "35%", margin: "20px"}}>
                    
                </Container>
        </Container>
        

    </>
  );
}