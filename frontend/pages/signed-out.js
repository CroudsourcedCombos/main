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
import  ReviewCard  from "../components/reviewcard.js";


const dataset = [
  {
    score: 10,
    category: 'Sandwich',
    ingredients: {
      bread: "sourdough",
      cheese: ["provolone"],
      toppings: ["tomato", "lettuce"],
      sauce: ["mayo", "sundried tomato pesto"],
    }
  },
  {
    score: 2,
    category: 'Sub',
    ingredients: {
      bread: "torpedo hoagie",
      cheese: ["swiss"],
      toppings: ["onion"],
      sauce: ["sundried tomato pesto"],
    }
  },
  {
    score: 7,
    category: 'Salad',
    ingredients: {
      greens: "baby spinach",
      protein: "chicken",
      toppings: ["goat cheese", "olives", "garbanzo beans"],
      dressing: "ranch"
    }
  },
  {
    score: 4,
    category: 'Coffee',
    ingredients: {
      type: "french press",
      milk: "none",
      sugar: "2 packets",
    }
  },
]

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
                <Container sx = { { width: "60%", margin: "10px"}}>
                    <ReviewCard {...dataset[0]} />
                    <ReviewCard {...dataset[1]} />
                    <ReviewCard {...dataset[2]} />
                </Container>
                <Container sx = { {width: "40%", margin: "10px"}}>
                    <ReviewCard {...dataset[3]} />
                </Container>
        </Container>
        

    </>
  );
}