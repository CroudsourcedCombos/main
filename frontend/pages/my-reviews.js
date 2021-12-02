import ResponsiveAppBar from "../components/navbar";
// import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {CircularProgress, Container} from "@mui/material";
import MyFoodReviewCard from "../components/reviewCards/myFoodReviewCard";
import MySodaReviewCard from "../components/reviewCards/mySodaReviewCard";
import {gql, useQuery} from "@apollo/client";
import {useAuth} from "../context/AuthenticatedUserContext";
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

const GET_MY_REVIEWS = gql`query Get_Reviews($firebase_id: String!) {
    sodaReviews: reviews(where: {food: {is: {type: {equals: soda}}}
        author: {is: {firebaseId: {equals: $firebase_id}}}}) {
        id
        food {
            name
            type
            id
        }
        rating
        text
    }
    foodReviews: reviews(where: {food: {is: {type: {not: {equals: soda}}}}
        author: {is: {firebaseId: {equals: $firebase_id}}}}) {
        id
        food {
            name
            type
            id
        }
        rating
        text
    }
}
`

function MyReviews({user}) {
  const {data, loading} = useQuery(GET_MY_REVIEWS, {
    variables: {
      firebase_id: user.uid
    }
  })

  if (loading) {
    return <div/>
  }

  console.log({data})

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
        avatar={<Avatar alt={getUsername()} src={getProfilePicture()}/>}
        display="flex"
        justifyContent="center"
        title="My Reviews:"
        paddingBottom="2px"
      />
      <Container
        maxWidth="xl"
        sx={{display: "flex", justifyContent: "space-between"}}
      >
        <Container sx={{width: "50%", margin: "10px"}}>
          {
            data !== undefined &&
            data["foodReviews"] !== undefined &&
            data["foodReviews"].length !== 0 ?
              data["foodReviews"].map((datum) => {
                return <MyFoodReviewCard key={datum["id"]}
                                         category={datum["food"]["type"]}
                                         score={datum["rating"]}
                                         name={datum["food"]["name"]}
                                         text={datum["text"]}/>
              }) :
              <Typography>No reviews for foods yet! Why don&apos;t
                you leave one?</Typography>
          }
        </Container>
        <Container sx={{width: "50%", margin: "10px"}}>
          {
            data !== undefined &&
            data["sodaReviews"] !== undefined &&
            data["sodaReviews"].length !== 0 ?
              data["sodaReviews"].map((datum) => {
                return <MySodaReviewCard key={datum["id"]}
                                         category={datum["food"]["type"]}
                                         score={datum["rating"]}
                                         name={parseInt(datum["food"]["name"])}
                                         text={datum["text"]}/>
              }) :
              <Typography>No reviews for sodas yet! Why don&apos;t
                you leave one?</Typography>
          }
        </Container>
      </Container>
    </>
  );

}

export default function MyReviewsWrapper() {
  const {user} = useAuth();
  if (user)
    return <MyReviews user={user}/>
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
