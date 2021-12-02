import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import Rating from "@mui/material/Rating";

export default function MyFoodReviewCard({score, category, name, text}) {
  const ingredients = JSON.parse(name)

  // Format ingredients to be all strings
  function formatIngredient(ingredients) {
    // If it's an array, format it
    if (Array.isArray(ingredients)) return titleCase(ingredients.join(", "));
    // Otherwise yield it directly
    else return titleCase(ingredients);
  }

  // Title case any strings
  // TO-DO: Move this to be shared across multiple components
  function titleCase(str) {
    if (str === "") return "";
    const words = str.split(/\s+/);
    const titleCaseArr = words.map(
      (substr) => substr[0].toUpperCase() + substr.slice(1)
    );
    return titleCaseArr.join(" ");
  }

  return (
    <Card
      sx={{
        width: "100%",
        border: "1",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{width: "100%", paddingTop: "20px"}}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Typography sx={{ fontSize: 15 }} color="primary">
            {category}
          </Typography>
          <CardContent
            sx={{
              padding: "0",
              display: "flex",
              "&:last-child": {
                paddingBottom: 0,
              },
            }}
          >
            <Typography
              sx={{fontSize: 11, paddingRight: "15px"}}
              color="text.secondary"
            >
              {"Rating: "}
            </Typography>
            <Rating value={score} readOnly size="medium"/>
          </CardContent>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexFlow: "row wrap",
            "&:last-child": {
              paddingBottom: 0,
              paddingTop: 0,
            },
          }}
        >
          {Object.keys(ingredients).map((key) => (
            <Typography sx={{fontSize: 12}} color="text.primary" gutterBottom>
              {titleCase(key)}:{" "}
              <strong>{formatIngredient(ingredients[key])}</strong>
            </Typography>
          ))}
        </CardContent>
      </Container>
      {
        text !== "" ? <Container sx={{width: "100%"}}>
          <CardContent>
            <Typography
              sx={{
                fontSize: 14,
                "&:last-child": {
                  paddingBottom: 0,
                },
              }}
              color="text.secondary"
              gutterBottom
            >
              Comments
            </Typography>
            <Typography variant="h7" color="text.primary" gutterBottom>
              {text}
            </Typography>
          </CardContent>
        </Container> : <></>
      }
    </Card>
  );
}
