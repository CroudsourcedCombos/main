import ResponsiveAppBar from "../components/navbar";
import { useState } from "react";
// import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/material";
import MyFoodReviewCard from "../components/reviewCards/myFoodReviewCard";
import SodaReviewCard from "../components/reviewCards/sodaReviewCard";

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
