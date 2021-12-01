import ResponsiveAppBar from "../components/navbar";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
// import * as React from "react";
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
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
import { Box } from "@mui/system";
import MyFoodReviewCard from "../components/reviewCards/myFoodReviewCard";
import SodaReviewCard from "../components/reviewCards/sodaReviewCard";
import { useAuth } from "../context/AuthenticatedUserContext";

const foods = [
  {
    score: 10,
    category: "Sandwich",
    ingredients: {
      bread: "sourdough",
      cheese: ["provolone"],
      toppings: ["tomato", "lettuce"],
      sauce: ["mayo", "sundried tomato pesto"],
    },
  },
  {
    score: 2,
    category: "Sub",
    ingredients: {
      bread: "torpedo hoagie",
      cheese: ["swiss"],
      toppings: ["onion"],
      sauce: ["sundried tomato pesto"],
    },
  },
  {
    score: 7,
    category: "Salad",
    ingredients: {
      greens: "baby spinach",
      protein: "chicken",
      toppings: ["goat cheese", "olives", "garbanzo beans"],
      dressing: "ranch",
    },
  },
  {
    score: 4,
    category: "Coffee",
    ingredients: {
      type: "french press",
      milk: "none",
      sugar: "2 packets",
    },
  },
];

const drinks = [
  {
    score: 2,
    category: "Freestyle Drinks",
    id: 1,
    comment: "cant beat original",
  },
  {
    score: 3.5,
    category: "Freestyle Drinks",
    id: 2,
    comment: "coolio",
  },
  {
    score: 4,
    category: "Freestyle Drinks",
    id: 3,
    comment: "hype",
  },
];

export default function myReviews({ user }) {
  const [value, setValue] = useState(2);
  const [reviewText, setreviewText] = useState("Controlled");
  const handleChange = (event) => {
    setreviewText(event.target.reviewText);
  };
  const getProfilePicture = () => {
    if (user) return user.photoURL;
    else return "/static/images/avatar/2.jpg";
  };

  const getUsername = () => {
    if (user) return user.displayName;
    else return "Joe Bruin";
  };

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <CardHeader
        avatar={<Avatar alt={getUsername()} src={getProfilePicture()} />}
        display="flex"
        justifyContent="center"
        title="My Reviews:"
        //subheader="getUsername()"
        paddingBottom="2px"
      />
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Container sx={{ width: "50%", margin: "10px" }}>
          <MyFoodReviewCard {...foods[0]} />
          <MyFoodReviewCard {...foods[1]} />
          <MyFoodReviewCard {...foods[2]} />
        </Container>
        <Container sx={{ width: "50%", margin: "10px" }}>
          <SodaReviewCard {...drinks[0]} />
          <SodaReviewCard {...drinks[1]} />
          <SodaReviewCard {...drinks[0]} />
          <SodaReviewCard {...drinks[1]} />
          <SodaReviewCard {...drinks[0]} />
        </Container>
      </Container>
    </>
  );
}
