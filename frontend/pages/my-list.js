import ResponsiveAppBar from "../components/navbar";
import { useState } from "react";
// import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {CircularProgress, Container} from "@mui/material";
import SavedFoodCard from "../components/reviewCards/savedFoodCard";
import SavedSodaCard from "../components/reviewCards/savedSodaCard";
import {gql, useQuery} from "@apollo/client";
import {useAuth} from "../context/AuthenticatedUserContext";
import FavoriteFoodCard from "../components/reviewCards/favoriteFoodCard";
import Typography from "@material-ui/core/Typography";
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

const MY_LIST = gql`
    query GetWantTry($firebase_id: String!) {
        foodReviews: foods(where: {
            usersWantTry: {some: {firebaseId: {equals: $firebase_id}}}
            type: {not: {equals: soda}}
        }) {
            id
            name
            type
        }
        sodaReviews: foods(where: {
            usersWantTry: {some: {firebaseId: {equals: $firebase_id}}}
            type: {equals: soda}
        }) {
            id
            name
            type
        }
    }
`


function MyList({ user }) {
  const {data, loading} = useQuery(MY_LIST, {
    variables: {
      firebase_id: user.uid
    },
    pollInterval: 500
  })

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
      <ResponsiveAppBar/>
      <CardHeader
        avatar={<Avatar alt={getUsername()} src={getProfilePicture()} />}
        display="flex"
        justifyContent="center"
        title="My saved to try list:"
        paddingBottom="2px"
      />
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Container sx={{ width: "50%", margin: "10px" }}>
          {
            data !== undefined &&
            data["foodReviews"] !== undefined &&
            data["foodReviews"].length !== 0 ?
              data["foodReviews"].map((datum) => {
                return <SavedFoodCard key={datum["id"]}
                                         category={datum["type"]}
                                         name={datum["name"]}/>
              }) :
              <Typography>No reviews for foods yet! Why don&apos;t
                you leave one?</Typography>
          }
        </Container>
        <Container sx={{ width: "50%", margin: "10px" }}>
          {
            data !== undefined &&
            data["sodaReviews"] !== undefined &&
            data["sodaReviews"].length !== 0 ?
              data["sodaReviews"].map((datum) => {
                return <SavedSodaCard key={datum["id"]}
                                      category={datum["type"]}
                                      name={parseInt(datum["name"])}/>
              }) :
              <Typography>No reviews for foods yet! Why don&apos;t
                you leave one?</Typography>
          }
        </Container>
      </Container>
    </>
  );
}

export default function MyListWrapper() {
  const {user} = useAuth();
  if (user)
    return <MyList user={user}/>
  return <>
    <ResponsiveAppBar/>
    <Container
      maxWidth="xl"
      sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
    >
      <CircularProgress/>
    </Container>
  </>
}
