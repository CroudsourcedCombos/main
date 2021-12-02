import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
export default function SavedFoodCard({  category, ingredients }) {
  // Format ingredients to be all strings
  function formatIngredient(ingredients) {
    // If it's an array, format it
    if (Array.isArray(ingredients)) return titleCase(ingredients.join(", "));
    // Otherwise yield it directly
    else return titleCase(ingredients);
  }

  function titleCase(str) {
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
      <Container sx={{ width: "100%", paddingTop: "20px" }}>
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
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexFlow: "row wrap",
            "&:last-child": {
              paddingTop: 0,
            },
          }}
        >
          {Object.keys(ingredients).map((key) => (
            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
              {titleCase(key)}:{" "}
              <strong>{formatIngredient(ingredients[key])}</strong>
            </Typography>
          ))}
        </CardContent>
      </Container>
    </Card>
  );
}
