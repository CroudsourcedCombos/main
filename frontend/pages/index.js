// import * as React from "react";
import NavigationBar from "../components/navbar";
import {CircularProgress, Container} from "@mui/material";
import SodaReviewCard from "../components/reviewCards/sodaReviewCard.js";
import {gql, useQuery} from "@apollo/client";
import FoodReviewCard from "../components/reviewCards/otherReviewCard";


const GET_REVIEWS = gql`
    query GetAllData($current_food_type: FoodCategory!) {
        topSoda: topFoods(where: {food: {is: {type: {equals: soda}}}}) {
            id
            name
            type
            overall_rating
        }
        topOther: topFoods(where: {food: {is: {type: {equals: $current_food_type}}}}) {
            id
            name
            type
            overall_rating
        }
    }
`

export default function Index() {
  const {loading, error, data} = useQuery(GET_REVIEWS, {
    variables: {
      current_food_type: "sandwich"
    },
    fetchPolicy: "cache-and-network"
  });

  if (loading)
    return (
      <>
        <NavigationBar/>
        <Container
          maxWidth="xl"
          sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        >
          <CircularProgress/>
        </Container>
      </>
    )

  return (
    <>
      <NavigationBar/>
      <Container
        maxWidth="xl"
        sx={{display: "flex", justifyContent: "space-between"}}
      >
        <Container sx={{width: "60%", margin: "10px"}}>
          {data["topOther"].map((datum) => {
            return <FoodReviewCard key={datum["id"]} category={datum["type"]}
                                   score={datum["overall_rating"]} name={datum["name"]}/>
          })}
        </Container>
        <Container sx={{width: "40%", margin: "10px"}}>
          {data["topSoda"].map((datum) => {
            return <SodaReviewCard key={datum["id"]} category={datum["type"]}
                                   score={datum["overall_rating"]}
                                   id={datum["name"]}/>
          })}        </Container>
      </Container>
    </>
  );
}
