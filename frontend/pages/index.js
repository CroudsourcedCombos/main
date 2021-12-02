// import * as React from "react";
import NavigationBar from "../components/navbar";
import {
  CircularProgress,
  Container,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import SodaReviewCard from "../components/reviewCards/sodaReviewCard";
import {gql, useQuery} from "@apollo/client";
import FoodReviewCard from "../components/reviewCards/otherReviewCard";
import Typography from "@material-ui/core/Typography";
import {useState} from "react";


const GET_REVIEWS = gql`
    query GetAllData($current_food_type: FoodCategory) {
        topSoda: topFoods(where: {food: {is: {type: {equals: soda}}}}) {
            id
            name
            type
            overall_rating
            reviews {
                id
                author {
                    id
                    name
                }
                rating
                text
            }
        }
        topOther: topFoods(where: {
            food: {
                is: {
                    type: {
                        equals: $current_food_type
                    }
                    AND: {
                        type: {
                            not: {
                                equals: soda
                            }
                        }
                    }
                }
            }
        }) {
            id
            name
            type
            overall_rating
            reviews {
                id
                author {
                    id
                    name
                }
                rating
                text
            }
        }
    }
`

export default function Index() {
  const [foodTypeFilter, setFoodTypeFilter] = useState("all_types");
  const {loading, data} = useQuery(GET_REVIEWS, {
    variables: {
      current_food_type: foodTypeFilter === "all_types" ? undefined : foodTypeFilter
    },
    fetchPolicy: "cache-first",
    pollInterval: 500
  });

  const handleChangeFoodTypeFilter = (event, newFoodTypeFilter) => {
    if (newFoodTypeFilter !== null)
      setFoodTypeFilter(newFoodTypeFilter);
  };

  if (loading)
    return (
      <>
        <NavigationBar/>
        <div style={{display: "flex", justifyContent: 'center', paddingTop: '16px'}}>
          <ToggleButtonGroup
            // color="primary"
            value={foodTypeFilter}
            exclusive
            onChange={handleChangeFoodTypeFilter}
          >
            <ToggleButton value="sandwich">Sandwich</ToggleButton>
            <ToggleButton value="pizza">Pizza</ToggleButton>
            <ToggleButton value="all_types">All Types</ToggleButton>
          </ToggleButtonGroup>
        </div>
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
      <div style={{display: "flex", justifyContent: 'center', paddingTop: '16px'}}>
        <ToggleButtonGroup
          // color="primary"
          value={foodTypeFilter}
          exclusive
          onChange={handleChangeFoodTypeFilter}
        >
          <ToggleButton value="sandwich">Sandwich</ToggleButton>
          <ToggleButton value="pizza">Pizza</ToggleButton>
          <ToggleButton value="all_types">All Types</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Container
        maxWidth="xl"
        sx={{display: "flex", justifyContent: "space-between"}}
      >
        <Container sx={{width: "60%", margin: "10px"}}>
          {
            data !== undefined &&
            data["topOther"] !== undefined &&
            data["topOther"].length !== 0 ?
              data["topOther"].map((datum) => {
                return <FoodReviewCard key={datum["id"]}
                                       category={datum["type"]}
                                       score={datum["overall_rating"]}
                                       name={datum["name"]}/>
              }) :
              <Typography>No reviews for {foodTypeFilter} yet! Why don&apos;t you leave one?</Typography>
          }
        </Container>
        <Container sx={{width: "40%", margin: "10px"}}>
          {
            data !== undefined &&
            data["topSoda"] !== undefined &&
            data["topSoda"].length !== 0 ?
              data["topSoda"].map((datum) => {
                return <SodaReviewCard key={datum["id"]}
                                       category={datum["type"]}
                                       score={datum["overall_rating"]}
                                       id={datum["name"]}/>
              }) :
              <Typography>No Data for Sodas yet!</Typography>
          }
        </Container>
      </Container>
    </>
  );
}
