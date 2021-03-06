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

function getLastDay() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, today.getHours());
}

const GET_REVIEWS = gql`
    query GetAllData($current_food_type: FoodCategory, $creation_date: DateTime) {
        topSoda: topFoods(where: {
            food: {
                is: {
                    type: {
                        equals: soda
                    }
                }
            }
            creationDate: {
                gt: $creation_date
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
                creationDate
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
            creationDate: {
                gt: $creation_date
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
  const [timeFilter, setTimeFilter] = useState("all_time");
  const {loading, data} = useQuery(GET_REVIEWS, {
    variables: {
      current_food_type: foodTypeFilter === "all_types" ? undefined : foodTypeFilter,
      creation_date: timeFilter === "all_time" ? undefined : getLastDay()
    },
    fetchPolicy: "cache-first",
    pollInterval: 500
  });



  const handleChangeFoodTypeFilter = (event, newFoodTypeFilter) => {
    if (newFoodTypeFilter !== null)
      setFoodTypeFilter(newFoodTypeFilter);
    // console.log(foodTypeFilter)
  };

  const handleChangeTimeFilter = (event, newTimeFilter) => {
    if (newTimeFilter !== null)
      setTimeFilter(newTimeFilter);
    // console.log(timeFilter)
  };

  if (loading)
    return (
      <>
        <NavigationBar/>
        <div style={{
          display: "flex",
          justifyContent: 'center',
          paddingTop: '16px'
        }}>
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
      <div
        style={{display: "flex", justifyContent: 'center', paddingTop: '16px'}}>
        <ToggleButtonGroup
          // color="primary"
          value={foodTypeFilter}
          exclusive
          onChange={handleChangeFoodTypeFilter}
          style={{paddingRight: "8px"}}
        >
          <ToggleButton value="sandwich">Sandwich</ToggleButton>
          <ToggleButton value="pizza">Pizza</ToggleButton>
          <ToggleButton value="all_types">All Types</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          // color="primary"
          value={timeFilter}
          exclusive
          onChange={handleChangeTimeFilter}
          style={{paddingLeft: "8px"}}
        >
          <ToggleButton value="past_day">Past Day</ToggleButton>
          <ToggleButton value="all_time">All Time</ToggleButton>
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
              [...data["topOther"]].sort((a, b) => (a.overall_rating < b.overall_rating) ? 1 : -1).map((datum) => {
                return <FoodReviewCard key={datum["id"]}
                                       category={datum["type"]}
                                       score={datum["overall_rating"]}
                                       name={datum["name"]}/>
              }) :
              <Typography>No reviews for {foodTypeFilter} yet! Why don&apos;t
                you leave one?</Typography>
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
